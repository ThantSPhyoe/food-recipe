import { useState } from "react";
// import { Mail, ArrowRight } from "lucide-react";
// import { toast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
    //   toast({
    //     title: "Thanks for subscribing!",
    //     description: "You'll receive our weekly recipe digest soon.",
    //   });
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 mb-6">
              {/* <Mail className="w-8 h-8 text-primary-foreground" /> */}
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Get Weekly Recipe Inspiration
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Join 50,000+ food lovers and receive our best recipes, cooking tips, and exclusive content every week.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary-foreground/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-xl bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                Subscribe
                {/* <ArrowRight className="w-5 h-5" /> */}
              </button>
            </form>

            <p className="text-primary-foreground/60 text-sm mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
