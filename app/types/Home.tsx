export type MemberRole = 'owner' | 'member';

export interface Home {
  name: string;
  createdBy: string;
  members: Record<string, MemberRole>;
  createdAt: string;
}
