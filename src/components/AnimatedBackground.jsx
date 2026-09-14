import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function AnimatedBackground() {
  const { theme } = useTheme();
  
  const blob1Color = theme === 'dark' ? 'rgba(199, 122, 122, 0.4)' : 'rgba(199, 122, 122, 0.3)';
  const blob2Color = theme === 'dark' ? 'rgba(138, 46, 46, 0.5)' : 'rgba(138, 46, 46, 0.25)';
  const blob3Color = theme === 'dark' ? 'rgba(107, 31, 31, 0.6)' : 'rgba(107, 31, 31, 0.2)';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0 opacity-15 dark:opacity-10 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full filter blur-2xl"
        style={{ backgroundColor: blob1Color }}
        animate={{
          x: ['-5%', '15%', '-5%', '-5%'],
          y: ['-5%', '15%', '5%', '-5%'],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute top-[10%] right-[-10%] w-[70%] h-[70%] rounded-full filter blur-[50px]"
        style={{ backgroundColor: blob2Color }}
        animate={{
          x: ['10%', '-15%', '10%', '10%'],
          y: ['-10%', '15%', '20%', '-10%'],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-[-20%] left-[10%] w-[80%] h-[70%] rounded-full filter blur-[60px]"
        style={{ backgroundColor: blob3Color }}
        animate={{
          x: ['0%', '15%', '-10%', '0%'],
          y: ['10%', '-15%', '0%', '10%'],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
}
