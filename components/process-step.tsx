import type { ReactNode } from "react"

interface ProcessStepProps {
  number: number
  title: string
  description: string
  icon: ReactNode
}

export default function ProcessStep({ number, title, description, icon }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center text-center group animate-slide-in">
      <div className="relative mb-8">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary shadow-sm group-hover:shadow-md group-hover:shadow-primary/5 transition-all duration-300">
          {icon}
        </div>
        <div className="absolute -top-3 -right-3 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-md">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

