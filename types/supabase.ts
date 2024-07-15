export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community_post: {
        Row: {
          comment: string
          created_at: string | null
          id: string
          imageUrl: string | null
          like: number | null
          user_id: string | null
        }
        Insert: {
          comment: string
          created_at?: string | null
          id?: string
          imageUrl?: string | null
          like?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string
          created_at?: string | null
          id?: string
          imageUrl?: string | null
          like?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_comments: {
        Row: {
          createdAt: string
          id: string
          postId: string
          text: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          postId: string
          text?: string | null
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          postId?: string
          text?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_comments_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "community_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_post_comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      file_uploads: {
        Row: {
          created_at: string
          email: string
          file_name: string
          fileURL: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          file_name: string
          fileURL: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          file_name?: string
          fileURL?: string
          id?: string
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          address: string | null
          awards: string[] | null
          birth_date: string | null
          career: string[] | null
          created_at: string
          education: string[] | null
          email: string | null
          gender: string | null
          id: string
          introduction: string | null
          links: string[] | null
          name: string | null
          personalInfo: string | null
          phone: string | null
          skills: string[] | null
          title: string | null
        }
        Insert: {
          address?: string | null
          awards?: string[] | null
          birth_date?: string | null
          career?: string[] | null
          created_at?: string
          education?: string[] | null
          email?: string | null
          gender?: string | null
          id?: string
          introduction?: string | null
          links?: string[] | null
          name?: string | null
          personalInfo?: string | null
          phone?: string | null
          skills?: string[] | null
          title?: string | null
        }
        Update: {
          address?: string | null
          awards?: string[] | null
          birth_date?: string | null
          career?: string[] | null
          created_at?: string
          education?: string[] | null
          email?: string | null
          gender?: string | null
          id?: string
          introduction?: string | null
          links?: string[] | null
          name?: string | null
          personalInfo?: string | null
          phone?: string | null
          skills?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          career: string | null
          createdAt: string
          email: string | null
          id: string
          imageUrl: string | null
          job: string | null
          nickname: string | null
          position: string | null
        }
        Insert: {
          career?: string | null
          createdAt?: string
          email?: string | null
          id: string
          imageUrl?: string | null
          job?: string | null
          nickname?: string | null
          position?: string | null
        }
        Update: {
          career?: string | null
          createdAt?: string
          email?: string | null
          id?: string
          imageUrl?: string | null
          job?: string | null
          nickname?: string | null
          position?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_like: {
        Args: {
          post_id: string
        }
        Returns: {
          new_like_count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
