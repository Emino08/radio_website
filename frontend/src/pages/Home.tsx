import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radio, Play, Calendar, Clock, ArrowRight, Mic2, Heart, Users } from 'lucide-react';
import type { Station, Article } from '@/types';
import { getStations, getFeaturedArticles } from '@/lib/api';

interface HomeProps {
  onPlayStation: (station: Station) => void;
}

export function Home({ onPlayStation }: HomeProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [stationsData, articlesData] = await Promise.all([
        getStations(),
        getFeaturedArticles(3)
      ]);
      setStations(stationsData);
      setArticles(articlesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // Radio New Song 97.7 FM station data
  const radioNewSong = stations.find(s => s.name.includes('New Song')) || {
    id: 1,
    name: 'Radio New Song 97.7 FM',
    slug: 'radio-new-song',
    description: 'Broadcasting the Good News from Bo, Sierra Leone',
    stream_url: 'https://stream.example.com/radionewsong',
    genre: 'Christian',
    language: 'English',
    listener_count: 0,
    is_active: true,
    is_featured: true,
  } as Station;

  const todayPrograms = [
    { time: '6:00 AM', name: 'Morning Glory', host: 'Mary Bangura' },
    { time: '9:00 AM', name: 'The Word Today', host: 'Rev. Samuel Kamara' },
    { time: '12:00 PM', name: 'Midday Praise', host: 'Grace Koroma' },
    { time: '4:00 PM', name: 'Youth Alive', host: 'Joseph Sesay' },
    { time: '7:00 PM', name: 'Evening Reflections', host: 'Pastor John Koroma' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgMTM0aDEydjEySDF2LTEyem0yNCAwaDEydjEySDM2em0yNC0yNGgxMnYxMkg2MHptLTI0IDBoMTJ2MTJIMzZ6bS0yNC0yNGgxMnYxMkgxMnptMjQgMGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgODZoMTJ2MTJIMTJ6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINDB6TTEyIDYyaDEydjEySDF2LTEyem0yNCAwaDEydjEySDM2em0yNC0yNGgxMnYxMkg2MHptLTI0IDBoMTJ2MTJIMzZ6bS0yNC0yNGgxMnYxMkgxMnptMjQgMGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-secondary px-6 py-3 rounded-full shadow-lg">
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="font-bold text-lg">ON AIR • 97.7 FM</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              Radio New Song
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-secondary">
              97.7 FM
            </p>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto">
              Broadcasting the Good News and Uplifting Music from Bo, Sierra Leone 🇸🇱
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-6 shadow-xl"
                onClick={() => onPlayStation(radioNewSong)}
              >
                <Play className="w-6 h-6 mr-2 fill-current" />
                Listen Live Now
              </Button>
              <Link to="/programs">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6">
                  View Programs
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 pt-8 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                <span><strong className="text-secondary">{radioNewSong.listener_count || 0}</strong> Listening Now</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-secondary" />
                <span>Broadcasting <strong className="text-secondary">24/7</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Mic2 className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Inspiring Programs</CardTitle>
                <CardDescription>
                  Daily programs designed to uplift, encourage, and transform lives through the power of God's Word
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 border-secondary/20 hover:border-secondary transition-colors">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-secondary/10">
                    <Heart className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Community Focused</CardTitle>
                <CardDescription>
                  Serving Bo and surrounding areas with relevant news, events, and programs that matter to you
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 border-primary/20 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Radio className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Quality Broadcasting</CardTitle>
                <CardDescription>
                  Crystal clear sound, professional programming, and the best gospel music selection
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Today's Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Today's Schedule</h2>
              </div>
              <Link to="/programs">
                <Button variant="outline">
                  Full Schedule
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {todayPrograms.map((program, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-primary font-bold min-w-[100px]">
                          <Clock className="w-4 h-4" />
                          {program.time}
                        </div>
                        <div>
                          <p className="font-semibold">{program.name}</p>
                          <p className="text-sm text-muted-foreground">with {program.host}</p>
                        </div>
                      </div>
                      <Badge className="bg-secondary">Live</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {articles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Latest News & Updates</h2>
              <Link to="/news">
                <Button variant="outline">
                  All News
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {article.featured_image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    {article.category_name && (
                      <Badge variant="secondary" className="w-fit mb-2 bg-secondary">
                        {article.category_name}
                      </Badge>
                    )}
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="p-0 text-primary">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-xl leading-relaxed text-primary-foreground/90">
              To proclaim the Gospel of Jesus Christ through quality Christian broadcasting, 
              providing our listeners with uplifting music, biblical teachings, and relevant 
              programming that transforms lives, strengthens faith, and builds community in 
              Bo and throughout Sierra Leone.
            </p>
            <div className="pt-6">
              <Link to="/about">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Have a prayer request, song dedication, or want to partner with us? We'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Contact Us
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Submit Prayer Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
