import { client } from "@/lib/sanity/client";
import { headerQuery } from "@/lib/queries/navigation";
import type { HeaderData } from "@/types/header";
import Header from "./header";

export default async function HeaderWrapper() {
  const headerData = await client.fetch<HeaderData>(headerQuery);
  return <Header data={headerData} />;
}