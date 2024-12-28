export interface User {
  userName: string;
  fullName: string;
  profilePhoto: string | null;
  coverPhoto: string | null;
  bio: string | null;
  postsCount: number;
  commentsCount: number;
  followersCount: number;
  followingCount: number;
  isFollower: boolean;
  accountCreatedDate: Date;
}
