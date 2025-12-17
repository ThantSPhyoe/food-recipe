import Link from "next/link";
import { NextPageWithLayout } from "@/pages/_app";
import { ArrowRightIcon, SparklesIcon } from "../icons";

type Props = {
  count?: number
}
const HeroSection : NextPageWithLayout<Props> = ( { count }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1920&q=80"
          alt="Fresh cooking ingredients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto container-padding w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-up">
            <SparklesIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Discover new flavors</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
            Cooking Made
            <span className="text-primary block">Deliciously Simple</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-up delay-200">
            Explore hundreds of recipes from around the world. From quick weeknight dinners to impressive weekend feasts, find your next favorite dish.
          </p>
          
          <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
            <Link href="/recipes" className="btn-primary inline-flex items-center gap-2">
              Explore Recipes
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link href="/add-recipe" className="btn-secondary inline-flex items-center gap-2">
              Share Your Recipe
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-border/50 animate-fade-up delay-400">
            <div>
              <p className="font-display text-3xl font-bold text-foreground"> {count} </p>
              <p className="text-sm text-muted-foreground">Recipes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
