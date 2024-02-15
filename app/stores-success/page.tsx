import { CartItem } from "../components/CartItem/CartItem";

export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: any) {
  if (!searchParams.orderId) {
    return null;
  }

  return (
    <div className="mx-auto px-14">
      <h2 className="text-center">
        Thank you for purchasing John Doe
      </h2>
      <div className="flex-1 px-24 py-10 flex flex-col justify-center items-center">
        You just bought:
        <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b">
          <CartItem
            hideButtons={true}
            key="1"
            item={{_id: "1", quantity: 3, url: "/", productName: "Product 1", description: "Product 1 description"}}
          />
          <CartItem
            hideButtons={true}
            key="2"
            item={{_id: "1", quantity: 2, url: "/", productName: "Product 2", description: "Product 2 description"}}
          />
        </ul>
        <br />
        <p>
          We will ship to Central Park
        </p>
      </div>
    </div>
  );
}
