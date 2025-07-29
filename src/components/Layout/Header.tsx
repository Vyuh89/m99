import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  HelpCircle,
  User
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const sidebarItems = [
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: FileText, label: 'Resume', path: '/resume' },
    { icon: TrendingUp, label: 'Career Advisor', path: '/career' },
    { icon: DollarSign, label: 'Salary Predictor', path: '/salary' },
    { icon: HelpCircle, label: 'Interview Questions', path: '/interview' },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <span className="font-bold text-xl text-foreground">Joblo.ai</span>
            </Link>

            {/* Top Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/profile" className="text-sm font-medium text-foreground hover:text-emerald-600 transition-colors border-b-2 border-emerald-500 pb-1">
                Profile
              </Link>
              <span className="text-sm text-muted-foreground">Preferences</span>
              <span className="text-sm text-muted-foreground">Settings</span>
            </nav>

            {/* Right side - User Profile */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="text-muted-foreground hover:text-foreground"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Aman Gupta</p>
                  <p className="text-xs text-muted-foreground">Senior Consultant</p>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-40 hidden lg:block">
        <div className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-500' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
                {item.label === 'Salary Predictor' && (
                  <span className="ml-auto bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    BETA
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* LinkedIn Profile Section */}
        <div className="p-4 border-t border-border mt-4">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm font-medium mb-2">LinkedIn Profile</p>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Aman Gupta</p>
                <p className="text-xs text-muted-foreground">6 open • 6 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border py-4 bg-card">
          <div className="flex flex-col space-y-4 px-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;