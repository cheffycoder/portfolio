import localFont from 'next/font/local';

// Self-hosted from src/assets/fonts (SIL Open Font License), so builds never depend on Google.
// On Apple devices the system font (SF Pro) leads the stack; Inter is the fallback everywhere else.
export const inter = localFont({
  src: '../../assets/fonts/inter-latin-variable.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

export const spaceGrotesk = localFont({
  src: '../../assets/fonts/space-grotesk-latin-variable.woff2',
  weight: '300 700',
  variable: '--font-space-grotesk',
  display: 'swap',
});
