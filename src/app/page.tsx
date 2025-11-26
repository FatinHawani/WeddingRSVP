'use client';

import Entrance from '@/components/Entrance';
import Countdown from '@/components/sections/Countdown';
import FormalText from '@/components/sections/FormalText';
import Intro from '@/components/sections/Intro';
import Program from '@/components/sections/Program';
import Guestbook from '@/components/sections/Guestbook';
import Prayer from '@/components/sections/Prayer';
import { useState } from 'react';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <Entrance onEnter={() => setHasEntered(true)} />

      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <div className="container mx-auto px-4 pb-32">
          <Intro hasEntered={hasEntered} />
          <FormalText />
          <Program />
          <Countdown />
          <Prayer />
          <Guestbook />
        </div>
      </div>
    </>
  );
}
