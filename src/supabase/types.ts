export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      community_post: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          comment: string;
          imageUrl: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          comment: string;
          imageUrl?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          comment?: string;
          imageUrl?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
