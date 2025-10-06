import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Radio, Send, Clock, User, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import api from '@/lib/api';

interface Program {
  id: number;
  name: string;
  host_name: string;
  station_name: string;
  start_time: string;
  end_time: string;
  days_of_week: string[];
  allows_questions: boolean;
}

export function LiveProgramQuestions() {
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_phone: '',
    sender_email: '',
    question: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkActiveProgram();
    const interval = setInterval(checkActiveProgram, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const checkActiveProgram = async () => {
    try {
      const response = await api.get('/programs/active/1'); // Station ID 1
      if (response.data.success && response.data.data) {
        setActiveProgram(response.data.data);
      } else {
        setActiveProgram(null);
      }
    } catch (error) {
      console.error('Failed to check active program:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await api.post('/program-questions', {
        program_id: activeProgram?.id,
        ...formData
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          sender_name: '',
          sender_phone: '',
          sender_email: '',
          question: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit question');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Checking for live programs...</p>
      </div>
    );
  }

  if (!activeProgram) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Live Program</h3>
          <p className="text-muted-foreground">
            There is no program currently on air. Questions can only be submitted during live broadcasts.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Program Info */}
      <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-1">{activeProgram.name}</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  with {activeProgram.host_name}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-secondary text-white">
              <Radio className="w-3 h-3 mr-1 animate-pulse" />
              LIVE NOW
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{activeProgram.start_time} - {activeProgram.end_time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Radio className="w-4 h-4" />
              <span>{activeProgram.station_name}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Form */}
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Submit your question to {activeProgram.host_name}. Your question may be answered live on air!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 rounded-md bg-green-50 text-green-700 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <p>Your question has been submitted successfully! The host will review it shortly.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-50 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  required
                  value={formData.sender_name}
                  onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                  placeholder="John Doe"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={formData.sender_phone}
                    onChange={(e) => setFormData({ ...formData, sender_phone: e.target.value })}
                    placeholder="+232 76 123 456"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    placeholder="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Question *</label>
              <textarea
                required
                className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Type your question here..."
              />
            </div>

            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit Question'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
