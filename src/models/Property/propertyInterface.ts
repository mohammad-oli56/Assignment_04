export interface IProperty {
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  categoryId: string;
  images: string[];
  amenities: string[];
}

export interface IupdadeProperty {
      title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  categoryId: string;
  images: string[];
  amenities: string[];
  isAvailable:boolean
}