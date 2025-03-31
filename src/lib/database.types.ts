export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rules: {
        Row: {
          id: string;
          content: string;
          order_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          order_number: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          order_number?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          url: string;
          title: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          title?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          title?: string | null;
          created_at?: string;
        };
      };
      navigation: {
        Row: {
          id: string;
          title: string;
          href: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          href: string;
          order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          href?: string;
          order?: number;
          created_at?: string;
        };
      };
      home_content: {
        Row: {
          id: string;
          title: string;
          content: string;
          section: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          section: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          section?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
