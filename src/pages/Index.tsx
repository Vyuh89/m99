import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Briefcase, 
  Users, 
  MapPin, 
  TrendingUp, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const featuredJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      featured: true
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'Creative Studio',
      location: 'Remote',
      type: 'Remote',
      salary: '$80k - $100k',
      featured: true
    }
  ];

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '2,500+' },
    { icon: Users, label: 'Companies', value: '500+' },
    { icon: MapPin, label: 'Locations', value: '50+' },
    { icon: TrendingUp, label: 'Success Rate', value: '85%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills and career goals. Your next career move starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" className="min-w-[200px]">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  <Users className="w-5 h-5 mr-2" />
                  Complete Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Opportunities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover hand-picked job opportunities from top companies looking for talented professionals like you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                      <p className="text-muted-foreground text-sm">{job.company}</p>
                    </div>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="mr-4">{job.location}</span>
                    <Badge variant="outline" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-success">{job.salary}</span>
                    <Link to={`/jobs/${job.id}`}>
                      <Button size="sm">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button variant="outline" size="lg">
                View All Jobs
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose JobPortal?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the tools and resources you need to find the perfect job and advance your career.
            </p>
          </div>

<div className="grid md:grid-cols-3 gap-8">
  {[
    {
      title: 'Smart Matching',
      description: 'Our AI-powered matching system connects you with jobs that fit your skills and preferences.',
      icon: TrendingUp,
      order: 'order-3 md:order-3', // always last on all devices
    },
    {
      title: 'Top Companies',
      description: 'Access exclusive opportunities from leading companies across various industries.',
      icon: Briefcase,
      order: 'order-1 md:order-1',
    },
    {
      title: 'Career Support',
      description: 'Get personalized guidance and support throughout your job search journey.',
      icon: CheckCircle,
      order: 'order-2 md:order-2',
    }
  ].map((feature, index) => (
    <Card key={index} className={`text-center ${feature.order}`}>
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
          <feature.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  ))}
</div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals who have found their dream jobs through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
