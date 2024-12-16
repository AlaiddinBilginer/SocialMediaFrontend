export interface CreateCommentRequest {
  postId: string;
  content: string;
  parentCommentId: string | null;
}