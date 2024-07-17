import { ProductCard, products } from "@products/index";

export default function ProductsPage() {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
