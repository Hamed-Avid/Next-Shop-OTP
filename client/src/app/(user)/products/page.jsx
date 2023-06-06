import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import TopBar from "./topBar";
import SideBar from "./sideBar";
import queryString from "query-string";
import { cookies } from "next/headers";
import { toStringCookies } from "@/utils/toStringcookies";
import ProductCart from "@/components/ProductCart";

export const dynamic = "force-dynamic";

async function ProductsPage({ searchParams }) {
  // const { categories } = await getCategories();
  // const { products } = await getProducts(queryString.stringify(searchParams));
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const categoriesData = getCategories();
  const productsData = getProducts(
    queryString.stringify(searchParams),
    strCookies
  );
  const [{ products }, { categories }] = await Promise.all([
    productsData,
    categoriesData,
  ]);

  return (
    <main>
      <h1 className="font-bold text-xl mb-4">محصولات</h1>
      <div className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-3 lg:col-span-2 px-3">
          <SideBar categories={categories} />
        </div>
        <div className="col-span-12 m-5 md:hidden">
          <TopBar categories={categories} />
        </div>
        <section className="col-span-12 md:col-span-9 lg:col-span-10 m-2 mt-16">
          <div className="grid grid-cols-6 gap-x-4 gap-y-20">
            {products.map((item) => (
              <div
                key={item._id}
                className="col-span-6 md:col-span-3 lg:col-span-2"
              >
                <ProductCart product={item} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductsPage;
