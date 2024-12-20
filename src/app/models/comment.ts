export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePhoto: string;
  totalRepliesCount: number;
  createdDate: Date;
  updatedDate: Date;
}