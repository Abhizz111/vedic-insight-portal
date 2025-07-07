
import { Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold text-white">VedicNumbers</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Unlock the ancient wisdom of Vedic numerology and discover your cosmic blueprint through personalized reports based on thousands of years of knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/pricing')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms')}
                  className="text-gray-400 hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 VedicNumbers. All rights reserved. | Connecting you with ancient wisdom.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
