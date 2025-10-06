import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import type { Station } from '@/types';
import { incrementListener, decrementListener } from '@/lib/api';

interface AudioPlayerProps {
  station: Station | null;
  onClose: () => void;
}

export function AudioPlayer({ station, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (station && audioRef.current) {
      setIsLoading(true);
      audioRef.current.src = station.stream_url;
      audioRef.current.volume = volume / 100;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          incrementListener(station.id);
        })
        .catch((error) => {
          console.error('Playback error:', error);
          setIsPlaying(false);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          if (station) {
            decrementListener(station.id);
          }
        }
      };
    }
  }, [station]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (station) decrementListener(station.id);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            if (station) incrementListener(station.id);
          })
          .catch((error) => {
            console.error('Playback error:', error);
          });
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (station) {
        decrementListener(station.id);
      }
    }
    setIsPlaying(false);
    onClose();
  };

  if (!station) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 border-t rounded-none shadow-2xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <audio ref={audioRef} />
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Station Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {station.logo_url ? (
              <img
                src={station.logo_url}
                alt={station.name}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-primary">{station.name[0]}</span>
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold truncate">{station.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {isLoading ? 'Loading...' : isPlaying ? 'Now Playing' : 'Paused'}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={togglePlay}
              disabled={isLoading}
              className="h-10 w-10"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
            <Button size="icon" variant="ghost" onClick={toggleMute} className="h-8 w-8">
              {isMuted || volume === 0 ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>

          {/* Close */}
          <Button size="icon" variant="ghost" onClick={handleClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
