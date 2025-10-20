export interface PageData {
  id?: number;
  title?: string;
  name?: string;
  description?: string;
  content?: string;
  photo_path?: string;
  image_path?: string;
  img_one?: {
    name: string;
  };
  main_img?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PageResponse {
  data?: PageData;
  status?: string;
  message?: string;
} 