'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1); // Default 10% volume
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

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // Set initial volume when audio element is ready
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    useEffect(() => {
        // Auto-play logic would go here, but usually requires interaction.
        // We'll expose a method or event listener if needed for the "Entrance" trigger.
        const handleGlobalPlay = () => {
            // Add a small delay to ensure user interaction is complete
            setTimeout(() => {
                if (audioRef.current && !isPlaying) {
                    // Load the audio first
                    audioRef.current.load();
                    // Then play it
                    audioRef.current.play().catch((error) => {
                        console.error("Audio playback failed:", error);
                    });
                    setIsPlaying(true);
                }
            }, 100);
        };

        window.addEventListener('trigger-audio', handleGlobalPlay);
        return () => window.removeEventListener('trigger-audio', handleGlobalPlay);
    }, [isPlaying]);

    return (
        <div className="fixed bottom-20 right-4 z-50">
            <audio
                ref={audioRef}
                loop
                preload="none"
                src="/audio/background.mp3"
            />

            {/* Combined Audio Control */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${isPlaying ? 'px-4 py-3' : 'p-3'
                }`}>
                <div className="flex items-center gap-3">
                    {/* Speaker Icon Button */}
                    <button
                        onClick={togglePlay}
                        className="text-stone-800 hover:text-stone-600 transition-colors flex-shrink-0"
                        aria-label={isPlaying ? "Pause Music" : "Play Music"}
                    >
                        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>

                    {/* Volume Slider - Only show when playing */}
                    {isPlaying && (
                        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-stone-600"
                                aria-label="Volume Control"
                            />
                            <span className="text-[10px] font-medium text-stone-600 w-8 text-right">
                                {Math.round(volume * 100)}%
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
