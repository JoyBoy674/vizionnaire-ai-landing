"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatbotButtonProps {
  variant?: "default" | "secondary" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export default function ChatbotButton({ variant = "default", size = "default", className }: ChatbotButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "gap-2 relative overflow-hidden group animate-fade-in",
        variant === "default" &&
          "bg-gradient-primary hover:opacity-90 text-primary-foreground transition-all duration-300",
        className,
      )}
      onClick={() => {
        // Ceci serait remplacé par votre intégration de chatbot
        alert("Le chatbot s'ouvrirait ici !")
      }}
    >
      <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
      <span className="relative z-10">Démarrer votre plan</span>
    </Button>
  )
}

