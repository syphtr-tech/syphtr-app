'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Bell,
  User,
  Mail,
  Globe,
  Moon,
  Sun,
  Shield,
  Languages,
  Clock,
  Settings,
  Lock
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    language: 'English',
    timezone: 'UTC-5 (Eastern Time)',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      updates: false,
      marketing: false,
    },
  })

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }))
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </header>

      {/* Profile Settings */}
      <div className="space-y-6">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <User className="h-5 w-5" />
            Profile Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your personal information and contact details
          </p>
          <Separator className="my-4" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Bell className="h-5 w-5" />
            Notification Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose what notifications you want to receive
          </p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about your account
                </p>
              </div>
              <Button
                variant={settings.notifications.email ? 'default' : 'outline'}
                onClick={() => handleNotificationToggle('email')}
              >
                <Mail className="mr-2 h-4 w-4" />
                {settings.notifications.email ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Button
                variant={settings.notifications.push ? 'default' : 'outline'}
                onClick={() => handleNotificationToggle('push')}
              >
                <Bell className="mr-2 h-4 w-4" />
                {settings.notifications.push ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Globe className="h-5 w-5" />
            Preferences
          </h2>
          <p className="text-sm text-muted-foreground">Customize your application experience</p>
          <Separator className="my-4" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Language</label>
              <div className="mt-1 flex items-center gap-2 rounded-md border p-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <select
                  className="flex-1 bg-transparent outline-none"
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Timezone</label>
              <div className="mt-1 flex items-center gap-2 rounded-md border p-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <select
                  className="flex-1 bg-transparent outline-none"
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                >
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (Central European Time)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Sun className="h-5 w-5" />
            Appearance
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize the look and feel of the application
          </p>
          <Separator className="my-4" />
          <div className="flex gap-4">
            <Button
              variant={settings.theme === 'light' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setSettings({ ...settings, theme: 'light' })}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={settings.theme === 'dark' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </div>
        </div>

        {/* Admin Access Section */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <Lock className="h-5 w-5" />
            Admin Access
          </h2>
          <p className="text-sm text-muted-foreground">
            Access the admin dashboard for advanced configuration
          </p>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Admin Dashboard</p>
              <p className="text-sm text-muted-foreground">
                Manage content, users, and system settings
              </p>
            </div>
            <Button asChild>
              <Link href="/admin">
                <Settings className="mr-2 h-4 w-4" />
                Open Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
