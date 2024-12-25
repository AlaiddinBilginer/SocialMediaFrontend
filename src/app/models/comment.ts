export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePhoto: string | null;
  totalRepliesCount: number;
  createdDate: Date;
  updatedDate: Date;
}