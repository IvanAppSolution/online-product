import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Product } from "@/components/shared/types";
import Image from "next/image";
import { Button } from "./button";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";

interface ProductCardProps {
  product: Product
}

export default function ProductCard({product}: ProductCardProps) {
  const imageUrl = product.images[0].startsWith("http") ? product.images[0] : `https://i.imgur.com/${product.images[0]}`;
  return (
    <Card key={product.id}  className="flex flex-col justify-between pt-0 pb-4">
      <CardHeader className="p-0 relative">        
        <Image
          src={imageUrl}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 left-2">{product.category.name}</Badge>
        <div className="p-6 pb-0">
          <CardTitle>{product.title}</CardTitle>
        </div>  
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-xl font-bold">${product.price}</p>
        <CardDescription>{product.description.slice(0, 100)}...</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>
          <ShoppingCartIcon className="size-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )      
}