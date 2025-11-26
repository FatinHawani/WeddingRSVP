'use client';

import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';
import { useEffect, useState } from 'react';

const FlowerEffect = () => {
  const [flowers, setFlowers] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const flowerCount = 15;
    const newFlowers = Array.from({ length: flowerCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      delay: Math.random() * 10, // Random delay
      duration: 10 + Math.random() * 10, // Random duration (10-20s)
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{ y: -50, x: `${flower.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: `${flower.x + (Math.random() * 20 - 10)}vw`, // Drift left/right
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: flower.duration,
            repeat: Infinity,
            delay: flower.delay,
            ease: 'linear',
          }}
          className="absolute text-amber-300/20"
        >
          <Flower size={24} />
        </motion.div>
      ))}
    </div>
  );
};

export default FlowerEffect;
