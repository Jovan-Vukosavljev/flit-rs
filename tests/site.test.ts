import { afterAll, beforeAll, expect, test } from 'bun:test';
import AxeBuilder from '@axe-core/playwright';
import { type Browser, expect as browserExpect, chromium } from '@playwright/test';
import { organizationData, site } from '../src/config/site';
import { translations } from '../src/i18n';

const origin = 'http://127.0.0.1:4325';
let browser: Browser;
let server: ReturnType<typeof Bun.spawn>;

beforeAll(async () => {
    server = Bun.spawn(
        [
            process.execPath,
            'node_modules/astro/bin/astro.mjs',
            'preview',
            '--ignore-lock',
            '--host',
            '127.0.0.1',
            '--port',
            '4325',
        ],
        { stdout: 'ignore', stderr: 'ignore' },
    );
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt += 1) {
        if (server.exitCode !== null) {
            throw new Error(
                'Preview exited before becoming ready; check that port 4325 is free',
            );
        }
        try {
            ready = (await fetch(`${origin}/sr/`)).ok;
            if (ready) {
                break;
            }
        } catch {
            // Wait for the production preview server to start
        }
        await Bun.sleep(100);
    }
    if (!ready) {
        throw new Error('Production preview failed to start; run bun run build first');
    }
    browser = await chromium.launch();
}, 20000);

afterAll(async () => {
    await browser?.close();
    server?.kill();
    await server?.exited;
});

test('root has a Serbian redirect fallback and deployable permanent redirect rule', async () => {
    const root = await Bun.file('dist/index.html').text();
    expect(root).toContain('http-equiv="refresh"');
    expect(root).toContain('/sr/');
    expect(await Bun.file('dist/_redirects').text()).toContain('/ /sr/ 301');
    const page = await browser.newPage();
    await page.goto(origin);
    await browserExpect(page).toHaveURL(`${origin}/sr/`);
    await page.close();
});

for (const locale of ['sr', 'en'] satisfies Array<'sr' | 'en'>) {
    test(`${locale}: complete metadata, valid links and safe contact placeholders`, async () => {
        const page = await browser.newPage();
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        await page.goto(`${origin}/${locale}/`);
        await browserExpect(page.locator('h1')).toHaveCount(1);
        await browserExpect(page).toHaveTitle(translations[locale].title);
        expect(await page.locator('html').getAttribute('lang')).toBe(
            locale === 'sr' ? 'sr-Latn' : 'en',
        );
        expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(
            `${site.url}/${locale}/`,
        );
        for (const language of ['sr', 'en', 'x-default']) {
            expect(
                await page.locator(`link[hreflang="${language}"]`).getAttribute('href'),
            ).toBe(`${site.url}/${language === 'x-default' ? 'sr' : language}/`);
        }
        const invalidAnchors = await page
            .locator('a[href^="#"]')
            .evaluateAll((links) =>
                links
                    .filter(
                        (link) =>
                            !document.getElementById(
                                link.getAttribute('href')?.slice(1) ?? '',
                            ),
                    )
                    .map((link) => link.outerHTML),
            );
        expect(invalidAnchors).toEqual([]);
        const configuredContacts =
            Number(Boolean(site.phone)) + Number(Boolean(site.email));
        expect(await page.locator('a[href^="tel:"], a[href^="mailto:"]').count()).toBe(
            configuredContacts,
        );
        expect(await page.locator('[data-contact-placeholder]').count()).toBe(
            2 - configuredContacts,
        );
        const structured: unknown = JSON.parse(
            await page.locator('script[type="application/ld+json"]').innerText(),
        );
        expect(structured).toEqual(organizationData());
        if (!site.phone) {
            expect(structured).not.toHaveProperty('telephone');
        }
        if (!site.email) {
            expect(structured).not.toHaveProperty('email');
        }
        expect(structured).not.toHaveProperty('address');
        expect((await fetch(`${origin}/images/social-preview.png`)).ok).toBe(true);
        expect(errors).toEqual([]);
        await page.close();
    });

    for (const theme of ['dark', 'light']) {
        test(`${locale}/${theme}: accessible layouts at mobile, tablet and desktop sizes`, async () => {
            const context = await browser.newContext();
            await context.addInitScript(
                (value) => localStorage.setItem('flit-theme', value),
                theme,
            );
            const page = await context.newPage();
            await page.goto(`${origin}/${locale}/`);
            for (const width of [375, 768, 1440]) {
                await page.setViewportSize({ width, height: 1000 });
                await browserExpect(page.locator('html')).toHaveAttribute(
                    'data-theme',
                    theme,
                );
                expect(
                    await page.evaluate(
                        () => document.documentElement.scrollWidth <= window.innerWidth,
                    ),
                ).toBe(true);
                const accessibility = await new AxeBuilder({ page })
                    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
                    .analyze();
                expect(
                    accessibility.violations.map(({ id, nodes }) => ({
                        id,
                        elements: nodes.map((node) => node.target),
                    })),
                ).toEqual([]);
            }
            await context.close();
        }, 30000);
    }
}

test('theme defaults to dark, persists through reload and language changes, and works by keyboard', async () => {
    const page = await browser.newPage({ colorScheme: 'light' });
    await page.goto(`${origin}/sr/`);
    await browserExpect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const toggle = page.getByRole('button', { name: translations.sr.theme.light });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await browserExpect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await browserExpect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await browserExpect(page).toHaveURL(`${origin}/en/`);
    await browserExpect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: translations.en.theme.dark }).click();
    await browserExpect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const faq = page.locator('.faq summary').first();
    await faq.focus();
    await page.keyboard.press('Enter');
    expect(
        await page.locator('.faq details').first().getAttribute('open'),
    ).not.toBeNull();
    await page.close();
});

test('native navigation and FAQs work without JavaScript', async () => {
    const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 375, height: 812 },
    });
    const page = await context.newPage();
    await page.goto(`${origin}/sr/`);
    await page.locator('.mobile-nav summary').click();
    await browserExpect(page.locator('.mobile-nav a[href="#services"]')).toBeVisible();
    await page.locator('.mobile-nav a[href="#services"]').click();
    await browserExpect(page).toHaveURL(`${origin}/sr/#services`);
    await page.locator('.faq summary').first().click();
    await browserExpect(
        page.locator('.faq details').first().locator('p'),
    ).toBeVisible();
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await browserExpect(page.locator('h1')).toContainText(translations.en.hero.first);
    await context.close();
});

test('theme survives blocked storage and reduced motion is respected', async () => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addInitScript(() => {
        Object.defineProperty(window, 'localStorage', {
            get() {
                throw new DOMException('Blocked', 'SecurityError');
            },
        });
    });
    const page = await context.newPage();
    await page.goto(`${origin}/en/`);
    await page.getByRole('button', { name: translations.en.theme.light }).click();
    await browserExpect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(
        await page.evaluate(
            () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
    ).toBe('auto');
    expect(
        await page
            .locator('button')
            .evaluate((button) => getComputedStyle(button).transitionDuration),
    ).toBe('0s');
    await context.close();
});

test('sitemap and robots advertise both canonical language URLs', async () => {
    const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
    expect(sitemap).toContain(`<loc>${site.url}/sr/</loc>`);
    expect(sitemap).toContain(`<loc>${site.url}/en/</loc>`);
    expect(sitemap).not.toContain('/index.php/');
    expect(await (await fetch(`${origin}/robots.txt`)).text()).toContain(
        `Sitemap: ${site.url}/sitemap.xml`,
    );
});
