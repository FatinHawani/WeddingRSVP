'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((error) => {
                    console.error("Audio playback failed:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Auto-play logic would go here, but usually requires interaction.
        // We'll expose a method or event listener if needed for the "Entrance" trigger.
        const handleGlobalPlay = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().catch(() => {
                    // Autoplay prevented
                });
                setIsPlaying(true);
            }
        };

        window.addEventListener('trigger-audio', handleGlobalPlay);
        return () => window.removeEventListener('trigger-audio', handleGlobalPlay);
    }, [isPlaying]);

    return (
        <div className="fixed bottom-20 left-4 z-50">
            <audio ref={audioRef} loop src="/audio/background.mp3" />
            <button
                onClick={togglePlay}
                className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg text-stone-800 hover:bg-white transition-all"
                aria-label={isPlaying ? "Mute" : "Play Music"}
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
        </div>
    );
};

export default AudioPlayer;
