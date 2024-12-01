'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  LayoutGrid, 
  List, 
  Plus, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Clock,
  Users
} from 'lucide-react'

type Job = {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: 'Full-time' | 'Part-time' | 'Contract'
  level: 'Entry' | 'Mid' | 'Senior'
  posted: string
  applicants: number
  description: string
  requirements: string[]
  status: 'Active' | 'Closed' | 'Draft'
}

export default function JobsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [newJob, setNewJob] = useState<Partial<Job>>({
    type: 'Full-time',
    level: 'Mid',
    status: 'Active'
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs')
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs))
    }
  }, [])

  // Save jobs to localStorage when updated
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs))
  }, [jobs])

  const handleCreateJob = () => {
    const job: Job = {
      id: Date.now().toString(),
      title: newJob.title || '',
      company: newJob.company || '',
      location: newJob.location || '',
      salary: newJob.salary || '',
      type: newJob.type || 'Full-time',
      level: newJob.level || 'Mid',
      posted: new Date().toISOString(),
      applicants: 0,
      description: newJob.description || '',
      requirements: newJob.requirements?.length ? newJob.requirements : [''],
      status: newJob.status || 'Active'
    }

    setJobs([job, ...jobs])
    setNewJob({})
    setIsDialogOpen(false)
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="p-6">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Jobs Board</h1>
            <p className="text-muted-foreground">Manage and track your job postings</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new job posting
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={newJob.title || ''}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      placeholder="e.g., Senior Frontend Developer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={newJob.company || ''}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                      placeholder="Company name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={newJob.location || ''}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      placeholder="e.g., New York, NY"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Salary Range</label>
                    <Input
                      value={newJob.salary || ''}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      placeholder="e.g., $100k - $130k"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="mt-1 w-full rounded-md border p-2"
                    rows={4}
                    value={newJob.description || ''}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Job description..."
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateJob}>Create Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Search and View Toggle */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setView('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Jobs Display */}
      {view === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{job.title}</h3>
                  <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {job.type}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">{job.level}</Badge>
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
                  {job.applicants} applicants
                </Badge>
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {new Date(job.posted).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </div>
                <div className="mt-2 flex gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {job.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="outline">{job.level}</Badge>
                <Badge variant="secondary">
                  <Users className="mr-1 h-3 w-3" />
                  {job.applicants} applicants
                </Badge>
                <Badge variant="secondary">
                  <Clock className="mr-1 h-3 w-3" />
                  {new Date(job.posted).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
