import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Edit, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  Plus,
  X
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  title: string;
  experience: string;
  skills: string[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
  experience_details: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
}

const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate frontend developer with 5+ years of experience building modern web applications. I love creating intuitive user interfaces and working with cutting-edge technologies.',
  avatar: '',
  title: 'Senior Frontend Developer',
  experience: '5+ years',
  skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', 'Git', 'Figma', 'Python'],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      year: '2018'
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      school: 'General Assembly',
      year: '2019'
    }
  ],
  experience_details: [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      duration: '2022 - Present',
      description: 'Lead frontend development for multiple projects using React and TypeScript. Mentored junior developers and established coding standards.'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      duration: '2020 - 2022',
      description: 'Built responsive web applications and collaborated with design team to implement user interfaces. Improved application performance by 40%.'
    },
    {
      title: 'Junior Developer',
      company: 'WebDev Inc',
      duration: '2019 - 2020',
      description: 'Developed and maintained websites using HTML, CSS, and JavaScript. Worked on various client projects and learned modern development practices.'
    }
  ]
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(INITIAL_PROFILE);
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!editForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!editForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!editForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!editForm.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!editForm.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (editForm.bio.length < 50) {
      newErrors.bio = 'Bio should be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfile(editForm);
      setIsEditDialogOpen(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditDialogOpen(false);
    setErrors({});
  };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm({
        ...editForm,
        skills: [...editForm.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and professional details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
                <p className="text-muted-foreground mb-3">{profile.title}</p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{profile.experience} experience</span>
                  </div>
                </div>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4" onClick={() => setEditForm(profile)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className={errors.name ? 'border-destructive' : ''}
                          />
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <Label htmlFor="title">Job Title</Label>
                          <Input
                            id="title"
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className={errors.email ? 'border-destructive' : ''}
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className={errors.phone ? 'border-destructive' : ''}
                          />
                          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location *</Label>
                          <Input
                            id="location"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className={errors.location ? 'border-destructive' : ''}
                          />
                          {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                        </div>
                        <div>
                          <Label htmlFor="experience">Experience</Label>
                          <Input
                            id="experience"
                            value={editForm.experience}
                            onChange={(e) => setEditForm({ ...editForm, experience: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio *</Label>
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          rows={4}
                          className={errors.bio ? 'border-destructive' : ''}
                        />
                        {errors.bio && <p className="text-xs text-destructive mt-1">{errors.bio}</p>}
                        <p className="text-xs text-muted-foreground mt-1">{editForm.bio.length} characters</p>
                      </div>

                      <div>
                        <Label>Skills</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            placeholder="Add a skill"
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button type="button" onClick={addSkill}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {editForm.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="flex-1">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.experience_details.map((exp, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1"></div>
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.duration}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-muted pl-4 relative">
                    <div className="absolute w-3 h-3 bg-accent rounded-full -left-2 top-1"></div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-accent font-medium">{edu.school}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Graduated {edu.year}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;