'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, MapPin, Briefcase, Mail, Star, Clock, CheckCircle2, Trophy, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Mock candidate data with enhanced information
const candidates = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://picsum.photos/id/201/200/200',
    role: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    experience: '8 years',
    email: 'sarah.wilson@example.com',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    status: 'available',
    matchScore: 95,
    lastActive: '2 hours ago',
    salary: '$120k - $150k',
    certifications: ['AWS Certified', 'Google Cloud'],
    availability: 'Immediate',
    preferredWork: 'Remote'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://picsum.photos/id/202/200/200',
    role: 'Full Stack Engineer',
    location: 'New York, NY',
    experience: '6 years',
    email: 'michael.chen@example.com',
    skills: ['Python', 'Django', 'React', 'AWS'],
    status: 'interviewing',
    matchScore: 88,
    lastActive: '1 day ago',
    salary: '$100k - $130k',
    certifications: ['MongoDB Certified'],
    availability: '2 weeks',
    preferredWork: 'Hybrid'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    avatar: 'https://picsum.photos/id/203/200/200',
    role: 'UX Designer',
    location: 'Austin, TX',
    experience: '5 years',
    email: 'emma.r@example.com',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    status: 'available',
    matchScore: 92,
    lastActive: '3 hours ago',
    salary: '$90k - $120k',
    certifications: ['Google UX Design'],
    availability: 'Immediate',
    preferredWork: 'Remote'
  },
  {
    id: 4,
    name: 'James Thompson',
    avatar: 'https://picsum.photos/id/204/200/200',
    role: 'Backend Developer',
    location: 'Seattle, WA',
    experience: '7 years',
    email: 'james.t@example.com',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    status: 'placed',
    matchScore: 85,
    lastActive: '1 week ago',
    salary: '$110k - $140k',
    certifications: ['Java Certified Professional'],
    availability: '1 month',
    preferredWork: 'On-site'
  },
  {
    id: 5,
    name: 'Lisa Park',
    avatar: 'https://picsum.photos/id/205/200/200',
    role: 'Product Designer',
    location: 'Chicago, IL',
    experience: '4 years',
    email: 'lisa.park@example.com',
    skills: ['UI Design', 'Design Systems', 'Wireframing', 'Sketch'],
    status: 'available',
    matchScore: 90,
    lastActive: '5 hours ago',
    salary: '$85k - $110k',
    certifications: ['Product Design Certification'],
    availability: '2 weeks',
    preferredWork: 'Hybrid'
  },
  {
    id: 6,
    name: 'Alex Kumar',
    avatar: 'https://picsum.photos/id/206/200/200',
    role: 'DevOps Engineer',
    location: 'Boston, MA',
    experience: '5 years',
    email: 'alex.k@example.com',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    status: 'interviewing',
    matchScore: 94,
    lastActive: '1 day ago',
    salary: '$115k - $145k',
    certifications: ['AWS DevOps Professional', 'Kubernetes Admin'],
    availability: 'Immediate',
    preferredWork: 'Remote'
  },
  {
    id: 7,
    name: 'Rachel Green',
    avatar: 'https://picsum.photos/id/207/200/200',
    role: 'Data Scientist',
    location: 'Portland, OR',
    experience: '3 years',
    email: 'rachel.g@example.com',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
    status: 'available',
    matchScore: 87,
    lastActive: '6 hours ago',
    salary: '$95k - $125k',
    certifications: ['TensorFlow Developer'],
    availability: '2 weeks',
    preferredWork: 'Hybrid'
  },
  {
    id: 8,
    name: 'David Kim',
    avatar: 'https://picsum.photos/id/208/200/200',
    role: 'Mobile Developer',
    location: 'Los Angeles, CA',
    experience: '6 years',
    email: 'david.k@example.com',
    skills: ['React Native', 'iOS', 'Android', 'Flutter'],
    status: 'interviewing',
    matchScore: 91,
    lastActive: '4 hours ago',
    salary: '$105k - $135k',
    certifications: ['Apple Developer', 'Google Android'],
    availability: '1 week',
    preferredWork: 'Remote'
  },
  {
    id: 9,
    name: 'Sofia Martinez',
    avatar: 'https://picsum.photos/id/209/200/200',
    role: 'Security Engineer',
    location: 'Miami, FL',
    experience: '7 years',
    email: 'sofia.m@example.com',
    skills: ['Penetration Testing', 'Security Auditing', 'CISSP', 'Cloud Security'],
    status: 'available',
    matchScore: 93,
    lastActive: '1 day ago',
    salary: '$125k - $160k',
    certifications: ['CISSP', 'CEH'],
    availability: 'Immediate',
    preferredWork: 'Hybrid'
  },
  {
    id: 10,
    name: 'Tom Wilson',
    avatar: 'https://picsum.photos/id/210/200/200',
    role: 'Technical Architect',
    location: 'Denver, CO',
    experience: '10 years',
    email: 't.wilson@example.com',
    skills: ['System Design', 'Cloud Architecture', 'Leadership', 'Microservices'],
    status: 'available',
    matchScore: 96,
    lastActive: '3 hours ago',
    salary: '$140k - $180k',
    certifications: ['AWS Solutions Architect', 'Azure Architect'],
    availability: '1 month',
    preferredWork: 'Remote'
  }
]

