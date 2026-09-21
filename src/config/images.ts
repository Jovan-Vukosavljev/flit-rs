import type { ImageMetadata } from 'astro';
import droneImage from '../assets/drone-farmland.png';
import logo from '../assets/flit-logo.png';
import type { Locale } from './site';

// Import replacement images from src/assets so Astro can optimize them
export const images: {
    logo: ImageMetadata;
    droneImage: ImageMetadata | null;
    droneImageAlt: Record<Locale, string>;
} = {
    logo,
    // Set to null to show the illustration placeholder
    droneImage,
    droneImageAlt: {
        sr: 'Ilustrativni prikaz drona iznad zelenih i zlatnih polja',
        en: 'Illustrative image of a camera drone above green and golden fields',
    },
};
