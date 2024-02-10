import {getWixClient} from '@/app/model/auth/auth';
import {items} from '@wix/data';

interface BlogFilters {
  slug?: string;
  limit?: number;
  ascendingBy?: "createdAt";
}

export const queryBlogs = async ({
  slug,
  limit,
  ascendingBy,
}: BlogFilters = {}) => {
  const wixClient = getWixClient();
  let query = wixClient.items.queryDataItems({
    dataCollectionId: "FarmToTableRecipes",
  });

  if (limit) {
    query = query.limit(limit);
  }

  if (slug) {
    query = query.eq("slug", slug);
  }

  if (ascendingBy) {
    query = query.ascending(ascendingBy);
  }

  const { items } = await query.find();
  return items;
};
