import { NextPageWithLayout } from "@/pages/_app";
import { Category } from "@/types/category";
import Link from "next/link";

type Props = {
  categories?: Category[] | null
}

const CategoriesSection: NextPageWithLayout<Props> = ( { categories }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect recipe for any meal. From hearty breakfasts to decadent desserts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.map((category, index) => (
            <Link
              key={category.name}
              href={`/recipes?category=${category.name.toLowerCase()}`}
              className="group p-6 rounded-2xl bg-card hover:bg-primary transition-colors duration-300 text-center animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </div> */}
              <h3 className="font-semibold text-foreground group-hover:text-primary-foreground transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
