import { Recipe } from "@/types/recipes";
import Link from "next/link";
import { ClockIcon, UsersIcon } from "../icons";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
  featured?: boolean;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-accent/20 text-accent",
  Medium: "bg-primary/20 text-primary",
  Hard: "bg-burgundy/20 text-burgundy",
};

const RecipeCard = ({
  recipe,
  className = "",
  featured = false,
}: RecipeCardProps) => {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className={`recipe-card block group ${className}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.imageUrl}
          className={`recipe-card-image ${
            featured ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        />

        {/* Category */}
        <div className="absolute top-4 left-4">
          <span className="category-badge">{recipe.categoryName}</span>
        </div>

        {/* Difficulty */}
        <div className="absolute top-4 right-4">
          <span
            className={`category-badge ${
              difficultyColors[recipe.difficulty] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className={`font-display font-semibold text-foreground mb-2 transition-colors group-hover:text-primary ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {recipe.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4" />
            <span>{recipe.timeRequired}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <UsersIcon className="w-4 h-4" />
            <span>{recipe.serveSize} servings</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
