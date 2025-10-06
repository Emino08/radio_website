import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Eye } from 'lucide-react';
import api from '@/lib/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  category_name: string;
  author_name: string;
  created_at: string;
}

export function ArticleManagement() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await api.get('/admin/articles');
      setArticles(response.data.data || []);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await api.delete(`/admin/articles/${id}`);
      setArticles(articles.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to delete article:', error);
      alert('Failed to delete article');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Article Management</h1>
            <p className="text-muted-foreground">Create and manage news articles</p>
          </div>
          <Link to="/admin/articles/new">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No articles found</p>
              <Link to="/admin/articles/new">
                <Button>Create Your First Article</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                      </div>
                      <CardDescription className="mb-2">
                        {article.excerpt || 'No excerpt provided'}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>By {article.author_name || 'Unknown'}</span>
                        {article.category_name && (
                          <>
                            <span>•</span>
                            <span>{article.category_name}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/news/${article.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Link to={`/admin/articles/${article.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
