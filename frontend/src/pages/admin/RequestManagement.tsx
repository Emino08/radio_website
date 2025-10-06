import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Heart, CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface SongRequest {
  id: number;
  station_name: string;
  song_name: string;
  artist_name?: string;
  message?: string;
  requester_name?: string;
  requester_email?: string;
  status: string;
  created_at: string;
  played_at?: string;
}

interface Shoutout {
  id: number;
  station_name: string;
  from_name: string;
  to_name: string;
  message: string;
  status: string;
  read_on_air: boolean;
  created_at: string;
  read_at?: string;
}

export function RequestManagement() {
  const [songRequests, setSongRequests] = useState<SongRequest[]>([]);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const [loading, setLoading] = useState(true);
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [requestsRes, shoutoutsRes] = await Promise.all([
        api.get('/admin/song-requests'),
        api.get('/admin/shoutouts')
      ]);
      setSongRequests(requestsRes.data.data || []);
      setShoutouts(shoutoutsRes.data.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSongRequestStatus = async (id: number, status: string) => {
    try {
      await api.put(`/admin/song-requests/${id}`, { status });
      loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const updateShoutoutStatus = async (id: number, status: string, readOnAir?: boolean) => {
    try {
      const data: any = { status };
      if (readOnAir !== undefined) {
        data.read_on_air = readOnAir;
      }
      await api.put(`/admin/shoutouts/${id}`, data);
      loadData();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteSongRequest = async (id: number) => {
    if (!confirm('Are you sure you want to delete this request?')) return;
    try {
      await api.delete(`/admin/song-requests/${id}`);
      setSongRequests(songRequests.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const deleteShoutout = async (id: number) => {
    if (!confirm('Are you sure you want to delete this shoutout?')) return;
    try {
      await api.delete(`/admin/shoutouts/${id}`);
      setShoutouts(shoutouts.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      rejected: 'bg-red-500'
    };
    return variants[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Request Management</h1>
          <p className="text-muted-foreground">Manage song requests and shoutouts from listeners</p>
        </div>

        <Tabs defaultValue="songs" className="w-full">
          <TabsList>
            <TabsTrigger value="songs">
              <Music className="w-4 h-4 mr-2" />
              Song Requests ({songRequests.length})
            </TabsTrigger>
            <TabsTrigger value="shoutouts">
              <Heart className="w-4 h-4 mr-2" />
              Shoutouts ({shoutouts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="songs" className="space-y-4 mt-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading song requests...</p>
              </div>
            ) : songRequests.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No song requests found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {songRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Music className="w-5 h-5 text-primary" />
                            <CardTitle className="text-lg">{request.song_name}</CardTitle>
                            <Badge className={`${getStatusBadge(request.status)} text-white`}>
                              {request.status}
                            </Badge>
                          </div>
                          {request.artist_name && (
                            <CardDescription>by {request.artist_name}</CardDescription>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(request.created_at).toLocaleString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {request.message && (
                        <p className="text-sm text-muted-foreground">{request.message}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <span>Station: <strong>{request.station_name}</strong></span>
                        {request.requester_name && (
                          <span>From: <strong>{request.requester_name}</strong></span>
                        )}
                      </div>
                      {request.played_at && (
                        <div className="text-sm text-green-600">
                          ✓ Played on {new Date(request.played_at).toLocaleString()}
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        {request.status === 'pending' && hasPermission('requests.approve') && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateSongRequestStatus(request.id, 'approved')}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateSongRequestStatus(request.id, 'rejected')}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {hasPermission('requests.manage') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteSongRequest(request.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shoutouts" className="space-y-4 mt-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading shoutouts...</p>
              </div>
            ) : shoutouts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No shoutouts found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {shoutouts.map((shoutout) => (
                  <Card key={shoutout.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            <CardTitle className="text-lg">
                              From {shoutout.from_name} to {shoutout.to_name}
                            </CardTitle>
                            <Badge className={`${getStatusBadge(shoutout.status)} text-white`}>
                              {shoutout.status}
                            </Badge>
                            {shoutout.read_on_air && (
                              <Badge className="bg-blue-500 text-white">
                                Read on Air
                              </Badge>
                            )}
                          </div>
                          <CardDescription>Station: {shoutout.station_name}</CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(shoutout.created_at).toLocaleString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-base">{shoutout.message}</p>
                      {shoutout.read_at && (
                        <div className="text-sm text-blue-600">
                          ✓ Read on air at {new Date(shoutout.read_at).toLocaleString()}
                        </div>
                      )}
                      <div className="flex gap-2 pt-2">
                        {shoutout.status === 'pending' && hasPermission('requests.manage') && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateShoutoutStatus(shoutout.id, 'approved')}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateShoutoutStatus(shoutout.id, 'rejected')}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {shoutout.status === 'approved' && !shoutout.read_on_air && hasPermission('requests.manage') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateShoutoutStatus(shoutout.id, 'approved', true)}
                          >
                            Mark as Read on Air
                          </Button>
                        )}
                        {hasPermission('requests.manage') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteShoutout(shoutout.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
