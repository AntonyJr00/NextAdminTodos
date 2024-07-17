import { WidgetItem } from "@/components";
import { products, type Product } from "@products/index";
import { ItemCard } from "@shopping-cart/index";
import { cookies } from "next/headers";

export const metadata = {
  title: "Carrito de Compras",
  description: "SEO Title",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const uuid of Object.keys(cart)) {
    const product = products.find((product) => product.id === uuid);
    if (product) {
      productsInCart.push({ product, quantity: cart[uuid] });
    } else {
      console.log("pipipipipip");
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value ?? "{}") as {
    [id: string]: number;
  };
  const productsInCart = getProductsInCart(cart);
  const totalToPay = productsInCart.reduce(
    (prev, curr) => curr.product.price * curr.quantity + prev,
    0
  );

  return (
    <div className="flex items-center gap-3">
      <div className="w-full flex flex-col sm:w-8/12 gap-2">
        <h1 className="text-zinc-800">Productos en el carrito</h1>
        {productsInCart.map((products) => (
          <ItemCard key={products.product.id} {...products} />
        ))}
      </div>
      <div className="w-full sm:w-4/12 flex flex-col">
        <WidgetItem title="Total a Pagar">
          <div className="flex justify-center gap-4">
            <h3 className="text-3xl font-bold text-gray-700">
              ${(totalToPay * 1.5).toFixed(2)}
            </h3>
          </div>
          <span className="font-bold text-center text-gray-800">
            Impuestos 15%: {(totalToPay * 0.15).toFixed(2)}
          </span>
        </WidgetItem>
      </div>
    </div>
  );
}
