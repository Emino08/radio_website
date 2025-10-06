import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Radio, Menu, X, Phone, Mail, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'News', path: '/news' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isAdminPath = location.pathname.startsWith('/admin');

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 animate-pulse" />
                <span className="font-semibold">97.7 FM</span>
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Bo, Sierra Leone</span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span className="hidden sm:inline">{user?.name}</span>
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 hover:text-secondary transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <a href="tel:+23276123456" className="flex items-center gap-1 hover:text-secondary transition-colors">
                    <Phone className="w-3 h-3" />
                    <span className="hidden sm:inline">+232 76 123 456</span>
                  </a>
                  <a href="mailto:info@radionewsong.sl" className="flex items-center gap-1 hover:text-secondary transition-colors">
                    <Mail className="w-3 h-3" />
                    <span className="hidden sm:inline">info@radionewsong.sl</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
              <Radio className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-primary">Radio New Song</div>
              <div className="text-xs text-secondary font-semibold">97.7 FM • Bo</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  className={isActive(item.path) ? 'bg-primary' : ''}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button className="ml-4 bg-secondary hover:bg-secondary/90">
              Listen Live
            </Button>
            {isAuthenticated && (
              <Link to="/admin">
                <Button 
                  variant={isAdminPath ? 'default' : 'ghost'}
                  className={`ml-2 ${isAdminPath ? 'bg-primary' : ''}`}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className={`w-full justify-start ${isActive(item.path) ? 'bg-primary' : ''}`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              <Button className="w-full bg-secondary hover:bg-secondary/90 mt-2">
                Listen Live
              </Button>
              {isAuthenticated && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button 
                    variant={isAdminPath ? 'default' : 'ghost'}
                    className={`w-full justify-start ${isAdminPath ? 'bg-primary' : ''}`}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
