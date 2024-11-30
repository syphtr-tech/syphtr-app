import { AppSidebar } from '@/components/organisms/app-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ArrowDown, ArrowUp, Trophy, Star, Target } from 'lucide-react'
import AnalyticsOverview from '@/components/organisms/analytics-overview'

const profiles = [
  {
    name: 'Alice Johnson',
    role: 'Senior Developer',
    avatar: 'https://picsum.photos/id/64/200/200',
    email: 'alice@example.com',
    performance: 98,
    tasks: 156,
    rating: 4.9,
    trend: 'up',
  },
  {
    name: 'Bob Smith',
    role: 'Product Designer',
    avatar: 'https://picsum.photos/id/177/200/200',
    email: 'bob@example.com',
    performance: 92,
    tasks: 143,
    rating: 4.7,
    trend: 'up',
  },
  {
    name: 'Carol Williams',
    role: 'Project Manager',
    avatar: 'https://picsum.photos/id/128/200/200',
    email: 'carol@example.com',
    performance: 95,
    tasks: 198,
    rating: 4.8,
    trend: 'down',
  },
  {
    name: 'David Brown',
    role: 'UI Designer',
    avatar: 'https://picsum.photos/id/188/200/200',
    email: 'david@example.com',
    performance: 88,
    tasks: 112,
    rating: 4.5,
    trend: 'up',
  },
  {
    name: 'Eva Martinez',
    role: 'Frontend Developer',
    avatar: 'https://picsum.photos/id/145/200/200',
    email: 'eva@example.com',
    performance: 94,
    tasks: 167,
    rating: 4.6,
    trend: 'down',
  },
  {
    name: 'Frank Chen',
    role: 'Backend Developer',
    avatar: 'https://picsum.photos/id/169/200/200',
    email: 'frank@example.com',
    performance: 91,
    tasks: 145,
    rating: 4.7,
    trend: 'up',
  },
]

const analytics = {
  totalPerformance: '94.6%',
  totalTasks: '921',
  averageRating: '4.7',
  activeProjects: '12',
}

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-6">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold">Team Members</h1>
            <p className="text-muted-foreground">Manage your team members and their roles.</p>
          </header>

          <AnalyticsOverview data={analytics} />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.email}
                className="flex flex-col space-y-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>
                      {profile.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium leading-none">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.role}</p>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    <Trophy className="h-3 w-3" />
                    {profile.performance}%
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    <Target className="h-3 w-3" />
                    {profile.tasks} tasks
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                    <Star className="h-3 w-3" />
                    {profile.rating}
                  </div>
                  <div
                    className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      profile.trend === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {profile.trend === 'up' ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    Trend
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
