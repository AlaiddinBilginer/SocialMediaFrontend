export interface CreatePostRequest {
  title?: string;
  content?: string;
  categoryId: string;
  files?: File[];
}