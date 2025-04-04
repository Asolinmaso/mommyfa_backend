import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Category, Product } from '@shared/schema';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id);

  // Fetch category details
  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${categoryId}`],
    enabled: !!categoryId,
  });

  // Fetch products for this category
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: [`/api/products`, { categoryId }],
    enabled: !!categoryId,
  });

  const isLoading = categoryLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Category not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{category.name}</h1>
        
        {products.length === 0 ? (
          <p className="text-gray-600">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;