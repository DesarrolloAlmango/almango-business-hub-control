
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Calendar } from "lucide-react";

interface CountdownTimerProps {
  endDate: string;
  variant?: "card" | "inline" | "compact";
  className?: string;
}

export function CountdownTimer({ endDate, variant = "inline", className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (variant === "card") {
    return (
      <Card className={`${className} border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-900`}>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2 text-orange-800 dark:text-orange-300">
            <Timer className="h-4 w-4" />
            <h4 className="font-medium">Tiempo restante</h4>
          </div>
          {isExpired ? (
            <div className="text-red-600 dark:text-red-400 font-medium">Subasta finalizada</div>
          ) : (
            <div className="grid grid-cols-4 gap-2 w-full">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{timeLeft.days}</div>
                <div className="text-xs text-muted-foreground">días</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{timeLeft.hours}</div>
                <div className="text-xs text-muted-foreground">horas</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{timeLeft.minutes}</div>
                <div className="text-xs text-muted-foreground">min</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold">{timeLeft.seconds}</div>
                <div className="text-xs text-muted-foreground">seg</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <Timer className="h-3 w-3 text-orange-600" />
        {isExpired ? (
          <span className="text-xs text-red-600">Finalizada</span>
        ) : (
          <span className="text-xs">
            {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
            {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        )}
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Timer className="h-4 w-4 text-orange-600" />
      {isExpired ? (
        <span className="text-sm text-red-600 font-medium">Subasta finalizada</span>
      ) : (
        <span className="text-sm">
          {timeLeft.days > 0 ? `${timeLeft.days} días, ` : ""}
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
    </div>
  );
}
