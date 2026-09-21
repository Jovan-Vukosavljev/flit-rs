export type Locale = 'sr' | 'en';

// Replace null with confirmed details to enable contact links
interface SiteConfig {
    name: string;
    url: string;
    phone: string | null;
    email: string | null;
    coverage: Record<Locale, string>;
    logo: string;
    droneImage: string | null;
    droneImageAlt: Record<Locale, string>;
}

export const site: SiteConfig = {
    name: 'FLIT Support',
    url: 'https://flit.rs',
    phone: '+381 (0) 69 1600516',
    email: 'ivan.lalic@flit.rs',
    coverage: {
        sr: 'Dolazak na lokaciju po dogovoru',
        en: 'On-site visits by arrangement',
    },
    logo: '/images/flit-logo.png',
    // Add a local image path and descriptive alt text when real work is available
    droneImage: null,
    droneImageAlt: {
        sr: 'Fotografija iz vazduha, FLIT',
        en: 'Aerial photograph by FLIT',
    },
};

export function organizationData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.name,
        url: site.url,
        logo: new URL(site.logo, site.url).href,
        ...(site.phone ? { telephone: site.phone } : {}),
        ...(site.email ? { email: site.email } : {}),
    };
}
