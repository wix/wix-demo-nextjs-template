import { CartItem } from "../components/CartItem/CartItem";
import { getOrder } from '@/app/model/ecom/ecom-api';

export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: any) {
  if (!searchParams.orderId) {
    return null;
  }

  const data = await getOrder(searchParams.orderId);
  return (
    data && (
      <div className="mx-auto px-14">
        <h2 className="text-center">
          Thank you for purchasing!
        </h2>
        <div className="flex-1 px-24 py-10 flex flex-col justify-center items-center">
          You just bought:
          <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b">
            {data.lineItems!.map((item) => (
              <CartItem
                hideButtons={true}
                key={item._id}
                item={item}
                currencyCode={data.currency!}
              />
            ))}
          </ul>
          <br />
        </div>
      </div>
    )
  );
}
