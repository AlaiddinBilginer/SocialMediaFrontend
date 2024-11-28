import { Post } from "../../models/post";

export interface ListPostResponse {
  totalPostCount: number;
  posts: Post[];
}