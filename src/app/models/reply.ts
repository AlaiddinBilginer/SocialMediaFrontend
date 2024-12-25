export interface Reply {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePhoto: string | null;
  createdDate: Date;
  updatedDate: Date;
}