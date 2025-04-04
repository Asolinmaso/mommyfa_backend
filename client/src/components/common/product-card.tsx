import { useState } from 'react';
import { Heart, ShoppingCart, Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import ProductModal from './product-modal';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to login to add items to your cart',
        variant: 'destructive',
      });
      return;
    }

    try {
      await apiRequest('POST', '/api/cart/items', {
        productId: product.id,
        quantity: 1
      });

      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the modal from opening when clicking wishlist
    
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to login to add items to your wishlist',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isWishlisted) {
        // Remove from wishlist - this is a simplified approach
        await apiRequest('DELETE', `/api/wishlist/${product.id}`);
      } else {
        await apiRequest('POST', '/api/wishlist', {
          productId: product.id
        });
      }

      setIsWishlisted(!isWishlisted);
      
      toast({
        title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
        description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isWishlisted ? 'remove from' : 'add to'} wishlist`,
        variant: 'destructive',
      });
    }
  };

  // Calculate discount percentage
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  // Format price in rupees
  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col cursor-pointer"
        onClick={openModal}
      >
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
          {product.isOrganic && (
            <span className="absolute top-2 left-2 bg-primary text-white text-xs py-1 px-2 rounded">Organic</span>
          )}
          <button 
            className={`absolute top-2 right-2 bg-white rounded-full p-2 shadow-md ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-primary'}`}
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-medium text-textDark mb-1">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-4 w-4 fill-current" 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">(0)</span>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div>
              <span className="text-lg font-semibold text-primary">{formatPrice(product.discountPrice || product.price)}</span>
              {product.discountPrice && (
                <span className="text-sm text-gray-500 line-through ml-1">{formatPrice(product.price)}</span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-xs bg-green-100 text-success py-1 px-2 rounded">{discountPercentage}% off</span>
            )}
          </div>
        </div>
        <div className="p-3 bg-gray-50 border-t" onClick={(e) => e.stopPropagation()}>
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded font-medium text-sm transition"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={product}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductCard;
