import type { Locale } from '../config/site';

export interface Copy {
    title: string;
    description: string;
    skip: string;
    menu: string;
    navigation: string;
    language: string;
    theme: { light: string; dark: string };
    nav: { services: string; approach: string; drone: string; contact: string };
    hero: {
        eyebrow: string;
        first: string;
        second: string;
        body: string;
        action: string;
        secondary: string;
        footnote: string;
        diagram: string;
        office: string;
        remote: string;
        onsite: string;
    };
    strip: string[];
    services: {
        eyebrow: string;
        heading: string;
        body: string;
        items: { title: string; body: string; points: string[]; mode: string }[];
    };
    approach: {
        eyebrow: string;
        heading: string;
        body: string;
        steps: { title: string; body: string }[];
    };
    drone: {
        eyebrow: string;
        heading: string;
        body: string;
        tags: string[];
        action: string;
        placeholder: string;
        note: string;
    };
    faq: {
        eyebrow: string;
        heading: string;
        items: { question: string; answer: string }[];
    };
    contact: {
        eyebrow: string;
        heading: string;
        body: string;
        phone: string;
        email: string;
        phonePlaceholder: string;
        emailPlaceholder: string;
        coverage: string;
    };
    footer: { tagline: string; copyright: string; top: string };
}

const sr: Copy = {
    title: 'FLIT Support | IT podrška na daljinu i na vašoj lokaciji',
    description:
        'IT podrška za vaše poslovanje. FLIT pruža podršku na daljinu, pomoć na lokaciji i IT outsourcing, uz dodatne usluge snimanja i fotografisanja dronom.',
    skip: 'Pređi na sadržaj',
    menu: 'Meni',
    navigation: 'Glavna navigacija',
    language: 'Izaberite jezik',
    theme: { light: 'Uključi svetlu temu', dark: 'Uključi tamnu temu' },
    nav: {
        services: 'IT usluge',
        approach: 'Kako radimo',
        drone: 'Dron usluge',
        contact: 'Kontakt',
    },
    hero: {
        eyebrow: 'IT PODRŠKA ZA VAŠE POSLOVANJE',
        first: 'Vaš posao ide dalje.',
        second: 'Mi brinemo o IT-ju.',
        body: 'Od svakodnevnih tehničkih pitanja do podrške na vašoj lokaciji. Tu smo da pomognemo da tehnologija radi za vas.',
        action: 'Razgovarajmo',
        secondary: 'Istražite IT usluge',
        footnote: 'Na daljinu ili na lokaciji. Po vašoj meri.',
        diagram:
            'IT podrška povezuje vašu kancelariju sa pomoći na daljinu i na lokaciji',
        office: 'Vaša kancelarija',
        remote: 'Podrška na daljinu',
        onsite: 'Podrška na lokaciji',
    },
    strip: ['Podrška na daljinu', 'Dolazak na lokaciju', 'IT outsourcing'],
    services: {
        eyebrow: '01 / IT USLUGE',
        heading: 'Tehnička podrška.\nLjudski pristup.',
        body: 'Za mala preduzeća, timove i svakodnevni rad. Dogovaramo podršku prema onome što vam je zaista potrebno.',
        items: [
            {
                title: 'Podrška na daljinu',
                body: 'Kada vam treba pomoć, a problem ne zahteva dolazak. Zajedno prolazimo kroz poteškoće i tražimo rešenje.',
                points: [
                    'Pomoć u svakodnevnom radu',
                    'Dijagnostika tehničkih problema',
                    'Povezivanje uz vašu saglasnost',
                ],
                mode: 'ONLINE',
            },
            {
                title: 'Podrška na lokaciji',
                body: 'Za situacije koje traže prisustvo. Dolazimo po dogovoru da sagledamo problem tamo gde radite.',
                points: [
                    'Podrška u vašoj kancelariji',
                    'Pregled opreme i podešavanja',
                    'Termin i obim rada po dogovoru',
                ],
                mode: 'NA LICU MESTA',
            },
            {
                title: 'IT outsourcing',
                body: 'Spoljna IT podrška za vaš tim. Zajedno određujemo šta preuzimamo i kako se uklapamo u vaš način rada.',
                points: [
                    'Dogovoren obim IT podrške',
                    'Podrška zaposlenima',
                    'Planiranje narednih IT koraka',
                ],
                mode: 'KONTINUIRANA SARADNJA',
            },
        ],
    },
    approach: {
        eyebrow: '02 / KAKO RADIMO',
        heading: 'Prvo razumemo.\nZatim rešavamo.',
        body: 'Bez nepotrebnog tehničkog žargona. Od prvog razgovora do dogovorenog sledećeg koraka.',
        steps: [
            {
                title: 'Recite nam šta vam treba',
                body: 'Opišite problem ili plan. Saslušaćemo vas i postaviti pitanja koja su važna.',
            },
            {
                title: 'Dogovaramo način podrške',
                body: 'Na daljinu ili na lokaciji. Zajedno definišemo obim posla i termin.',
            },
            {
                title: 'Radimo na rešenju',
                body: 'Objašnjavamo šta radimo i dogovaramo dalje korake za vaš IT.',
            },
        ],
    },
    drone: {
        eyebrow: '03 / JOŠ JEDNA PERSPEKTIVA',
        heading: 'Pogled iznad\nsvakodnevice.',
        body: 'Pored IT podrške, bavimo se fotografisanjem i video-snimanjem iz vazduha. Za objekte, prostore i ideje koje vredi sagledati iz drugog ugla.',
        tags: ['Fotografije iz vazduha', 'Video-snimanje'],
        action: 'Razgovarajmo o snimanju',
        placeholder: 'Prostor za fotografiju iz vazduha',
        note: 'Primeri radova biće dodati naknadno',
    },
    faq: {
        eyebrow: '04 / DOBRO JE ZNATI',
        heading: 'Imate pitanje?',
        items: [
            {
                question: 'Da li je podrška namenjena samo firmama?',
                answer: 'Prvenstveno sarađujemo sa malim preduzećima i timovima. Ako vam je potrebna pomoć za lične potrebe, javite nam se da proverimo kako možemo da pomognemo.',
            },
            {
                question: 'Kako funkcioniše podrška na daljinu?',
                answer: 'Najpre razgovaramo o problemu. Ako je pristup računaru potreban, način povezivanja dogovaramo sa vama i povezujemo se uz vašu saglasnost.',
            },
            {
                question: 'Na kojim lokacijama je moguć dolazak?',
                answer: 'Dolazak na lokaciju dogovaramo za svaki upit. Pošaljite nam lokaciju i kratak opis problema kako bismo proverili mogućnosti i termin.',
            },
            {
                question: 'Da li mogu da dogovorim redovnu IT podršku?',
                answer: 'Da. Za IT outsourcing najpre razgovaramo o potrebama vašeg tima, a zatim dogovaramo obim i način saradnje.',
            },
            {
                question: 'Kako da dogovorim snimanje dronom?',
                answer: 'Pošaljite nam lokaciju, željeni termin i opis snimaka. Mogućnosti snimanja proveravamo prema lokaciji i uslovima, pa dogovaramo detalje.',
            },
        ],
    },
    contact: {
        eyebrow: '05 / KONTAKT',
        heading: 'Hajde da rešimo\nvaš sledeći IT korak.',
        body: 'Recite nam šta vam je potrebno. Zajedno ćemo pronaći odgovarajući način saradnje.',
        phone: 'Telefon',
        email: 'E-pošta',
        phonePlaceholder: 'Broj telefona uskoro',
        emailPlaceholder: 'E-adresa uskoro',
        coverage: 'Dostupnost na lokaciji',
    },
    footer: {
        tagline: 'IT podrška. Na daljinu i na lokaciji.',
        copyright: 'Sva prava zadržana.',
        top: 'Na vrh stranice',
    },
};

