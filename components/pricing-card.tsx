import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg animate-slide-in",
        popular
          ? "border-primary shadow-lg relative scale-105 bg-gradient-to-b from-card to-primary/5"
          : "hover:border-primary/50",
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="bg-gradient-primary text-primary-foreground text-xs font-medium py-1 px-4 rounded-full shadow-md">
            Plus Populaire
          </div>
        </div>
      )}
      <CardHeader className={cn("pb-8", popular && "pt-8")}>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-1.5">{description}</CardDescription>
        <div className="mt-6">
          <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {price}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-card-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-6">
        <Button
          className={cn(
            "w-full transition-all",
            popular ? "bg-gradient-primary hover:shadow-md hover:shadow-primary/20" : "",
          )}
          variant={popular ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

