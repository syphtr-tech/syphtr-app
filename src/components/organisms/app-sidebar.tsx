'use client'

import * as React from 'react'
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react'

import { NavMain } from '@/components/organisms/nav-main'
import { NavProjects } from '@/components/organisms/nav-projects'
import { NavUser } from '@/components/organisms/nav-user'
import { TeamSwitcher } from '@/components/organisms/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'Syphtr',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Recruitment Hub',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Job Seekers Inc.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Talent Pool Co.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Overview',
          url: '#',
        },
        {
          title: 'Activity',
          url: '#',
        },
        {
          title: 'Reports',
          url: '#',
        },
      ],
    },
    {
      title: 'Candidates',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Search Candidates',
          url: '#',
        },
        {
          title: 'Shortlisted',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Jobs',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Active Jobs',
          url: '#',
        },
        {
          title: 'Closed Jobs',
          url: '#',
        },
        {
          title: 'Job Templates',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Profile Settings',
          url: '#',
        },
        {
          title: 'Team Management',
          url: '#',
        },
        {
          title: 'Subscription',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Candidate Tracking',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Job Assignments',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Reports & Analytics',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
