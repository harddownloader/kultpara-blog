import { Category } from '@/types/Category';

export interface Author {
  bio: string
  name: string
  id: string
  photo: {
    url: string
  }
}

export interface Post {
  title: string
  featuredImage: {
    url: string
  }
  createdAt: string
  slug: string
  author: Author
  categories: Array<Category>
  excerpt: string

  content?: {
    raw?: any
  }
}

export interface PostDetails {
  title: string
  featuredImage: {
    url: string
  }
  createdAt: string
  slug: string
  author: Author
  categories: Array<Category>
  excerpt: string

  content: {
    raw: any
  }
}

export type Posts = {
    posts: any
};
