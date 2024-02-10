import { getWixClient } from '@/app/model/auth/auth';

interface CollectionFilters {
  limit?: number;
  exclude?: string;
}

interface ProductsFilters {
  limit?: number;
  slug?: string;
  collectionId?: string;
}

export const queryCollections = async ({
  limit,
  exclude,
}: CollectionFilters = {}) => {
  const wixClient = getWixClient();
  let query = wixClient.collections.queryCollections();

  if (limit) {
    query = query.limit(limit);
  }

  if (exclude) {
    query = query.ne("name", [exclude]);
  }

  const { items } = await query.find();
  return items;
};

export const queryProducts = async ({
  slug,
  limit,
  collectionId,
}: ProductsFilters = {}) => {
  const wixClient = getWixClient();
  let query = wixClient.products.queryProducts();

  if (limit) {
    query = query.limit(limit);
  }

  if (slug) {
    query = query.eq("slug", slug);
  }

  if (collectionId) {
    query = query.eq("collectionIds", collectionId);
  }
  const { items } = await query.find();
  return items;
};
