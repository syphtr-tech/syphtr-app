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
