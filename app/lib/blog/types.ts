export type BlogPostBlock =
  | {
      type: 'html'
      html: string
    }
  | {
      type: 'image'
      fileName: string
      alt: string
      caption?: string
    }

export type BlogPost = {
  slug: string
  title: string
  subtitle: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  issueLabel: string
  imageDirectory: string
  blocks: BlogPostBlock[]
}
