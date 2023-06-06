import { getProductBySlug, getProducts } from "@/services/productService";
import AddToCart from "../AddToCart";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import LikeProduct from "../LikeProduct";
import Image from "next/image";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { product } = await getProductBySlug(params.slug);

  return {
    title: product.title,
    description: product.description,
  };
}

async function ProductPage({ params }) {
  const { product } = await getProductBySlug(params.slug);

  const { title, description, imageLink, discount, likes, price, offPrice } =
    product;

  return (
    <main className="flex items-center justify-center">
      <section className="my-10 p-4 w-screen max-w-md flex flex-col bg-white shadow-sm rounded-xl md:w-full h-full transition-all duration-200 ease-in-out hover:shadow-lg">
        <div className="flex items-start bg-slate-100 pt-1 px-1 rounded-lg w-10">
          <LikeProduct product={product} />
          <span
            className={`${
              likes.length === 0 && "hidden"
            } text-rose-400 text-lg pb-1`}
          >
            {likes.length}
          </span>
        </div>
        <div className="flex justify-center">
          <div className=" mb-8 rounded-xl shadow-xl bg-slate-300 mx-8 w-96 h-48">
            <Image
              src={imageLink}
              width={256}
              height={160}
              alt={title}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
        <h2 className="font-bold text-xl mb-4">{title}</h2>
        <p className="font-medium text-lg">{description}</p>
        <div className="flex items-center justify-between my-3 border-t-2 pt-3 px-3 md:px-1">
          <AddToCart product={product} />
          <div>
            <div className="flex gap-x-2 whitespace-nowrap">
              <span className={`${discount ? "line-through" : "font-bold"}`}>
                {toPersianNumbersWithComma(price)} {!discount && "تومان"}
              </span>
              <span
                className={`${
                  !!discount ? "flex" : "hidden"
                } items-center justify-center bg-rose-500 w-10 h-5 rounded-2xl text-white text-sm`}
              >
                {toPersianNumbers(discount)} %
              </span>
            </div>
            {!!discount && (
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold whitespace-nowrap">
                  {toPersianNumbersWithComma(offPrice)} تومان
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;

export async function generateStaticParams() {
  const { products } = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
