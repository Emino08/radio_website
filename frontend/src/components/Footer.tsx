import { Link } from 'react-router-dom';
import { Radio, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">Radio New Song</div>
                <div className="text-xs text-secondary">97.7 FM</div>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Broadcasting the good news and uplifting music to Bo and beyond. 
              Your source for inspiration, information, and entertainment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-secondary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-secondary transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                <span>123 Fenton Road, Bo, Sierra Leone</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-secondary" />
                <a href="tel:+23276123456" className="hover:text-secondary transition-colors">
                  +232 76 123 456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-secondary" />
                <a href="mailto:info@radionewsong.sl" className="hover:text-secondary transition-colors">
                  info@radionewsong.sl
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Stay connected with us on social media
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p className="text-primary-foreground/80">
            © {new Date().getFullYear()} Radio New Song 97.7 FM. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 mt-2">
            Broadcasting with love from Bo, Sierra Leone 🇸🇱
          </p>
        </div>
      </div>
    </footer>
  );
}
