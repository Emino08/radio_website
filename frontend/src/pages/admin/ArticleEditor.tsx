import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import api from '@/lib/api';

interface ArticleFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category_id: number | null;
  status: 'draft' | 'published';
}

export function ArticleEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category_id: null,
    status: 'draft',
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadArticle();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const response = await api.get('/articles/categories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadArticle = async () => {
    try {
      const response = await api.get(`/admin/articles`);
      const article = response.data.data.find((a: any) => a.id === parseInt(id!));
      if (article) {
        setFormData({
          title: article.title,
          content: article.content,
          excerpt: article.excerpt || '',
          featured_image: article.featured_image || '',
          category_id: article.category_id,
          status: article.status,
        });
      }
    } catch (error) {
      console.error('Failed to load article:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await api.put(`/admin/articles/${id}`, formData);
      } else {
        await api.post('/admin/articles', formData);
      }
      navigate('/admin/articles');
    } catch (error) {
      console.error('Failed to save article:', error);
      alert('Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/articles')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
          <h1 className="text-4xl font-bold mb-2">
            {isEditing ? 'Edit Article' : 'Create New Article'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your article' : 'Write and publish a new article'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Article Details</CardTitle>
              <CardDescription>Fill in the article information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary of the article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  required
                  className="w-full min-h-[300px] px-3 py-2 border border-input rounded-md"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your article content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <Input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full px-3 py-2 border border-input rounded-md"
                  value={formData.category_id || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category_id: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                >
                  <option value="">No Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  className="w-full px-3 py-2 border border-input rounded-md"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/articles')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
