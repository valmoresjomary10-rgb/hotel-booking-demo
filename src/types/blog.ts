export interface BlogAuthor {
  name: string
  role: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  author: BlogAuthor
  publishedAt: string
  readTime: number
  featured: boolean
  tags: string[]
}
