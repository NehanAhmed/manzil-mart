export interface Product {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  unit: string;
  discountPercent: number;
  href?: string;
}