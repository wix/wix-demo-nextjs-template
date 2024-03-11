import StorePage from "@/app/store/page";
import { queryCollections } from "@/app/model/store/store-api";

export async function generateMetadata({ params }: any) {
  const collections = await queryCollections();
  const collectionName = collections.find(
    ({ slug }) => slug === params?.category
  )?.name!;
  return {
    title: `Store | ${collectionName}`,
  };
}

export default StorePage;
