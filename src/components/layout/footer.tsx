import { ChefHat } from "lucide-react";

import Link from "next/link";
import { HeartIcon } from "../icons";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto container-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                Savory
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Discover delicious recipes from around the world. From quick weeknight dinners to elaborate weekend feasts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="text-muted-foreground hover:text-primary transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/add-recipe" className="text-muted-foreground hover:text-primary transition-colors">
                  Add Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/recipes?category=breakfast" className="text-muted-foreground hover:text-primary transition-colors">
                  Breakfast
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=lunch" className="text-muted-foreground hover:text-primary transition-colors">
                  Lunch
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=dinner" className="text-muted-foreground hover:text-primary transition-colors">
                  Dinner
                </Link>
              </li>
              <li>
                <Link href="/recipes?category=desserts" className="text-muted-foreground hover:text-primary transition-colors">
                  Desserts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Savory. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <HeartIcon className="w-4 h-4 text-primary fill-primary" /> for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
