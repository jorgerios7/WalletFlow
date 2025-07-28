export type MemberRole = 'owner' | 'member';

export interface MemberData {
  name: string;
  type: MemberRole
} 

export interface Home {
  name: string;
  createdBy: string;
  members: Record<string, MemberData>;
  createdAt: string;
}
