'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';

const LeafEffect = () => {
  const [leaves, setLeaves] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const leafCount = 15;
    const newLeaves = Array.from({ length: leafCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      delay: Math.random() * 10, // Random delay
      duration: 10 + Math.random() * 10, // Random duration (10-20s)
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          initial={{ y: -50, x: `${leaf.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: `${leaf.x + (Math.random() * 20 - 10)}vw`, // Drift left/right
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'linear',
          }}
          className="absolute text-green-800/20"
        >
          <Leaf size={24} />
        </motion.div>
      ))}
    </div>
  );
};

export default LeafEffect;
