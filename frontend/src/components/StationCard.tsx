import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Heart } from 'lucide-react';
import type { Station } from '@/types';

interface StationCardProps {
  station: Station;
  onPlay: (station: Station) => void;
}

export function StationCard({ station, onPlay }: StationCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="relative pb-0">
        <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-muted">
          {station.logo_url ? (
            <img
              src={station.logo_url}
              alt={station.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <span className="text-4xl font-bold text-primary/40">{station.name[0]}</span>
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {station.is_featured && (
            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardTitle className="line-clamp-1">{station.name}</CardTitle>
        {station.tagline && (
          <CardDescription className="line-clamp-1 font-medium">
            {station.tagline}
          </CardDescription>
        )}
        <CardDescription className="line-clamp-2">
          {station.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1 pt-2">
          <Badge variant="secondary">{station.genre}</Badge>
          {station.sub_genres?.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{station.listener_count.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="hover:text-red-500">
            <Heart className="w-4 h-4" />
          </Button>
          <Button onClick={() => onPlay(station)} size="sm" className="gap-2">
            <Play className="w-4 h-4" />
            Play Live
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
