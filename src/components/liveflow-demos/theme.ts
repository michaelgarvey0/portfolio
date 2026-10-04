import { Inter } from 'next/font/google';

/**
 * Real LiveFlow product branding, scoped to the interactive prototypes only.
 *
 * The case-study page around these demos uses this portfolio's own font and
 * accent color (matching how every other case study borrows its subject's
 * brand for the hero, per the site's existing convention) - but the demos
 * themselves are supposed to feel like the actual product, so they get the
 * real thing: LiveFlow's type scale intent (Suisse Screen, stood in here by
 * Inter - closest free match, same neutral screen-grotesque role) and the
 * real color primitives pulled from LiveFlow's own globals.css.
 *
 * Primitives only, no semantic/alias layer - this is a portfolio demo, not
 * the product, so it doesn't need the full three-layer token system.
 */

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--lf-font',
  display: 'swap',
});

export const LF = {
  primary: {
    0: '#FAFCFF',
    25: '#F0F6FF',
    50: '#EBF4FF',
    100: '#DBEAFF',
    200: '#BED6FE',
    300: '#9BC1FD',
    400: '#7EAEFB',
    500: '#5D99F8',
    600: '#4778D1',
    700: '#2E54AD',
    800: '#1C3387',
    900: '#0C1164',
  },
  grey: {
    0: '#FDFDFD',
    25: '#F6F5F4',
    50: '#F3F2F1',
    100: '#E9E8E7',
    200: '#D5D4D3',
    300: '#C1BFBE',
    400: '#ACABAA',
    500: '#9A9998',
    600: '#797877',
    700: '#5A5958',
    800: '#3C3A39',
    900: '#201F1D',
  },
  secondary: {
    green50: '#E5F5EC',
    green900: '#14715B',
    red50: '#FFEBEB',
    red900: '#7E023E',
  },
  tertiary: {
    peach50: '#FFEDD6',
    peach900: '#B93809',
    teal50: '#CDFAFE',
    teal900: '#164F64',
    slate50: '#F1F5F9',
    slate900: '#0F1729',
    lime50: '#ECFFC7',
    lime900: '#67AE04',
    cherry50: '#FFE5EE',
    cherry900: '#BA0343',
    violet50: '#F9E5FF',
    violet900: '#711A75',
    eggplant50: '#F6F5FF',
    eggplant900: '#4D1D95',
  },
} as const;
