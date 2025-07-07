
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">VedicNumbers</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 hover:bg-white/10"
              onClick={() => navigate('/pricing')}
            >
              Pricing
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 hover:bg-white/10"
              onClick={() => navigate('/about')}
            >
              About Us
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 hover:bg-white/10"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-lg border-t border-white/10">
            <div className="py-4 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-yellow-400 hover:bg-white/10"
                onClick={() => {
                  navigate('/pricing');
                  setIsMenuOpen(false);
                }}
              >
                Pricing
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-yellow-400 hover:bg-white/10"
                onClick={() => {
                  navigate('/about');
                  setIsMenuOpen(false);
                }}
              >
                About Us
              </Button>
              <Button 
                variant="ghost" 
                className="w-full text-left text-white hover:text-yellow-400 hover:bg-white/10"
                onClick={() => {
                  navigate('/signin');
                  setIsMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                onClick={() => {
                  navigate('/signup');
                  setIsMenuOpen(false);
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
