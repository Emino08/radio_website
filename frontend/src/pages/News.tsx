import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, Eye, TrendingUp } from 'lucide-react';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  views: number;
  featured: boolean;
}

export function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const articles: NewsArticle[] = [
    {
      id: 1,
      title: 'Radio New Song Celebrates 13 Years of Broadcasting Excellence',
      excerpt: 'As we mark over a decade of faithful service, we reflect on God\'s goodness and our journey of impacting lives through Christian radio.',
      content: 'Full article content...',
      category: 'Station News',
      author: 'Grace Koroma',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=500&fit=crop',
      views: 1245,
      featured: true,
    },
    {
      id: 2,
      title: 'New Youth Program Launches This Saturday',
      excerpt: 'We are excited to announce the launch of "Youth Alive" - a dynamic new program designed specifically for young people in Bo and beyond.',
      content: 'Full article content...',
      category: 'Programs',
      author: 'Joseph Sesay',
      date: '2024-01-12',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
      views: 892,
      featured: true,
    },
    {
      id: 3,
      title: 'Community Outreach: Radio New Song Supports Local Schools',
      excerpt: 'In partnership with local churches, we recently donated educational materials to three schools in Bo district.',
      content: 'Full article content...',
      category: 'Community',
      author: 'Samuel Kamara',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop',
      views: 654,
      featured: true,
    },
    {
      id: 4,
      title: 'Easter Celebration: Special Programming Announced',
      excerpt: 'Join us for a week of special Easter programming featuring live church services, Easter music, and inspirational messages.',
      content: 'Full article content...',
      category: 'Events',
      author: 'Mary Bangura',
      date: '2024-01-08',
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=500&fit=crop',
      views: 1103,
      featured: false,
    },
    {
      id: 5,
      title: 'Interview: Bishop Moses Speaks on Faith and Leadership',
      excerpt: 'Our morning show hosted Bishop Moses for an insightful conversation about Christian leadership in modern Sierra Leone.',
      content: 'Full article content...',
      category: 'Interviews',
      author: 'Grace Koroma',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
      views: 756,
      featured: false,
    },
    {
      id: 6,
      title: 'New Studio Equipment Enhances Broadcast Quality',
      excerpt: 'Thanks to generous donations, we have upgraded our studio equipment to deliver even better sound quality to our listeners.',
      content: 'Full article content...',
      category: 'Station News',
      author: 'Technical Team',
      date: '2024-01-03',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop',
      views: 543,
      featured: false,
    },
    {
      id: 7,
      title: 'Prayer Conference 2024: Registration Now Open',
      excerpt: 'Join us for our annual Prayer Conference featuring renowned speakers from across West Africa. Early bird registration available.',
      content: 'Full article content...',
      category: 'Events',
      author: 'Events Team',
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&h=500&fit=crop',
      views: 982,
      featured: false,
    },
    {
      id: 8,
      title: 'Christmas Highlights: Thank You for Making It Special',
      excerpt: 'A heartfelt thank you to everyone who participated in our Christmas programs. Your support made the season truly memorable.',
      content: 'Full article content...',
      category: 'Community',
      author: 'Mary Bangura',
      date: '2023-12-28',
      image: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800&h=500&fit=crop',
      views: 1234,
      featured: false,
    },
  ];

  const categories = ['All', 'Station News', 'Programs', 'Community', 'Events', 'Interviews'];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter(a => a.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">News & Updates</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Latest <span className="text-secondary">News</span>
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Stay updated with the latest news, events, and stories from Radio New Song 97.7 FM
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">Featured Stories</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video w-full overflow-hidden bg-muted relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        {article.views}
                      </div>
                    </div>
                    <Button variant="link" className="p-0 mt-4 text-primary">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-primary' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">All News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span className="text-xs">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No articles found</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss an update from Radio New Song
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-foreground"
            />
            <Button className="bg-secondary hover:bg-secondary/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
