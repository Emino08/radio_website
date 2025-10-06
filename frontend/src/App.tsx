import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Programs } from '@/pages/Programs';
import { News } from '@/pages/News';
import { Contact } from '@/pages/Contact';
import { AskQuestion } from '@/pages/AskQuestion';
import { TailwindTest } from '@/pages/TailwindTest';
import { ColorTest } from '@/pages/ColorTest';
import { Login } from '@/pages/Login';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { ArticleManagement } from '@/pages/admin/ArticleManagement';
import { ArticleEditor } from '@/pages/admin/ArticleEditor';
import { UserManagement } from '@/pages/admin/UserManagement';
import { UserEditor } from '@/pages/admin/UserEditor';
import { QuestionManagement } from '@/pages/admin/QuestionManagement';
import { RequestManagement } from '@/pages/admin/RequestManagement';
import { AudioPlayer } from '@/components/AudioPlayer';
import type { Station } from '@/types';

function App() {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  const handlePlayStation = (station: Station) => {
    setCurrentStation(station);
  };

  const handleClosePlayer = () => {
    setCurrentStation(null);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Public routes with header/footer */}
            <Route path="/login" element={<Login />} />
            
            <Route path="/*" element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home onPlayStation={handlePlayStation} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ask-question" element={<AskQuestion />} />
                    <Route path="/tailwind-test" element={<TailwindTest />} />
                    <Route path="/color-test" element={<ColorTest />} />
                    
                    {/* Protected Admin Routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/articles" element={
                      <ProtectedRoute permission="articles.edit">
                        <ArticleManagement />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/articles/new" element={
                      <ProtectedRoute permission="articles.create">
                        <ArticleEditor />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/articles/:id/edit" element={
                      <ProtectedRoute permission="articles.edit">
                        <ArticleEditor />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/users" element={
                      <ProtectedRoute permission="users.edit">
                        <UserManagement />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/users/new" element={
                      <ProtectedRoute permission="users.create">
                        <UserEditor />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/users/:id/edit" element={
                      <ProtectedRoute permission="users.edit">
                        <UserEditor />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/questions" element={
                      <ProtectedRoute permission="questions.view">
                        <QuestionManagement />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin/requests" element={
                      <ProtectedRoute permission="requests.view">
                        <RequestManagement />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
                <Footer />
                <AudioPlayer station={currentStation} onClose={handleClosePlayer} />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
