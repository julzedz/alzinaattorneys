import { useTheme } from '../context/ThemeContext';
import logoDarkWebp from '../assets/logo-dark.webp';
import logoDarkPng from '../assets/logo-dark.png';
import logoLightWebp from '../assets/logo-light.webp';
import logoLightPng from '../assets/logo-light.png';

export default function Logo({ className = '' }) {
  const { theme } = useTheme();

  // Naming convention note from spec:
  // "logo-light.webp" is for light backgrounds (i.e. Light theme)
  // "logo-dark.webp" is for dark backgrounds (i.e. Dark theme)
  
  const srcWebp = theme === 'dark' ? logoDarkWebp : logoLightWebp;
  const srcPng = theme === 'dark' ? logoDarkPng : logoLightPng;

  return (
    <picture className={`block ${className}`}>
      <source srcSet={srcWebp} type="image/webp" />
      <source srcSet={srcPng} type="image/png" />
      <img
        src={srcPng}
        alt="Alzina Attorneys"
        className="w-full h-auto object-contain"
        width="180" 
        height="160"
      />
    </picture>
  );
}
