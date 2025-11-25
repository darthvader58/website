interface SkillCardProps {
  title: string
  skills: string[]
  icon?: React.ReactNode
}

export default function SkillCard({ title, skills, icon }: SkillCardProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-2xl">{icon}</div>}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-300">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}