import { Post } from "../../models/post";
import { Tag } from "../../models/tag";

export interface PostDetailResponse extends Post {
  tags: Tag[];
}