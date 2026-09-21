export type Locale = 'sr' | 'en';

// Replace null with confirmed details to enable contact links
interface SiteConfig {
    name: string;
    url: string;
    phone: string | null;
    email: string | null;
    coverage: Record<Locale, string>;
}

export const site: SiteConfig = {
    name: 'FLIT Support',
    url: (process.env.SITE_URL ?? 'https://flit.rs').replace(/\/$/, ''),
    phone: '+381 (0) 69 1600516',
    email: 'ivan.lalic@flit.rs',
    coverage: {
        sr: 'Dolazak na lokaciju po dogovoru',
        en: 'On-site visits by arrangement',
    },
};

export function organizationData(logoPath: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        logo: new URL(logoPath, site.url).href,
        ...(site.phone ? { telephone: site.phone } : {}),
        ...(site.email ? { email: site.email } : {}),
    };
}
