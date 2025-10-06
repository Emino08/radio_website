import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save } from 'lucide-react';
import api from '@/lib/api';

interface Role {
  value: string;
  label: string;
  description: string;
}

export function UserEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    avatar: '',
    role: 'user',
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRoles();
    if (isEditing) {
      loadUser();
    }
  }, [id]);

  const loadRoles = async () => {
    try {
      const response = await api.get('/admin/roles');
      setRoles(response.data.data || []);
    } catch (error) {
      console.error('Failed to load roles:', error);
    }
  };

  const loadUser = async () => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      const user = response.data.data;
      setFormData({
        email: user.email,
        password: '', // Don't load password
        name: user.name,
        avatar: user.avatar || '',
        role: user.role,
      });
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Don't send empty password on update
      const data = { ...formData };
      if (isEditing && !data.password) {
        delete (data as any).password;
      }

      if (isEditing) {
        await api.put(`/admin/users/${id}`, data);
      } else {
        await api.post('/admin/users', data);
      }
      navigate('/admin/users');
    } catch (error: any) {
      console.error('Failed to save user:', error);
      alert(error.response?.data?.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/admin/users')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>
          <h1 className="text-4xl font-bold mb-2">
            {isEditing ? 'Edit User' : 'Create New User'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update user information and permissions' : 'Add a new user to the system'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>Fill in the user information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password {isEditing && '(leave blank to keep current)'}
                  {!isEditing && ' *'}
                </label>
                <Input
                  type="password"
                  required={!isEditing}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Avatar URL</label>
                <Input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/users')}
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
