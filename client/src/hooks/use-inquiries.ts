import { useMutation } from "@tanstack/react-query";
import { api, type ContactInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitInquiry() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Add artificial delay for UI feel
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }
      
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Received",
        description: "We'll be in touch shortly to confirm your appointment details.",
        variant: "default",
        className: "bg-primary text-white border-primary",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
