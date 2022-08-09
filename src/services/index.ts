import { request, gql, GraphQLClient } from 'graphql-request';
import { LocaleEnum } from '@/types/Locale';
import { Comment } from '@/types/Comment';
import { API_URI as graphqlAPI, BACKEND_ACCESS_TOKEN } from "@/lib/const";
import { Category } from "@/types/Category";


// const graphqlAPI: string = process.env.NEXT_PUBLIC_API_URI;


export const getAllPosts = async () => {
  const query = gql`
  query GetAllPosts {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }`;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
}

export const getPosts = async (language: LocaleEnum) => {
  const query = gql`
    query GetPosts($language:Yazik!) {
      postsConnection(where: {yazik: $language}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { language });

  return result.postsConnection.edges;
};

export const getCategories = async (language: LocaleEnum) => {
  const query = gql`
    query GetCategories($language: Yazik!) {
        categories(where: {yazik: $language}) {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query, { language });

  return result.categories;
};

export const getAllCategories = async () => {
  const query = gql`
    query GetAllCategories {
        categories {
          name
          slug
        }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categories;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories: Array<Category>, slug: string, language: LocaleEnum) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String!], $language: Yazik!) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}, yazik: $language}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories, language });

  return result.posts;
};

export const getAdjacentPosts = async (createdAt: string, slug: string, language: LocaleEnum) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug:String!, $language: Yazik!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt, yazik: $language}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt, yazik: $language}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt, language });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async (language: LocaleEnum) => {
  const query = gql`
    query GetFeaturedPosts($language: Yazik!) {
      posts(where: {AND: {yazik: $language, featuredPost: true}}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query, { language });

  return result.posts;
};

export const submitComment = async (comment: Comment) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  return result.json();
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};

export const getRecentPosts = async (language: LocaleEnum) => {
  const query = gql`
    query GetRecentPosts($language: Yazik!) {
      posts(
        orderBy: createdAt_ASC
        last: 3
        where: {yazik: $language}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { language });

  return result.posts;
};

export const getSearchResults = async (searchQuery: string, language: LocaleEnum) => {
  const query = gql`
    query GetSearchResults($searchQuery:String!, $language: Yazik!) {
      postsConnection(where: {
        AND: { _search: $searchQuery, yazik: $language }
      }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { searchQuery, language });
  return result.postsConnection.edges;
}

export const addSubscriber = async (email: string) => {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${BACKEND_ACCESS_TOKEN}`
    }
  })

  const query = gql`
    mutation MyMutation($email: String!) {
      createSubscribe(data: {email: $email}) {
        email
      }
    }`;
  await graphQLClient.request(query, { email });
};
