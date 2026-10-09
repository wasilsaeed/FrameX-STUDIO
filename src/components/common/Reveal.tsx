import { motion, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export function Reveal({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.08 }}
      transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
