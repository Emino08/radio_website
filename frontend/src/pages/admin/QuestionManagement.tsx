import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, MessageSquare, Clock, User, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Question {
  id: number;
  program_name: string;
  host_name: string;
  station_name: string;
  sender_name: string;
  sender_phone?: string;
  sender_email?: string;
  question: string;
  status: string;
  answer?: string;
  answered_by_name?: string;
  is_live: boolean;
  created_at: string;
}

export function QuestionManagement() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [answerModal, setAnswerModal] = useState<{ show: boolean; question?: Question }>({ show: false });
  const [answerText, setAnswerText] = useState('');
  const { hasPermission } = useAuth();

  useEffect(() => {
    loadQuestions();
  }, [filter]);

  const loadQuestions = async () => {
    try {
      const params: any = {};
      if (filter !== 'all') {
        params.status = filter;
      }
      const response = await api.get('/admin/program-questions', { params });
      setQuestions(response.data.data || []);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.put(`/admin/program-questions/${id}`, { status });
      loadQuestions();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const submitAnswer = async () => {
    if (!answerModal.question) return;

    try {
      await api.put(`/admin/program-questions/${answerModal.question.id}`, {
        status: 'answered',
        answer: answerText
      });
      setAnswerModal({ show: false });
      setAnswerText('');
      loadQuestions();
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const deleteQuestion = async (id: number) => {
    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      await api.delete(`/admin/program-questions/${id}`);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      answered: 'bg-blue-500',
      rejected: 'bg-red-500'
    };
    return variants[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Program Questions</h1>
          <p className="text-muted-foreground">Manage questions from listeners during live programs</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            onClick={() => setFilter('approved')}
          >
            Approved
          </Button>
          <Button
            variant={filter === 'answered' ? 'default' : 'outline'}
            onClick={() => setFilter('answered')}
          >
            Answered
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No questions found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{question.program_name}</CardTitle>
                        <Badge className={`${getStatusBadge(question.status)} text-white`}>
                          {question.status}
                        </Badge>
                        {question.is_live && (
                          <Badge className="bg-red-500 text-white">
                            <Radio className="w-3 h-3 mr-1 animate-pulse" />
                            LIVE
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        Host: {question.host_name} • Station: {question.station_name}
                      </CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(question.created_at).toLocaleString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{question.sender_name}</span>
                      {question.sender_phone && (
                        <span className="text-sm text-muted-foreground">• {question.sender_phone}</span>
                      )}
                      {question.sender_email && (
                        <span className="text-sm text-muted-foreground">• {question.sender_email}</span>
                      )}
                    </div>
                    <p className="text-base">{question.question}</p>
                  </div>

                  {question.answer && (
                    <div className="p-4 rounded-md bg-blue-50 border-l-4 border-blue-500">
                      <p className="font-semibold mb-1">Answer by {question.answered_by_name}:</p>
                      <p>{question.answer}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {question.status === 'pending' && hasPermission('questions.manage') && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(question.id, 'approved')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(question.id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    {(question.status === 'approved' || question.status === 'pending') && hasPermission('questions.answer') && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setAnswerModal({ show: true, question });
                          setAnswerText(question.answer || '');
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Answer
                      </Button>
                    )}
                    {hasPermission('questions.manage') && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteQuestion(question.id)}
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

        {/* Answer Modal */}
        {answerModal.show && answerModal.question && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Answer Question</CardTitle>
                <CardDescription>{answerModal.question.question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Answer</label>
                  <textarea
                    className="w-full min-h-[150px] px-3 py-2 border border-input rounded-md"
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Type your answer here..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={submitAnswer} disabled={!answerText}>
                    Submit Answer
                  </Button>
                  <Button variant="outline" onClick={() => setAnswerModal({ show: false })}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
