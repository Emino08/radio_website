import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Radio, User, Play } from 'lucide-react';

interface ProgramSchedule {
  id: number;
  name: string;
  host: string;
  description: string;
  time: string;
  days: string[];
  category: string;
  image: string;
}

export function Programs() {
  const programs: ProgramSchedule[] = [
    {
      id: 1,
      name: 'Morning Glory',
      host: 'Mary Bangura',
      description: 'Start your day with uplifting worship, inspiring devotions, and the latest news. A perfect blend of praise and information to energize your morning.',
      time: '6:00 AM - 9:00 AM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      category: 'Morning Show',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'The Word Today',
      host: 'Rev. Samuel Kamara',
      description: 'Deep dive into the Scriptures with powerful biblical teaching and practical application for daily Christian living.',
      time: '9:00 AM - 10:00 AM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      category: 'Teaching',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Midday Praise',
      host: 'Grace Koroma',
      description: 'Non-stop praise and worship music to keep your spirit lifted throughout the day. Includes listener dedications and song requests.',
      time: '12:00 PM - 2:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      name: 'Youth Alive',
      host: 'Joseph Sesay',
      description: 'A dynamic program designed for young people featuring contemporary Christian music, youth testimonies, and discussions on relevant topics.',
      time: '4:00 PM - 6:00 PM',
      days: ['Monday', 'Wednesday', 'Friday'],
      category: 'Youth',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'Evening Reflections',
      host: 'Pastor John Koroma',
      description: 'End your day with peace and reflection. Evening prayers, soothing worship songs, and encouraging words to prepare your heart for rest.',
      time: '7:00 PM - 9:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      category: 'Devotional',
      image: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'Sunday Celebration',
      host: 'Various Ministers',
      description: 'Live church service broadcasts from different churches across Bo. Experience the joy of corporate worship from the comfort of your home.',
      time: '9:00 AM - 12:00 PM',
      days: ['Sunday'],
      category: 'Church Service',
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=300&fit=crop',
    },
    {
      id: 7,
      name: 'Gospel Hour',
      host: 'Ministry Team',
      description: 'Powerful gospel music from around the world featuring both traditional and contemporary Christian artists.',
      time: '3:00 PM - 5:00 PM',
      days: ['Saturday', 'Sunday'],
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    },
    {
      id: 8,
      name: 'Night Watch',
      host: 'Prayer Team',
      description: 'Late night prayer and intercession program. Call in with your prayer requests and join us in seeking God\'s face.',
      time: '10:00 PM - 12:00 AM',
      days: ['Friday', 'Saturday'],
      category: 'Prayer',
      image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&h=300&fit=crop',
    },
  ];

  const [selectedDay, setSelectedDay] = useState<string>('All');
  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredPrograms = selectedDay === 'All'
    ? programs
    : programs.filter(program => program.days.includes(selectedDay));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">Our Programs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Program <span className="text-secondary">Schedule</span>
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Tune in to our diverse range of programs designed to inspire, educate, and entertain
            </p>
          </div>
        </div>
      </section>

      {/* Day Filter */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-semibold mr-2">Filter by Day:</span>
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDay(day)}
                className={selectedDay === day ? 'bg-primary' : ''}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className="bg-secondary">{program.category}</Badge>
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {program.host}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {program.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Clock className="w-4 h-4" />
                      {program.time}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {program.days.map((day) => (
                        <Badge key={day} variant="outline" className="text-xs">
                          {day.slice(0, 3)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <Radio className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No programs scheduled for this day</p>
            </div>
          )}
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Weekly Schedule at a Glance</h2>
          <Card className="max-w-5xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                {days.slice(1).map((day) => {
                  const dayPrograms = programs.filter(p => p.days.includes(day));
                  return (
                    <div key={day} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h3 className="font-bold text-lg mb-3 text-primary">{day}</h3>
                      <div className="grid gap-2">
                        {dayPrograms.map((program) => (
                          <div key={`${day}-${program.id}`} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="font-medium">{program.time}</span>
                            </div>
                            <span className="text-muted-foreground">{program.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss Your Favorite Program</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Tune in to 97.7 FM or listen online 24/7
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">
            <Play className="w-5 h-5 mr-2" />
            Listen Live Now
          </Button>
        </div>
      </section>
    </div>
  );
}
