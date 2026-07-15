export interface CartItem {
  product: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}
