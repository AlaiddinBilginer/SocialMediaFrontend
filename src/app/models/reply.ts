export interface Reply {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePhoto: string | null;
  isLiked: boolean;
  likeCount: number;
  createdDate: Date;
  updatedDate: Date;
}