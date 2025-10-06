import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Radio, MessageSquare, Music, Heart } from 'lucide-react';
import api from '@/lib/api';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    stations: 0,
    programs: 0,
    questions: 0,
    song_requests: 0,
    shoutouts: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get all data to count
      const [articlesRes, stationsRes, programsRes, statisticsRes] = await Promise.all([
        api.get('/admin/articles'),
        api.get('/stations'),
        api.get('/programs'),
        api.get('/admin/statistics'),
      ]);

      setStats({
        articles: articlesRes.data.data?.length || 0,
        stations: stationsRes.data.data?.length || 0,
        programs: programsRes.data.data?.length || 0,
        questions: statisticsRes.data.data?.questions?.total || 0,
        song_requests: statisticsRes.data.data?.song_requests?.total || 0,
        shoutouts: statisticsRes.data.data?.shoutouts?.total || 0,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const statCards = [
    { title: 'Total Articles', value: stats.articles, icon: FileText, color: 'bg-blue-500' },
    { title: 'Radio Stations', value: stats.stations, icon: Radio, color: 'bg-green-500' },
    { title: 'Programs', value: stats.programs, icon: Users, color: 'bg-purple-500' },
    { title: 'Questions', value: stats.questions, icon: MessageSquare, color: 'bg-orange-500' },
    { title: 'Song Requests', value: stats.song_requests, icon: Music, color: 'bg-pink-500' },
    { title: 'Shoutouts', value: stats.shoutouts, icon: Heart, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your radio station content and settings</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage articles and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/articles/new">
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Article
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/articles">
                  <FileText className="w-4 h-4 mr-2" />
                  Manage Articles
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/stations/new">
                  <Radio className="w-4 h-4 mr-2" />
                  Add Radio Station
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Listener Engagement</CardTitle>
              <CardDescription>Manage questions and requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/questions">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Program Questions
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/requests">
                  <Music className="w-4 h-4 mr-2" />
                  Song Requests & Shoutouts
                </a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

