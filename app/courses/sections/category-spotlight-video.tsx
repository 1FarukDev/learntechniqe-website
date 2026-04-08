import {
  CATEGORY_SPOTLIGHT_VIDEOS,
  categorySpotlightEmbedUrl,
  type CategorySpotlightSlug,
} from "@/lib/constants/category-spotlight-videos";
import { CATEGORY_SIDEBAR_TEXT } from "@/lib/constants/category-sidebar-text";
import { CATEGORY_PAGE_CURVE_SURFACE } from "@/lib/constants/category-page-surface";

type CategorySpotlightVideoProps = {
  category: CategorySpotlightSlug;
};

export function CategorySpotlightVideo({ category }: CategorySpotlightVideoProps) {
  const config = CATEGORY_SPOTLIGHT_VIDEOS[category];
  if (!config) return null;

  const src = categorySpotlightEmbedUrl(config.youtubeId);
  const title = `${config.headline} — Technique Learning Solutions`;
  const description = CATEGORY_SIDEBAR_TEXT[category];

  return (
    <section
      className="relative -mt-6 overflow-hidden border-y border-black/[0.06] sm:-mt-8 md:-mt-10"
      style={{
        background: `linear-gradient(to bottom, ${CATEGORY_PAGE_CURVE_SURFACE} 0%, #ffffff 42%, #f8faf9 100%)`,
      }}
      aria-labelledby={`category-spotlight-${category}-heading`}
    >
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 md:pb-16 md:pt-12 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-9 xl:gap-40">
          <div className="w-full max-w-prose lg:max-w-[min(100%,32rem)] lg:flex-shrink-0">
            <h2
              id={`category-spotlight-${category}-heading`}
              className="font-outfit text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
            >
              {config.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex w-full flex-shrink-0 justify-center lg:w-auto">
            <div className="relative w-full max-w-[min(100%,280px)] sm:max-w-[300px]">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-[#016068]/10 blur-2xl"
                aria-hidden
              />
              <div className="relative rounded-[1.75rem] bg-gray-900 p-2 shadow-xl ring-1 ring-black/10">
                <div className="overflow-hidden rounded-[1.35rem] bg-black ring-1 ring-white/10">
                  <div className="aspect-[9/16] w-full">
                    <iframe
                      src={src}
                      title={title}
                      className="h-full w-full"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
