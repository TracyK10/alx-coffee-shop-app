// Coffee type for the application
export interface Coffee {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: any; // Using any for require() images
  type: string;
  size?: string;
  withChocolate?: boolean;
  withMilk?: boolean;
  withOatMilk?: boolean;
  isSingleShot?: boolean;
  isFavorite?: boolean;
  reviewCount?: number;
  preparationMethods?: string[];
}
