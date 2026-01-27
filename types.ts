
export interface Review {
  id: string;
  author: string;
  location: string;
  date: string;
  title?: string;
  content: string;
  rating: number;
  source: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'BBQ Plates' | 'Burgers' | 'Sides' | 'Drinks';
  imageUrl: string;
}
