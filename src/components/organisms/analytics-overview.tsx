import { Trophy, Star, Target } from 'lucide-react'

type AnalyticsData = {
  totalPerformance: string
  totalTasks: string
  averageRating: string
  activeProjects: string
}

type AnalyticCardProps = {
  icon: React.ReactNode
  label: string
  value: string
  iconColor?: string
}

const AnalyticCard = ({ icon, label, value, iconColor }: AnalyticCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <div className={iconColor}>{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
    </div>
  )
}

export default function AnalyticsOverview({ data }: { data: AnalyticsData }) {
  const cards = [
    {
      icon: <Trophy className="h-4 w-4" />,
      label: 'Team Performance',
      value: data.totalPerformance,
      iconColor: 'text-yellow-500'
    },
    {
      icon: <Target className="h-4 w-4" />,
      label: 'Total Tasks',
      value: data.totalTasks,
      iconColor: 'text-blue-500'
    },
    {
      icon: <Star className="h-4 w-4" />,
      label: 'Average Rating',
      value: data.averageRating,
      iconColor: 'text-yellow-500'
    },
    {
      icon: <Target className="h-4 w-4" />,
      label: 'Active Projects',
      value: data.activeProjects,
      iconColor: 'text-green-500'
    }
  ]

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <AnalyticCard
          key={card.label}
          icon={card.icon}
          label={card.label}
          value={card.value}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  )
} 