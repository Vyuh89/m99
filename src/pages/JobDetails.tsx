import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Clock, 
  DollarSign, 
  Users, 
  Globe, 
  CheckCircle,
  Heart,
  Share2,
  Briefcase
} from 'lucide-react';

// This would typically come from an API or props
const MOCK_JOB_DETAILS = {
  '1': {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building user-facing features using React and modern web technologies.',
    fullDescription: `We are looking for an experienced Senior Frontend Developer to join our growing team at TechCorp Solutions. In this role, you will be responsible for building user-facing features using React and modern web technologies.

As a Senior Frontend Developer, you will work closely with our design and product teams to create exceptional user experiences. You will be involved in the entire development lifecycle, from planning to deployment, and will have the opportunity to mentor junior developers and contribute to our technical roadmap.

Key Responsibilities:
• Develop and maintain high-quality frontend applications using React, TypeScript, and modern CSS
• Collaborate with designers to implement pixel-perfect, responsive user interfaces
• Work with backend developers to integrate APIs and ensure seamless data flow
• Optimize applications for maximum speed and scalability
• Participate in code reviews and maintain coding standards
• Mentor junior developers and contribute to team knowledge sharing
• Stay up-to-date with the latest frontend technologies and best practices`,
    requirements: [
      '5+ years of experience with React and JavaScript',
      'Strong proficiency in TypeScript',
      'Experience with modern CSS frameworks (Tailwind CSS preferred)',
      'Knowledge of state management libraries (Redux, Zustand)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Familiarity with build tools (Webpack, Vite)',
      'Understanding of RESTful APIs and GraphQL',
      'Experience with Git and collaborative development workflows',
      'Strong problem-solving and debugging skills',
      'Excellent communication and teamwork abilities'
    ],
    niceToHave: [
      'Experience with Next.js or other React frameworks',
      'Knowledge of backend technologies (Node.js, Python)',
      'Experience with cloud platforms (AWS, Azure, GCP)',
      'Familiarity with Docker and containerization',
      'Understanding of accessibility standards (WCAG)',
      'Experience with performance optimization techniques'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Flexible working hours and remote work options',
      'Professional development budget',
      'Unlimited PTO policy',
      'Modern office with free meals and snacks',
      'Team retreats and company events',
      'Latest MacBook Pro and equipment'
    ],
    companyInfo: {
      name: 'TechCorp Solutions',
      size: '200-500 employees',
      industry: 'Software Development',
      website: 'https://techcorp.com',
      description: 'TechCorp Solutions is a leading software development company that builds innovative solutions for businesses worldwide. We are passionate about creating technology that makes a difference and fostering a culture of innovation and collaboration.'
    },
    postedDate: new Date('2024-01-15'),
    featured: true
  }
};

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const job = id ? MOCK_JOB_DETAILS[id as keyof typeof MOCK_JOB_DETAILS] : null;

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/jobs">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    {job.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{getTimeAgo(job.postedDate)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline" className="text-success border-success">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {job.salary}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {job.fullDescription}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Nice to Have */}
          <Card>
            <CardHeader>
              <CardTitle>Nice to Have</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {job.niceToHave.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-4 h-4 border border-muted-foreground rounded-full mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Section */}
          <Card>
            <CardContent className="p-6">
              <Button className="w-full mb-4" size="lg">
                <Briefcase className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
              <Button variant="outline" className="w-full">
                Save for Later
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Application deadline: No deadline specified
              </p>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About {job.companyInfo.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.companyInfo.description}
              </p>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{job.companyInfo.size}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building2 className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{job.companyInfo.industry}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                  <a 
                    href={job.companyInfo.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Company Website
                  </a>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View All Jobs at {job.company}
              </Button>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'Frontend Developer', company: 'StartupXYZ', location: 'Remote' },
                { title: 'React Developer', company: 'WebCorp', location: 'New York, NY' },
                { title: 'UI Developer', company: 'DesignTech', location: 'Los Angeles, CA' }
              ].map((similarJob, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-sm mb-1">{similarJob.title}</h4>
                  <div className="text-xs text-muted-foreground">
                    <span>{similarJob.company}</span> • <span>{similarJob.location}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-sm">
                View All Similar Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;