export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePhoto: string | null;
  totalRepliesCount: number;
  isLiked: boolean;
  likeCount: number;
  createdDate: Date;
  updatedDate: Date;
}