type SortOption = 'matchScore' | 'experience' | 'availability'
type FilterOption = 'status' | 'preferredWork' | 'experience'

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('matchScore')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filters, setFilters] = useState({
    status: 'all',
    preferredWork: 'all',
    experienceLevel: 'all'
  })

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortOrder('desc')
    }
  }

  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus = filters.status === 'all' || candidate.status === filters.status
      const matchesWork = filters.preferredWork === 'all' || candidate.preferredWork === filters.preferredWork
      const matchesExperience = filters.experienceLevel === 'all' || 
        (filters.experienceLevel === 'junior' && parseInt(candidate.experience) <= 3) ||
        (filters.experienceLevel === 'mid' && parseInt(candidate.experience) > 3 && parseInt(candidate.experience) <= 6) ||
        (filters.experienceLevel === 'senior' && parseInt(candidate.experience) > 6)

      return matchesSearch && matchesStatus && matchesWork && matchesExperience
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'matchScore':
          comparison = b.matchScore - a.matchScore
          break
        case 'experience':
          comparison = parseInt(b.experience) - parseInt(a.experience)
          break
        case 'availability':
          comparison = a.availability.localeCompare(b.availability)
          break
      }

      return sortOrder === 'asc' ? -comparison : comparison
    })

  return (
    <main className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Candidate Search</h1>
        <p className="text-muted-foreground">Search and filter through available candidates.</p>
      </header>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or skills..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort By
                <SlidersHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('matchScore')}>
                Match Score {sortBy === 'matchScore' && (sortOrder === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('experience')}>
                Experience {sortBy === 'experience' && (sortOrder === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('availability')}>
                Availability {sortBy === 'availability' && (sortOrder === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filters
                <SlidersHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="px-2 text-xs">Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, status: 'all' }))}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, status: 'available' }))}>
                Available
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, status: 'interviewing' }))}>
                Interviewing
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="px-2 text-xs">Work Type</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, preferredWork: 'all' }))}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, preferredWork: 'Remote' }))}>
                Remote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, preferredWork: 'Hybrid' }))}>
                Hybrid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, preferredWork: 'On-site' }))}>
                On-site
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="px-2 text-xs">Experience Level</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, experienceLevel: 'all' }))}>
                All Levels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, experienceLevel: 'junior' }))}>
                Junior (0-3 years)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, experienceLevel: 'mid' }))}>
                Mid-Level (4-6 years)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters(f => ({ ...f, experienceLevel: 'senior' }))}>
                Senior (7+ years)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap gap-2">
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setFilters(f => ({ ...f, status: 'all' }))}
              />
            </Badge>
          )}
          {filters.preferredWork !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Work Type: {filters.preferredWork}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setFilters(f => ({ ...f, preferredWork: 'all' }))}
              />
            </Badge>
          )}
          {filters.experienceLevel !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Experience: {filters.experienceLevel}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setFilters(f => ({ ...f, experienceLevel: 'all' }))}
              />
            </Badge>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Found {filteredCandidates.length} candidates
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="flex flex-col rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
          >
            {/* Header with Avatar and Match Score */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <Trophy className="h-3 w-3" />
                {candidate.matchScore}% Match
              </div>
            </div>

            {/* Location and Experience */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {candidate.experience}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Skills</p>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info Badges */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Available in {candidate.availability}</span>
                </div>
                <span className="text-sm text-muted-foreground">{candidate.preferredWork}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span>{candidate.salary}</span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${
                      candidate.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : candidate.status === 'interviewing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Certifications */}
            {candidate.certifications.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
