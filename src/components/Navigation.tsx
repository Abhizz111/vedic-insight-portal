
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <Sparkles className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">VedicNumbers</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation('/pricing')}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigation('/contact')}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Contact
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Dashboard
                </button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => handleNavigation('/signin')}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleNavigation('/signup')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavigation('/pricing')}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                Contact
              </button>
              
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="text-white hover:text-yellow-400 transition-colors text-left"
                  >
                    Dashboard
                  </button>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-fit"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button
                    onClick={() => handleNavigation('/signin')}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-fit"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleNavigation('/signup')}
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white w-fit"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
