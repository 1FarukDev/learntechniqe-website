/**
 * Shared by the root `app/layout` segment config and `lib/sanity/client` fetch
 * so importing the layout does not run the full Sanity `createClient` and env checks.
 */
export const SANITY_CMS_REVALIDATE_SECONDS = 300;
