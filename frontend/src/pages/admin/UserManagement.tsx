import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, UserPlus, Shield } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  created_at: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'editor': return 'bg-blue-500';
      case 'moderator': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const canManageUsers = hasPermission('users.create') || hasPermission('users.edit');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage users, roles, and permissions</p>
          </div>
          {hasPermission('users.create') && (
            <Link to="/admin/users/new">
              <Button className="bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                New User
              </Button>
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No users found</p>
              {hasPermission('users.create') && (
                <Link to="/admin/users/new">
                  <Button>Create Your First User</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {canManageUsers && (
                      <div className="flex gap-2">
                        {hasPermission('users.edit') && (
                          <Link to={`/admin/users/${user.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Link>
                        )}
                        {hasPermission('users.delete') && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(user.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
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
