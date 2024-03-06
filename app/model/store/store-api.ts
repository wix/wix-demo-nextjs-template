import { PLACEHOLDER_IMAGE, ALL_ITEMS_ID } from '@/app/constants';

interface CollectionFilters {
  limit?: number;
  exclude?: string;
}

interface ProductsFilters {
  limit?: number;
  slug?: string;
  collectionId?: string;
}

export type ProductOption = {
  optionType: 'color', name: string, choices: { description: string, value: string }[]
}

export type Variant = {
  _id?: string,
  variant?: { priceData: { price: number } },
  stock?: { trackQuantity: boolean, inStock: boolean, quantity: number },
  choices?: Record<string, string>
}

export type Product = {
  _id: string,
  slug: string,
  name: string,
  sku: string,
  collectionIds: string[],
  description: string,
  manageVariants: boolean,
  productOptions: ProductOption[],
  variants: Variant[],
  additionalInfoSections: { title: string, description: string }[],
  media: {mainMedia: { image: { url: string; altText: string } } },
  stock: { inStock: boolean, quantity: number },
  price: { price: number, currency: string, formatted: { price: string } }
}
export type Collection = { 
  _id: string,
  name: string,
  slug: string,
  media: {mainMedia: { image: { url: string; altText: string } } },
};

const allCollections: Collection[] = [{
  _id: ALL_ITEMS_ID, name: "All Products", slug: "all-products", media: {mainMedia: { image: { url: PLACEHOLDER_IMAGE, altText: "main image" } } },
},{
  _id: "0", name: "Collection 1", slug: "collection-1", media: {mainMedia: { image: { url: PLACEHOLDER_IMAGE, altText: "main image" } } },
}, {
  _id: "1", name: "Collection 2", slug: "collection-2", media: {mainMedia: { image: { url: PLACEHOLDER_IMAGE, altText: "main image" } } },
}, {
  _id: "2", name: "Collection 2", slug: "collection-3", media: {mainMedia: { image: { url: PLACEHOLDER_IMAGE, altText: "main image" } } },
}];

const allProducts: Product[] = Array(8).fill(null).map((_, index) => ({
  _id: `${index}`,
  slug: `product-${index + 1}`,
  name: `Product ${index + 1}`,
  price: { currency: 'USD', price: 11,  formatted: { price: '11$' } },
  manageVariants: false,
  stock: { inStock: true, quantity: 999 },
  sku: `SKU-${index + 1}`,
  additionalInfoSections: [{
    title: "Additional Info 1", description: "Additional Description 1"
  }, {
    title: "Additional Info 2", description: "Additional Description 2"
  }],
  collectionIds: [ALL_ITEMS_ID, `${index % 3}`],
  description: `Description ${index + 1}`,
  media: {mainMedia: { image: { url: PLACEHOLDER_IMAGE, altText: "main image" } } },
  variants: [
    {
      _id: "00000000-0000-0000-0000-000000000000",
      choices: {},
      variant: {
        priceData: {
          price: 50,
        },
      },
      stock: {
        trackQuantity: false,
        inStock: true,
        quantity: 999
      }
    }
  ],
  productOptions: [{optionType: "color", name: "Color", choices: [{description: "blue", value: "blue"}, {description: "green", value: "green"}]}]
}));

export const getProduct = async (productId: string) => {
  return { product: allProducts.find(({_id}) => _id === productId) };
}

export const queryCollections = async ({
                                         limit,
                                         exclude,
                                       }: CollectionFilters = {}) => {
  let collections = [...allCollections];

  if (exclude) {
    collections = collections.filter(({name}) => name !== exclude)
  }

  if (limit) {
    collections = collections.slice(0, limit)
  }

  return collections;
};

export const queryProducts = async ({
                                      slug,
                                      limit,
                                      collectionId,
                                    }: ProductsFilters = {}) => {
  let products = [...allProducts];

  if (slug) {
    products = products.filter((product) => product.slug === slug)
  }

  if (collectionId) {
    products = products.filter((product) => product.collectionIds.indexOf(collectionId) !== -1)
  }

  if (limit) {
    products = products.slice(0, limit)
  }

  return products;
};
