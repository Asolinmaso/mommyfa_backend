import { mongoose } from '../config/mongodb';
import { sessionStore } from '../config/mongodb';
import { IStorage } from '../storage';
import {
  User, IUser,
  Category, ICategory,
  Brand, IBrand,
  Product, IProduct,
  HeroSlider, IHeroSlider,
  PromoAd, IPromoAd,
  Ebook, IEbook,
  Order, IOrder,
  OrderItem, IOrderItem,
  Cart, ICart,
  CartItem, ICartItem,
  Review, IReview,
  Wishlist, IWishlist
} from '../models';
import { 
  InsertUser, InsertCategory, InsertBrand, InsertProduct,
  InsertHeroSlider, InsertPromoAd, InsertEbook, InsertOrder,
  InsertOrderItem, InsertCart, InsertCartItem, InsertReview,
  InsertWishlist
} from '@shared/schema';

export class MongoDBStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = sessionStore;
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    try {
      if (!id) {
        console.error('Invalid user ID provided');
        return undefined;
      }
      const user = await User.findById(id).exec();
      if (!user) {
        console.log(`No user found with ID: ${id}`);
        return undefined;
      }
      return user.toObject();
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error; // Propagate error for proper handling
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      if (!username) {
        console.error('Invalid username provided');
        return undefined;
      }
      const user = await User.findOne({ username }).exec();
      if (!user) {
        console.log(`No user found with username: ${username}`);
        return undefined;
      }
      return user.toObject();
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw new Error('Failed to fetch user from MongoDB');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await User.findOne({ email });
    return user ? user.toObject() : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = new User(user);
    await newUser.save();
    return newUser.toObject();
  }

  async updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined> {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUser ? updatedUser.toObject() : undefined;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await User.find();
    return users.map(user => user.toObject());
  }

  async getUsersByRole(role: string): Promise<User[]> {
    const users = await User.find({ role });
    return users.map(user => user.toObject());
  }

  // Category operations
  async getCategory(id: number): Promise<Category | undefined> {
    const category = await Category.findById(id.toString());
    return category ? category.toObject() : undefined;
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    const category = await Category.findOne({ name });
    return category ? category.toObject() : undefined;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory = new Category(category);
    await newCategory.save();
    return newCategory.toObject();
  }

  async updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined> {
    const updatedCategory = await Category.findByIdAndUpdate(id.toString(), category, { new: true });
    return updatedCategory ? updatedCategory.toObject() : undefined;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await Category.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await Category.find();
    return categories.map(category => category.toObject());
  }

  // Brand operations
  async getBrand(id: number): Promise<Brand | undefined> {
    const brand = await Brand.findById(id.toString());
    return brand ? brand.toObject() : undefined;
  }

  async getBrandByName(name: string): Promise<Brand | undefined> {
    const brand = await Brand.findOne({ name });
    return brand ? brand.toObject() : undefined;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    const newBrand = new Brand(brand);
    await newBrand.save();
    return newBrand.toObject();
  }

  async updateBrand(id: number, brand: Partial<InsertBrand>): Promise<Brand | undefined> {
    const updatedBrand = await Brand.findByIdAndUpdate(id.toString(), brand, { new: true });
    return updatedBrand ? updatedBrand.toObject() : undefined;
  }

  async deleteBrand(id: number): Promise<boolean> {
    const result = await Brand.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getAllBrands(): Promise<Brand[]> {
    const brands = await Brand.find();
    return brands.map(brand => brand.toObject());
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    const product = await Product.findById(id.toString());
    return product ? product.toObject() : undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct.toObject();
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const updatedProduct = await Product.findByIdAndUpdate(id.toString(), product, { new: true });
    return updatedProduct ? updatedProduct.toObject() : undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await Product.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await Product.find();
    return products.map(product => product.toObject());
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const products = await Product.find({ categoryId: categoryId.toString() });
    return products.map(product => product.toObject());
  }

  async getProductsByBrand(brandId: number): Promise<Product[]> {
    const products = await Product.find({ brandId: brandId.toString() });
    return products.map(product => product.toObject());
  }

  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    const products = await Product.find({ sellerId: sellerId.toString() });
    return products.map(product => product.toObject());
  }

  // HeroSlider operations
  async getHeroSlider(id: number): Promise<HeroSlider | undefined> {
    const heroSlider = await HeroSlider.findById(id.toString());
    return heroSlider ? heroSlider.toObject() : undefined;
  }

  async createHeroSlider(heroSlider: InsertHeroSlider): Promise<HeroSlider> {
    const newHeroSlider = new HeroSlider(heroSlider);
    await newHeroSlider.save();
    return newHeroSlider.toObject();
  }

  async updateHeroSlider(id: number, heroSlider: Partial<InsertHeroSlider>): Promise<HeroSlider | undefined> {
    const updatedHeroSlider = await HeroSlider.findByIdAndUpdate(id.toString(), heroSlider, { new: true });
    return updatedHeroSlider ? updatedHeroSlider.toObject() : undefined;
  }

  async deleteHeroSlider(id: number): Promise<boolean> {
    const result = await HeroSlider.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getAllHeroSliders(): Promise<HeroSlider[]> {
    const heroSliders = await HeroSlider.find();
    return heroSliders.map(heroSlider => heroSlider.toObject());
  }

  async getActiveHeroSliders(): Promise<HeroSlider[]> {
    const heroSliders = await HeroSlider.find({ isActive: true });
    return heroSliders.map(heroSlider => heroSlider.toObject());
  }

  // PromoAd operations
  async getPromoAd(id: number): Promise<PromoAd | undefined> {
    const promoAd = await PromoAd.findById(id.toString());
    return promoAd ? promoAd.toObject() : undefined;
  }

  async createPromoAd(promoAd: InsertPromoAd): Promise<PromoAd> {
    const newPromoAd = new PromoAd(promoAd);
    await newPromoAd.save();
    return newPromoAd.toObject();
  }

  async updatePromoAd(id: number, promoAd: Partial<InsertPromoAd>): Promise<PromoAd | undefined> {
    const updatedPromoAd = await PromoAd.findByIdAndUpdate(id.toString(), promoAd, { new: true });
    return updatedPromoAd ? updatedPromoAd.toObject() : undefined;
  }

  async deletePromoAd(id: number): Promise<boolean> {
    const result = await PromoAd.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getAllPromoAds(): Promise<PromoAd[]> {
    const promoAds = await PromoAd.find();
    return promoAds.map(promoAd => promoAd.toObject());
  }

  async getActivePromoAds(): Promise<PromoAd[]> {
    const promoAds = await PromoAd.find({ isActive: true });
    return promoAds.map(promoAd => promoAd.toObject());
  }

  // Ebook operations
  async getEbook(id: string): Promise<Ebook | undefined> {
    const ebook = await Ebook.findById(id);
    return ebook ? ebook.toObject() : undefined;
  }

  async createEbook(ebook: InsertEbook): Promise<Ebook> {
    const newEbook = new Ebook(ebook);
    await newEbook.save();
    return newEbook.toObject();
  }

  async updateEbook(id: string, ebook: Partial<InsertEbook>): Promise<Ebook | undefined> {
    const updatedEbook = await Ebook.findByIdAndUpdate(id, ebook, { new: true });
    return updatedEbook ? updatedEbook.toObject() : undefined;
  }

  async deleteEbook(id: string): Promise<boolean> {
    const result = await Ebook.findByIdAndDelete(id);
    return !!result;
  }

  async getAllEbooks(): Promise<Ebook[]> {
    const ebooks = await Ebook.find();
    return ebooks.map(ebook => ebook.toObject());
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    const order = await Order.findById(id.toString());
    return order ? order.toObject() : undefined;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder.toObject();
  }

  async updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined> {
    const updatedOrder = await Order.findByIdAndUpdate(id.toString(), order, { new: true });
    return updatedOrder ? updatedOrder.toObject() : undefined;
  }

  async deleteOrder(id: number): Promise<boolean> {
    const result = await Order.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await Order.find();
    return orders.map(order => order.toObject());
  }

  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    const orders = await Order.find({ buyerId: buyerId.toString() });
    return orders.map(order => order.toObject());
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    const orders = await Order.find({ status });
    return orders.map(order => order.toObject());
  }

  // OrderItem operations
  async getOrderItem(id: number): Promise<OrderItem | undefined> {
    const orderItem = await OrderItem.findById(id.toString());
    return orderItem ? orderItem.toObject() : undefined;
  }

  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const newOrderItem = new OrderItem(orderItem);
    await newOrderItem.save();
    return newOrderItem.toObject();
  }

  async updateOrderItem(id: number, orderItem: Partial<InsertOrderItem>): Promise<OrderItem | undefined> {
    const updatedOrderItem = await OrderItem.findByIdAndUpdate(id.toString(), orderItem, { new: true });
    return updatedOrderItem ? updatedOrderItem.toObject() : undefined;
  }

  async deleteOrderItem(id: number): Promise<boolean> {
    const result = await OrderItem.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getOrderItemsByOrder(orderId: number): Promise<OrderItem[]> {
    const orderItems = await OrderItem.find({ orderId: orderId.toString() });
    return orderItems.map(orderItem => orderItem.toObject());
  }

  // Cart operations
  async getCart(id: number): Promise<Cart | undefined> {
    const cart = await Cart.findById(id.toString());
    return cart ? cart.toObject() : undefined;
  }

  async getCartByUser(userId: number): Promise<Cart | undefined> {
    const cart = await Cart.findOne({ userId: userId.toString() });
    return cart ? cart.toObject() : undefined;
  }

  async createCart(cart: InsertCart): Promise<Cart> {
    const newCart = new Cart(cart);
    await newCart.save();
    return newCart.toObject();
  }

  async deleteCart(id: number): Promise<boolean> {
    const result = await Cart.findByIdAndDelete(id.toString());
    return !!result;
  }

  // CartItem operations
  async getCartItem(id: number): Promise<CartItem | undefined> {
    const cartItem = await CartItem.findById(id.toString());
    return cartItem ? cartItem.toObject() : undefined;
  }

  async createCartItem(cartItem: InsertCartItem): Promise<CartItem> {
    const newCartItem = new CartItem(cartItem);
    await newCartItem.save();
    return newCartItem.toObject();
  }

  async updateCartItem(id: number, cartItem: Partial<InsertCartItem>): Promise<CartItem | undefined> {
    const updatedCartItem = await CartItem.findByIdAndUpdate(id.toString(), cartItem, { new: true });
    return updatedCartItem ? updatedCartItem.toObject() : undefined;
  }

  async deleteCartItem(id: number): Promise<boolean> {
    const result = await CartItem.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getCartItemsByCart(cartId: number): Promise<CartItem[]> {
    const cartItems = await CartItem.find({ cartId: cartId.toString() });
    return cartItems.map(cartItem => cartItem.toObject());
  }

  // Review operations
  async getReview(id: number): Promise<Review | undefined> {
    const review = await Review.findById(id.toString());
    return review ? review.toObject() : undefined;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const newReview = new Review(review);
    await newReview.save();
    return newReview.toObject();
  }

  async updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined> {
    const updatedReview = await Review.findByIdAndUpdate(id.toString(), review, { new: true });
    return updatedReview ? updatedReview.toObject() : undefined;
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await Review.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getReviewsByProduct(productId: number): Promise<Review[]> {
    const reviews = await Review.find({ productId: productId.toString() });
    return reviews.map(review => review.toObject());
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    const reviews = await Review.find({ userId: userId.toString() });
    return reviews.map(review => review.toObject());
  }

  // Wishlist operations
  async getWishlist(id: number): Promise<Wishlist | undefined> {
    const wishlist = await Wishlist.findById(id.toString());
    return wishlist ? wishlist.toObject() : undefined;
  }

  async createWishlist(wishlist: InsertWishlist): Promise<Wishlist> {
    const newWishlist = new Wishlist(wishlist);
    await newWishlist.save();
    return newWishlist.toObject();
  }

  async deleteWishlist(id: number): Promise<boolean> {
    const result = await Wishlist.findByIdAndDelete(id.toString());
    return !!result;
  }

  async getWishlistsByUser(userId: number): Promise<Wishlist[]> {
    const wishlists = await Wishlist.find({ userId: userId.toString() });
    return wishlists.map(wishlist => wishlist.toObject());
  }
}