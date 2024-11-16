export interface Car {
  _id: string;
  title: string;
  description: string;
  images: string[];
  tags: {
    car_type: string;
    company: string;
    dealer: string;
    [key: string]: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
} 