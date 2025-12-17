import { ChefHatIcon, MinusIcon, PlusIcon, UploadIcon } from "@/components/icons";
import Layout from "@/components/layout/layout";
import { Toast } from "@/components/ui/toast";
import { Category } from "@/types/category";
import { api } from "@/utils/providers/api/api";
import { API_URL } from "@/utils/providers/constants/api";
import { useEffect, useState } from "react";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState<Category[]>();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleRemoveInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((_, i) => i !== index));
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Toast({
      title: "Recipe submitted!",
      description: "Your recipe has been added successfully.",
    });
  };

  const fetchCategories = async () => {
     try{
        var response = await api.getWithoutAuth({endPoint: API_URL.CATEGORY});
        var result = await response.json();
        setCategories(result.data);
     }catch(err){
        throw err;
     }
  }
  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto container-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <ChefHatIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Share Your Recipe
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Got a delicious recipe? Share it with our community of food lovers!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Recipe Photo
              </label>
              <div
                className={`
                  "relative border-2 border-dashed border-border rounded-2xl overflow-hidden transition-colors hover:border-primary/50",
                  ${imagePreview ? "aspect-video" : "aspect-[16/9]"}`
                }
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <UploadIcon className="w-10 h-10 mb-3" />
                    <p className="font-medium">Click or drag to upload</p>
                    <p className="text-sm">JPG, PNG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Recipe Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Homemade Pasta Carbonara"
                  className="input-field"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your recipe in a few sentences..."
                  rows={3}
                  className="input-field resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select a category</option>
                  {categories?.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                        {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Cook Time
                </label>
                <input
                  type="text"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  placeholder="e.g., 45 min"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Servings
                </label>
                <input
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="e.g., 4"
                  min="1"
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Ingredients
              </label>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="input-field flex-1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="w-12 h-12 rounded-xl bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center"
                      disabled={ingredients.length === 1}
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Ingredient
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Instructions
              </label>
              <div className="space-y-3">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-sm mt-2">
                        {index + 1}
                      </span>
                      <textarea
                        value={instruction}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                        rows={2}
                        className="input-field flex-1 resize-none"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(index)}
                      className="w-12 h-12 rounded-xl bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center mt-2"
                      disabled={instructions.length === 1}
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddInstruction}
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Step
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full text-lg py-4">
              Publish Recipe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AddRecipe;
