import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";
import { useSubmitInquiry } from "@/hooks/use-inquiries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send } from "lucide-react";

// Extend the schema for frontend-specific validation if needed
const formSchema = insertInquirySchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { mutate, isPending } = useSubmitInquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleDetails: "",
      serviceType: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="bg-secondary/50 border-white/10 focus:border-primary/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} className="bg-secondary/50 border-white/10 focus:border-primary/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} className="bg-secondary/50 border-white/10 focus:border-primary/50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="vehicleDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Vehicle (Year/Make/Model)</FormLabel>
                <FormControl>
                  <Input placeholder="2018 Toyota Camry" {...field} className="bg-secondary/50 border-white/10 focus:border-primary/50" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Service Needed</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-secondary/50 border-white/10 focus:border-primary/50">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-secondary border-white/10 text-foreground">
                    <SelectItem value="Maintenance">General Maintenance</SelectItem>
                    <SelectItem value="Repair">Engine/Transmission Repair</SelectItem>
                    <SelectItem value="Diagnostics">Diagnostics/Check Engine</SelectItem>
                    <SelectItem value="Brakes">Brakes & Suspension</SelectItem>
                    <SelectItem value="Other">Other Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground/80">Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us more about the issue..." 
                  className="min-h-[120px] bg-secondary/50 border-white/10 focus:border-primary/50" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-primary hover:bg-primary/90 text-white font-heading uppercase py-6 text-lg tracking-wide rounded-sm"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Request...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Request Appointment
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
