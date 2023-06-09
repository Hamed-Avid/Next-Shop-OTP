"use client";

import Loading from "@/common/loading";
import ProductCart from "@/components/ProductCart";
import { getProducts } from "@/services/productService";

export default async function Home() {
  const { products } = await getProducts();

  if (!products) return <Loading />;
  return (
    <main>
      <section className="grid grid-cols-4 mt-32 mb-8 gap-x-4 gap-y-20 mx-4">
        {products &&
          products.slice(0, 4).map((product, index) => (
            <div key={index} className="col-span-4 md:col-span-2 lg:col-span-1">
              <ProductCart product={product} />
            </div>
          ))}
      </section>
    </main>
  );
}
