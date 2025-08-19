export type MemberRole = 'owner' | 'member';

export interface MemberData {
  name: string;
  role: MemberRole
} 

export interface Group {
  name: string;
  createdBy: string;
  members: Record<string, MemberData>;
  createdAt: string;
}
