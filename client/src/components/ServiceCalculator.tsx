import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Info, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useServices } from "@/hooks/use-services";
import { Skeleton } from "@/components/ui/skeleton";

export function ServiceCalculator() {
  const { data: services, isLoading } = useServices();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const toggleService = (id: number) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const totals = useMemo(() => {
    if (!services) return { min: 0, max: 0 };
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((acc, curr) => ({
        min: acc.min + curr.priceMin,
        max: acc.max + curr.priceMax
      }), { min: 0, max: 0 });
  }, [services, selectedServices]);

  if (isLoading) {
    return <div className="space-y-4">
      <Skeleton className="h-8 w-full bg-secondary" />
      <Skeleton className="h-64 w-full bg-secondary" />
    </div>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {services?.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -2 }}
              className={`
                relative p-4 rounded-xl border cursor-pointer transition-all duration-200
                ${selectedServices.includes(service.id) 
                  ? "bg-primary/10 border-primary shadow-lg shadow-primary/10" 
                  : "bg-secondary/50 border-white/5 hover:border-white/20 hover:bg-secondary"}
              `}
              onClick={() => toggleService(service.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`font-heading text-lg font-medium ${selectedServices.includes(service.id) ? "text-primary" : "text-foreground"}`}>
                    {service.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{service.category}</p>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedServices.includes(service.id) 
                    ? "bg-primary border-primary text-white" 
                    : "border-muted-foreground/30 text-transparent"}
                `}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">
                  ${service.priceMin} - ${service.priceMax}
                </span>
                {service.description && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-1 hover:bg-white/10 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary border-border text-foreground max-w-xs">
                      <p>{service.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="bg-secondary border-white/10 sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading uppercase text-xl">
              <Wrench className="w-5 h-5 text-primary" />
              Estimate
            </CardTitle>
            <CardDescription>
              Based on standard labor and parts. Final price may vary by vehicle make/model.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Services Selected:</span>
                  <span className="font-mono text-foreground">{selectedServices.length}</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-lg font-medium">Estimated Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-heading font-bold text-primary text-glow">
                      ${totals.min} - ${totals.max}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-xs text-muted-foreground">
                <p>This is a rough estimate only. Diagnostic fees may apply. Contact us for a precise quote for your vehicle.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
