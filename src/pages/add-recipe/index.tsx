import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChefHatIcon, MinusIcon, PlusIcon, UploadIcon } from "@/components/icons";
import { api } from "@/utils/providers/api/api";
import { API_URL } from "@/utils/providers/constants/api";
import { Category } from "@/types/category";
import TopPage from "..";
import { PAGE_LIST } from "@/utils/constant/common";
import Layout from "@/components/layout/layout";


const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  category: z.string().min(1, "Please select a category"),
  difficulty: z.string().min(1, "Please select a difficulty"),
  cookTime: z.string().min(1, "Cook time is required").max(50, "Cook time must be less than 50 characters"),
  servings: z.coerce.number().min(1, "Servings must be at least 1").max(100, "Servings must be less than 100"),
  ingredients: z.array(z.object({
    name: z.string().min(1, "Ingredient name is required"),
    quantity: z.string().min(1, "Quantity is required"),
    unit: z.string().min(1, "Unit is required"),
  })).min(1, "At least one ingredient is required"),
  instructions: z.array(z.object({
    value: z.string().min(1, "Instruction cannot be empty")
  })).min(1, "At least one instruction is required"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const AddRecipe = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      difficulty: "",
      cookTime: "",
      servings: undefined,
      ingredients: [{ name: "", quantity: "", unit: "" }],
      instructions: [{ value: "" }],
    },
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control,
    name: "instructions",
  });

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


  const fetchCategories = () => {
    const result = api.getWithoutAuth({ endPoint: API_URL.CATEGORY});
    const json = result.then(res => res.json());
    json.then(data => setCategories(data.data));
  }

  useState(() => {
    fetchCategories();
  });

  const onSubmit = (data: RecipeFormData) => {
    console.log("Form data:", data);
    // toast({
    //   title: "Recipe submitted!",
    //   description: "Your recipe has been added successfully.",
    // });
  };

  return (
    <Layout>
      <div className="py-12 md:py-16">
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Recipe Photo
              </label>
              <div
                className={`relative border-2 border-dashed border-border rounded-2xl overflow-hidden transition-colors hover:border-primary/50 ${imagePreview ? "aspect-video" : "aspect-[16/9]"}`}
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
                  {...register("title")}
                  placeholder="e.g., Homemade Pasta Carbonara"
                  className={`input-field ${errors.title ? "border-destructive" : ""}`}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Describe your recipe in a few sentences..."
                  rows={3}
                  className={`input-field resize-none ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Category
                </label>
                <select
                  {...register("category")}
                  className={`input-field ${errors.category ? "border-destructive" : ""}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Difficulty
                </label>
                <select
                  {...register("difficulty")}
                  className={`input-field ${errors.difficulty ? "border-destructive" : ""}`}
                >
                  <option value="">Select difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="text-sm text-destructive mt-1">{errors.difficulty.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Cook Time
                </label>
                <input
                  type="text"
                  {...register("cookTime")}
                  placeholder="e.g., 45 min"
                  className={`input-field ${errors.cookTime ? "border-destructive" : ""}`}
                />
                {errors.cookTime && (
                  <p className="text-sm text-destructive mt-1">{errors.cookTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Servings
                </label>
                <input
                  type="number"
                  {...register("servings")}
                  placeholder="e.g., 4"
                  min="1"
                  className={`input-field ${errors.servings ? "border-destructive" : ""}`}
                />
                {errors.servings && (
                  <p className="text-sm text-destructive mt-1">{errors.servings.message}</p>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Ingredients
              </label>
              <div className="space-y-3">
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <div className="flex-[2]">
                      <input
                        type="text"
                        {...register(`ingredients.${index}.name`)}
                        placeholder="Ingredient"
                        className={`input-field w-full ${errors.ingredients?.[index]?.name ? "border-destructive" : ""}`}
                      />
                      {errors.ingredients?.[index]?.name && (
                        <p className="text-sm text-destructive mt-1">{errors.ingredients[index]?.name?.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        {...register(`ingredients.${index}.quantity`)}
                        placeholder="Qty"
                        className={`input-field w-full ${errors.ingredients?.[index]?.quantity ? "border-destructive" : ""}`}
                      />
                      {errors.ingredients?.[index]?.quantity && (
                        <p className="text-sm text-destructive mt-1">{errors.ingredients[index]?.quantity?.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        {...register(`ingredients.${index}.unit`)}
                        placeholder="Unit"
                        className={`input-field w-full ${errors.ingredients?.[index]?.unit ? "border-destructive" : ""}`}
                      />
                      {errors.ingredients?.[index]?.unit && (
                        <p className="text-sm text-destructive mt-1">{errors.ingredients[index]?.unit?.message}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="w-12 h-12 rounded-xl bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center"
                      disabled={ingredientFields.length === 1}
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendIngredient({ name: "", quantity: "", unit: "" })}
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Ingredient
                </button>
              </div>
              {errors.ingredients?.root && (
                <p className="text-sm text-destructive mt-1">{errors.ingredients.root.message}</p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Instructions
              </label>
              <div className="space-y-3">
                {instructionFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-sm mt-2">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <textarea
                          {...register(`instructions.${index}.value`)}
                          placeholder={`Step ${index + 1}`}
                          rows={2}
                          className={`input-field w-full resize-none ${errors.instructions?.[index]?.value ? "border-destructive" : ""}`}
                        />
                        {errors.instructions?.[index]?.value && (
                          <p className="text-sm text-destructive mt-1">{errors.instructions[index]?.value?.message}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="w-12 h-12 rounded-xl bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center mt-2"
                      disabled={instructionFields.length === 1}
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendInstruction({ value: "" })}
                  className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add Step
                </button>
              </div>
              {errors.instructions?.root && (
                <p className="text-sm text-destructive mt-1">{errors.instructions.root.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary w-full text-lg py-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Recipe"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

TopPage.pageId = PAGE_LIST.USER.Category.ID;
TopPage.auth = PAGE_LIST.USER.Category.AUTH;

export default AddRecipe;
