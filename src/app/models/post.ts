import { PostImage } from "./post-image";

export interface Post {
  id: string;
  title: string | null;
  content: string | null;
  categoryId: string;
  categoryName: string;
  userId: string;
  userName: string;
  userProfilePhoto: string;
  createdDate: Date;
  updatedDate: Date;
  postImages: PostImage[];
}