import type { Metadata } from "next/types"

type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other"

type SEOProps = {
  title?: string
  description?: string
  image?: string
  slug?: string
  date?: string
  author?: string
  tags?: string[]
  openGraphType?: OpenGraphType
}

export function constructMetadata({
  title = "Next.js Starter Blog",
  description = "A starter blog built with Next.js and Tailwind CSS",
  image = "/og.png",
  slug = "",
  date = new Date().toISOString(),
  author = "Tim Lin",
  tags = [],
  openGraphType = "website",
}: SEOProps): Metadata {
  const baseUrl = "https://rust-rocket.com"
  const url = `${baseUrl}/${slug}`
  const ogImage = `${baseUrl}${image}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: openGraphType,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
      authors: author ? [{ url: baseUrl, name: author }] : [],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@timlin_me",
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
  }
}
