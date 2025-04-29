import React, { Suspense } from 'react'
import ProductCard from "@/components/ui/product-card";
import ProductFilter from "@/components/ui/products-filter";
import { getProducts } from "@/server/products";
import { loadSearchParams } from './search-params'
import type { SearchParams } from "nuqs";
import { revalidateTag } from "next/cache";
import ProductsPagination from "@/components/ui/products-pagination"
import { off } from "process";

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Home({searchParams}: PageProps) {
  const { search, perPage, offset } = await loadSearchParams(searchParams)
  const transformedOffset = (offset - 1) * perPage;
  const products = await getProducts({search, perPage, offset: transformedOffset});
  // const [isLoading, startTransition] = React.useTransition()

  async function refetchProducts() {
    "use server";
    revalidateTag("products");
  }
  // console.log('products: ', products)
  return (
    <main className="flex flex-col gap-10 justify-center max-w-6xl mx-auto">
      <h1>Online products</h1>
      {/* <Suspense fallback={<p>Loading product...</p>}> startTransition={startTransition}  */}
        <ProductFilter refetchProducts={refetchProducts}  /> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.length ? products.map((product) =>  (
                <ProductCard key={product.id} product={product} />
              )) : false}
          </div>    
        <ProductsPagination refetchProducts={refetchProducts} />
      {/* </Suspense>           */}
    </main>
  );
}
