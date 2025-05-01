
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart } from "lucide-react";

type CatalogItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

const SAMPLE_ITEMS: CatalogItem[] = [
  {
    id: "1",
    name: "Dell XPS 13 Laptop",
    category: "Hardware",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "2",
    name: "HP LaserJet Pro Printer",
    category: "Office Equipment",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

export const CatalogPreview = () => {
  const { toast } = useToast();

  const handleAddToCart = (item: CatalogItem) => {
    toast({
      title: "Item Added to Cart",
      description: `${item.name} has been added to your procurement cart.`,
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trending Catalog Items</h2>
        <Button variant="outline" size="sm">
          View Full Catalog
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_ITEMS.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium">{item.name}</CardTitle>
                <Badge variant="outline">{item.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground">SKU: PROC-{item.id}-2023</p>
              <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => handleAddToCart(item)}
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
