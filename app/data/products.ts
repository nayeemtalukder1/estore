export interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  category: string;
  sku: string;
  description: string;
  stock: number;
  maxStock: number;
  color: string;
  rating: number;
  onSale: boolean;
}

export const PRODUCTS: Product[] = [
  // --- WOMEN'S COLLECTION (IDs 1-12) ---
  { id: 1, name: "Ribbed Square Neck Top", image: "/products/p1_product.png", originalPrice: 1500, discountedPrice: 1250, discount: 17, category: "Women", sku: "W-TOP-01", description: "Soft ribbed fabric with a modern square neckline.", stock: 50, maxStock: 100, color: "Pink", rating: 4, onSale: true },
  { id: 2, name: "Faux Fur Hooded Jacket", image: "/products/product_1.png", originalPrice: 4500, discountedPrice: 3200, discount: 29, category: "Women", sku: "W-JKT-01", description: "Premium faux fur with internal silk lining.", stock: 15, maxStock: 30, color: "Black", rating: 5, onSale: true },
  { id: 4, name: "Minimalist Tan Crop", image: "/products/product_3.png", originalPrice: 1200, discountedPrice: 850, discount: 30, category: "Women", sku: "W-TOP-03", description: "Breathable cotton crop top for summer.", stock: 22, maxStock: 50, color: "Tan", rating: 3, onSale: true },
  { id: 5, name: "Burgundy Velvet Top", image: "/products/product_4.png", originalPrice: 2200, discountedPrice: 1750, discount: 20, category: "Women", sku: "W-TOP-04", description: "Deep burgundy velvet with a slight shimmer.", stock: 10, maxStock: 25, color: "Burgundy", rating: 5, onSale: true },
  { id: 6, name: "Lace Detailed Shirt", image: "/products/product_5.png", originalPrice: 2500, discountedPrice: 1900, discount: 24, category: "Women", sku: "W-TOP-05", description: "Intricate lace patterns on the sleeves.", stock: 18, maxStock: 40, color: "White", rating: 4, onSale: true },
  { id: 7, name: "Boho Autumn Sweater", image: "/products/product_6.png", originalPrice: 3200, discountedPrice: 2100, discount: 34, category: "Women", sku: "W-SW-06", description: "Warm knit sweater with a relaxed silhouette.", stock: 12, maxStock: 30, color: "Brown", rating: 5, onSale: true },
  { id: 8, name: "Floral Print Blouse", image: "/products/product_9.png", originalPrice: 2000, discountedPrice: 1500, discount: 25, category: "Women", sku: "W-TOP-09", description: "Vibrant floral prints on soft georgette.", stock: 30, maxStock: 60, color: "Pink", rating: 4, onSale: true },

  // --- MEN'S COLLECTION (IDs 13-24) ---
  { id: 13, name: "Olive Field Jacket", image: "/products/product_13.png", originalPrice: 3800, discountedPrice: 2900, discount: 23, category: "Men", sku: "M-JKT-13", description: "Tactical inspired field jacket with 4 pockets.", stock: 20, maxStock: 50, color: "Olive", rating: 4, onSale: true },
  { id: 14, name: "Panelled Track Jacket", image: "/products/product_14.png", originalPrice: 3200, discountedPrice: 2100, discount: 34, category: "Men", sku: "M-JKT-14", description: "Waterproof windbreaker for urban explorers.", stock: 15, maxStock: 40, color: "White/Navy", rating: 5, onSale: true },
  { id: 15, name: "Street Style Sweatshirt", image: "/products/product_15.png", originalPrice: 2200, discountedPrice: 1600, discount: 27, category: "Men", sku: "M-SWT-15", description: "Heavyweight cotton with a boxy fit.", stock: 45, maxStock: 100, color: "Black", rating: 4, onSale: true },
  { id: 16, name: "Crimson Rain Shell", image: "/products/product_16.png", originalPrice: 2800, discountedPrice: 1999, discount: 28, category: "Men", sku: "M-JKT-16", description: "Lightweight shell for rainy commutes.", stock: 8, maxStock: 20, color: "Red", rating: 4, onSale: true },
  { id: 17, name: "Indi Denim Jacket", image: "/products/product_17.png", originalPrice: 4500, discountedPrice: 3500, discount: 22, category: "Men", sku: "M-JKT-17", description: "Classic 14oz raw denim construction.", stock: 12, maxStock: 30, color: "Blue", rating: 5, onSale: true },
  { id: 18, name: "Grey Tech Zip-Up", image: "/products/product_18.png", originalPrice: 2500, discountedPrice: 1800, discount: 28, category: "Men", sku: "M-HD-18", description: "Breathable tech-fleece with hidden pockets.", stock: 25, maxStock: 60, color: "Grey", rating: 4, onSale: true },
  { id: 19, name: "White Stealth Windbreaker", image: "/products/product_19.png", originalPrice: 3000, discountedPrice: 2200, discount: 26, category: "Men", sku: "M-JKT-19", description: "Ultra-lightweight fabric with reflective trim.", stock: 10, maxStock: 30, color: "White", rating: 4, onSale: true },
  { id: 24, name: "Premium Biker Leather", image: "/products/product_24.png", originalPrice: 8500, discountedPrice: 6500, discount: 23, category: "Men", sku: "M-JKT-24", description: "Genuine leather with silver hardware finish.", stock: 5, maxStock: 15, color: "Black", rating: 5, onSale: true },

  // --- KIDS' COLLECTION (IDs 25-36) ---
  { id: 25, name: "Kids Sky Blue Hoodie", image: "/products/product_25.png", originalPrice: 1500, discountedPrice: 999, discount: 33, category: "Kids", sku: "K-HD-25", description: "Soft brushed fleece for all-day comfort.", stock: 40, maxStock: 80, color: "Blue", rating: 5, onSale: true },
  { id: 27, name: "Youth Colorblock Set", image: "/products/product_27.png", originalPrice: 1800, discountedPrice: 1350, discount: 25, category: "Kids", sku: "K-SET-27", description: "Matching hoodie and joggers set.", stock: 30, maxStock: 60, color: "Multi", rating: 4, onSale: true },
  { id: 28, name: "Green Adventure Sweater", image: "/products/product_28.png", originalPrice: 1200, discountedPrice: 800, discount: 33, category: "Kids", sku: "K-SW-28", description: "Durable knit for active little ones.", stock: 55, maxStock: 100, color: "Green", rating: 4, onSale: true },
  { id: 29, name: "Navy Padded Gilet", image: "/products/product_29.png", originalPrice: 2000, discountedPrice: 1500, discount: 25, category: "Kids", sku: "K-VST-29", description: "Insulated vest for layering in winter.", stock: 15, maxStock: 40, color: "Navy", rating: 5, onSale: true },
  { id: 32, name: "Skater Boy Combo", image: "/products/product_32.png", originalPrice: 2200, discountedPrice: 1600, discount: 27, category: "Kids", sku: "K-SET-32", description: "Cool skater-style outfit with denim details.", stock: 10, maxStock: 25, color: "Blue", rating: 4, onSale: true },
  { id: 33, name: "Midnight Active Tee", image: "/products/product_33.png", originalPrice: 900, discountedPrice: 650, discount: 27, category: "Kids", sku: "K-TEE-33", description: "Moisture-wicking fabric for sports.", stock: 60, maxStock: 120, color: "Navy", rating: 4, onSale: true },
  { id: 36, name: "Classic Varsity Joggers", image: "/products/product_36.png", originalPrice: 1400, discountedPrice: 999, discount: 28, category: "Kids", sku: "K-PNT-36", description: "Relaxed fit joggers with varsity side-stripes.", stock: 25, maxStock: 50, color: "Black", rating: 5, onSale: true }
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));
export const COLORS = Array.from(new Set(PRODUCTS.map(p => p.color)));