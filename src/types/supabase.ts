export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string
          name: string
          email: string
          bio: string | null
          avatar_url: string | null
          linkedin_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image_url: string | null
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
          author_id: string
          reading_time: number
          view_count: number
          seo_metadata: Json | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          featured_image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          author_id: string
          reading_time: number
          view_count?: number
          seo_metadata?: Json | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          featured_image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          author_id?: string
          reading_time?: number
          view_count?: number
          seo_metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          created_at?: string
        }
        Relationships: []
      }
      post_categories: {
        Row: {
          post_id: string
          category_id: string
        }
        Insert: {
          post_id: string
          category_id: string
        }
        Update: {
          post_id?: string
          category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          }
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}