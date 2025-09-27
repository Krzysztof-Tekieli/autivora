export type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  phone: string;
  images: string[];
  packageTier?: "Basic" | "Premium" | "Platyna";
  location: string; // <- string, nie obiekt Location
  createdAt: string;
  category: "car" | "motorcycle" | "other"; // <-- dodaj to pole
};
