import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Building2, Clock, DollarSign, Filter } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  featured: boolean;
  matchPercentage: number;
  matchRating: 'GREAT' | 'GOOD' | 'AVERAGE' | 'POOR';
  experience: string;
  applicants: number;
  logo: string;
}

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'UX Designer',
    company: 'Meta',
    location: 'Bengaluru',
    type: 'Full-time',
    salary: 'Not Disclosed',
    description: 'We are looking for an experienced UX Designer to join our growing team. You will be responsible for creating user-centric designs.',
    requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    postedDate: new Date('2024-01-15'),
    featured: true,
    matchPercentage: 92,
    matchRating: 'GREAT',
    experience: '4+ yrs exp',
    applicants: 240,
    logo: 'M'
  },
  {
    id: '2',
    title: 'Risk Analytics Consultant',
    company: 'Wells Fargo',
    location: 'Bengaluru',
    type: 'Full-time',
    salary: 'Not Disclosed',
    description: 'Join our risk analytics team to drive data-driven decisions and build strong relationships with Enterprise partners.',
    requirements: ['Analytics', 'Risk Management', 'SQL', 'Python'],
    postedDate: new Date('2024-01-14'),
    featured: false,
    matchPercentage: 78,
    matchRating: 'GREAT',
    experience: '4+ yrs exp',
    applicants: 100,
    logo: 'WF'
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Meta',
    location: 'Bengaluru',
    type: 'Full-time',
    salary: 'Not Disclosed',
    description: 'We are seeking a talented UX Designer to create intuitive and beautiful user interfaces for our products.',
    requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    postedDate: new Date('2024-01-13'),
    featured: true,
    matchPercentage: 85,
    matchRating: 'GREAT',
    experience: '2+ yrs exp',
    applicants: 180,
    logo: 'M'
  },
  {
    id: '4',
    title: 'Risk Analytics Consultant',
    company: 'Wells Fargo',
    location: 'Bengaluru',
    type: 'Full-time',
    salary: 'Not Disclosed',
    description: 'Build scalable risk analytics solutions and work with cross-functional teams to deliver exceptional results.',
    requirements: ['Analytics', 'Risk Management', 'SQL', 'Python'],
    postedDate: new Date('2024-01-12'),
    featured: false,
    matchPercentage: 72,
    matchRating: 'AVERAGE',
    experience: '3+ yrs exp',
    applicants: 150,
    logo: 'WF'
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = typeFilter === 'all' || job.type === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return b.postedDate.getTime() - a.postedDate.getTime();
      } else if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.postedDate.getTime() - a.postedDate.getTime();
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, locationFilter, typeFilter, sortBy]);

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
    <div className="lg:ml-64 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
          <p className="text-muted-foreground">Discover opportunities that match your skills and interests</p>
        </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Job Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="featured">Featured First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredAndSortedJobs.length} job{filteredAndSortedJobs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Job Listings */}
      <div className="grid gap-4">
        {filteredAndSortedJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {/* Left side - Company logo and job info */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center text-white font-bold text-lg">
                    {job.logo}
                  </div>
                  
                  {/* Job Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Match percentage and actions */}
                <div className="flex items-center space-x-4">
                  {/* Match Score */}
                  <div className="text-center">
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      job.matchRating === 'GREAT' ? 'bg-emerald-500' : 
                      job.matchRating === 'GOOD' ? 'bg-blue-500' :
                      job.matchRating === 'AVERAGE' ? 'bg-orange-500' : 'bg-red-500'
                    }`}>
                      {job.matchPercentage}%
                    </div>
                    <p className={`text-xs font-medium mt-1 ${
                      job.matchRating === 'GREAT' ? 'text-emerald-600' : 
                      job.matchRating === 'GOOD' ? 'text-blue-600' :
                      job.matchRating === 'AVERAGE' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {job.matchRating}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    <Link to={`/jobs/${job.id}`}>
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                        Ask Buddy
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAndSortedJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;