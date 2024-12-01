'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Folder,
  Plus,
  MoreHorizontal,
  Search,
  Users,
  Star,
  Clock,
  MapPin,
  Briefcase,
  ChevronDown,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ShortlistedCandidate = {
  id: number
  name: string
  avatar: string
  role: string
  location: string
  experience: string
  matchScore: number
  addedDate: string
  status: string
}

type ShortlistGroup = {
  id: number
  name: string
  description: string
  candidates: ShortlistedCandidate[]
  createdAt: string
}

// Mock data for shortlist groups
const shortlistGroups: ShortlistGroup[] = [
  {
    id: 1,
    name: 'Frontend Team Q2',
    description: 'Candidates for frontend development positions',
    createdAt: '2024-03-15',
    candidates: [
      {
        id: 1,
        name: 'Sarah Wilson',
        avatar: 'https://picsum.photos/id/201/200/200',
        role: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        experience: '8 years',
        matchScore: 95,
        addedDate: '2024-03-10',
        status: 'Interviewing',
      },
      {
        id: 2,
        name: 'Michael Chen',
        avatar: 'https://picsum.photos/id/202/200/200',
        role: 'Frontend Engineer',
        location: 'New York, NY',
        experience: '6 years',
        matchScore: 88,
        addedDate: '2024-03-12',
        status: 'To Contact',
      },
    ],
  },
  {
    id: 2,
    name: 'Design Team',
    description: 'UX/UI designer candidates',
    createdAt: '2024-03-14',
    candidates: [
      {
        id: 3,
        name: 'Emma Rodriguez',
        avatar: 'https://picsum.photos/id/203/200/200',
        role: 'UX Designer',
        location: 'Austin, TX',
        experience: '5 years',
        matchScore: 92,
        addedDate: '2024-03-13',
        status: 'Scheduled',
      },
    ],
  },
  {
    id: 3,
    name: 'Backend Engineers',
    description: 'Backend development candidates',
    createdAt: '2024-03-13',
    candidates: [
      {
        id: 4,
        name: 'James Thompson',
        avatar: 'https://picsum.photos/id/204/200/200',
        role: 'Backend Developer',
        location: 'Seattle, WA',
        experience: '7 years',
        matchScore: 85,
        addedDate: '2024-03-11',
        status: 'To Contact',
      },
    ],
  },
]

export default function ShortlistPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<number[]>([1]) // First group expanded by default

  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId],
    )
  }

  return (
    <main className="p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Shortlisted Candidates</h1>
            <p className="text-muted-foreground">Manage your candidate shortlists and groups</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Group
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search shortlisted candidates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Shortlist Groups */}
      <div className="space-y-4">
        {shortlistGroups.map((group) => (
          <div key={group.id} className="rounded-lg border">
            {/* Group Header */}
            <div
              className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                  <Folder className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
                  {group.candidates.length} candidates
                </Badge>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedGroups.includes(group.id) ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {/* Candidates List */}
            {expandedGroups.includes(group.id) && (
              <div className="border-t">
                {group.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="flex items-center justify-between border-b p-4 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback>
                          {candidate.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {candidate.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {candidate.matchScore}% Match
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Added {new Date(candidate.addedDate).toLocaleDateString()}
                        </div>
                      </div>

                      <Badge
                        variant={
                          candidate.status === 'Interviewing'
                            ? 'default'
                            : candidate.status === 'Scheduled'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {candidate.status}
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                          <DropdownMenuItem>Move to Group</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove from Shortlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