const en: Copy = {
    title: 'FLIT Support | Remote and on-site IT support',
    description:
        'IT support for your business. FLIT offers remote assistance, on-site support and IT outsourcing, with aerial photography and drone video services also available.',
    skip: 'Skip to content',
    menu: 'Menu',
    navigation: 'Main navigation',
    language: 'Choose language',
    theme: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
    nav: {
        services: 'IT services',
        approach: 'Our approach',
        drone: 'Drone services',
        contact: 'Contact',
    },
    hero: {
        eyebrow: 'IT SUPPORT FOR YOUR BUSINESS',
        first: 'Keep business moving.',
        second: 'Leave the IT to us.',
        body: 'From everyday technical questions to hands-on help at your office. We help make technology work for you.',
        action: 'Let’s talk',
        secondary: 'Explore IT services',
        footnote: 'Remote or on-site. Built around your needs.',
        diagram: 'IT support connects your office with remote and on-site assistance',
        office: 'Your office',
        remote: 'Remote support',
        onsite: 'On-site support',
    },
    strip: ['Remote support', 'On-site assistance', 'IT outsourcing'],
    services: {
        eyebrow: '01 / IT SERVICES',
        heading: 'Technical support.\nA human approach.',
        body: 'For small businesses, teams and everyday work. We shape our support around what you actually need.',
        items: [
            {
                title: 'Remote support',
                body: 'For issues that don’t need an office visit. We work through the problem with you and help find a solution.',
                points: [
                    'Help with everyday IT',
                    'Technical troubleshooting',
                    'Remote access with your consent',
                ],
                mode: 'ONLINE',
            },
            {
                title: 'On-site support',
                body: 'Some things need a hands-on approach. We arrange a visit to understand the problem where you work.',
                points: [
                    'Support at your office',
                    'Equipment and setup checks',
                    'Scope and timing agreed with you',
                ],
                mode: 'IN PERSON',
            },
            {
                title: 'IT outsourcing',
                body: 'An external IT partner for your team. Together, we agree what we handle and how we fit into your working day.',
                points: [
                    'An agreed scope of IT support',
                    'Assistance for your team',
                    'Planning your next IT steps',
                ],
                mode: 'ONGOING COLLABORATION',
            },
        ],
    },
    approach: {
        eyebrow: '02 / OUR APPROACH',
        heading: 'Understand first.\nThen find the solution.',
        body: 'Plain language, clear next steps. From our first conversation to the work we agree on.',
        steps: [
            {
                title: 'Tell us what you need',
                body: 'Describe the problem or your plans. We listen and ask the questions that matter.',
            },
            {
                title: 'Agree on the approach',
                body: 'Remote or on-site. We work out the scope and timing together.',
            },
            {
                title: 'Work towards a solution',
                body: 'We explain what we’re doing and discuss the next steps for your IT.',
            },
        ],
    },
    drone: {
        eyebrow: '03 / ANOTHER PERSPECTIVE',
        heading: 'A view beyond\nthe everyday.',
        body: 'Alongside IT support, we offer aerial photography and video. For properties, spaces and ideas worth seeing from a different angle.',
        tags: ['Aerial photography', 'Drone video'],
        action: 'Let’s discuss your shoot',
        placeholder: 'Space for an aerial photograph',
        note: 'Selected work will be added here',
    },
    faq: {
        eyebrow: '04 / GOOD TO KNOW',
        heading: 'Have a question?',
        items: [
            {
                question: 'Is your support only for businesses?',
                answer: 'We primarily work with small businesses and teams. If you need help with a personal computer, get in touch so we can see how we can help.',
            },
            {
                question: 'How does remote support work?',
                answer: 'We start by discussing the problem. If access to your computer is needed, we agree on how to connect and only do so with your consent.',
            },
            {
                question: 'Where can you provide on-site support?',
                answer: 'We arrange visits individually. Send us your location and a brief description of the issue so we can discuss availability and timing.',
            },
            {
                question: 'Can I arrange ongoing IT support?',
                answer: 'Yes. For IT outsourcing, we start with your team’s needs and agree on the scope and working arrangement together.',
            },
            {
                question: 'How do I arrange a drone shoot?',
                answer: 'Send us the location, preferred date and the images or video you have in mind. We assess the location and conditions before agreeing on the details.',
            },
        ],
    },
    contact: {
        eyebrow: '05 / CONTACT',
        heading: 'Let’s work out\nyour next IT step.',
        body: 'Tell us what you need. We’ll work out the right way to help, together.',
        phone: 'Phone',
        email: 'Email',
        phonePlaceholder: 'Phone number coming soon',
        emailPlaceholder: 'Email address coming soon',
        coverage: 'On-site availability',
    },
    footer: {
        tagline: 'IT support. Remote and on-site.',
        copyright: 'All rights reserved.',
        top: 'Back to top',
    },
};

export const translations: Record<Locale, Copy> = { sr, en };
