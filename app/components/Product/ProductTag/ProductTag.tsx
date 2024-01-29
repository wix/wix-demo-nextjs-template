interface ProductTagProps {
  name: string;
  price: string;
  sku?: string;
}

export const ProductTag: React.FC<ProductTagProps> = ({ name, price, sku }) => {
  return (
    <>
      {sku && (
        <span className="text-xs mb- font-roboto font-normal">SKU: {sku}</span>
      )}
      <h2 className="max-w-full w-full leading-extra-loose text-3xl tracking-wide leading-8 py-1 font-normal">
        {name}
      </h2>
      <p className="text-md font-bold inline-block tracking-wide py-1">
        {price}
      </p>
    </>
  );
};
