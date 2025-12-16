import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "all" ||
        recipe.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto container-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Recipes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of delicious recipes. Use filters to find exactly what you're craving.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-2xl p-6 mb-10 shadow-card">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="input-field pl-12"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Categories */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={cn(
                      "category-badge cursor-pointer",
                      selectedCategory === "all" && "bg-primary text-primary-foreground"
                    )}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryChange(cat.name.toLowerCase())}
                      className={cn(
                        "category-badge cursor-pointer",
                        selectedCategory === cat.name.toLowerCase() &&
                          "bg-primary text-primary-foreground"
                      )}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Difficulty</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["all", "easy", "medium", "hard"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={cn(
                        "category-badge cursor-pointer capitalize",
                        selectedDifficulty === diff && "bg-primary text-primary-foreground"
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filteredRecipes.length}</span> recipes
          </p>

          {/* Recipe Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No recipes found</p>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Recipes;
