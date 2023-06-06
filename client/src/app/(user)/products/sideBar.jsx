import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./productsSort";

function SideBar({ categories }) {
  return (
    <div className="flex flex-col gap-y-5">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}

export default SideBar;
