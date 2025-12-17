import { NextPageWithLayout } from "@/pages/_app";
import { Recipe } from "@/types/recipes";
import Link from "next/link";
import RecipeCard from "../recipe/recipeCard";
import { ArrowRightIcon } from "../icons";

type Props = {
  featuredRecipes?: Recipe[] | null
}

const FeaturedRecipes: NextPageWithLayout<Props> = ( { featuredRecipes } ) => {

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="section-title mb-4">Featured Recipes</h2>
            <p className="text-muted-foreground max-w-xl">
              Hand-picked recipes loved by our community. Try something new today!
            </p>
          </div>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-primary font-medium mt-4 md:mt-0 hover:gap-3 transition-all"
          >
            View all recipes
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredRecipes?.map((recipe, index) => (
            <div
              key={recipe.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RecipeCard recipe={recipe} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
