export interface GetCommentsResponse {
  commentId: string;
  postId: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePhoto: string;
  isLiked: boolean;
  likeCount: number;
  createdDate: Date;
  updatedDate: Date;
}