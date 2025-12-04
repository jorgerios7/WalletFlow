export type MemberRole = 'owner' | 'member';

export type Action = "none" | "newGroup" | "addMember";

export type Delete = 'none' | "deleteMyself" | "deleteMember";

export interface MemberData { id: string; name: string; role: MemberRole };

export interface Creator { id: string; name: string; createdAt: string };

export interface Group { name: string; creation: Creator; members: Record<string, MemberData> };

export interface FirestoreMemberMap { [userId: string]: { name: string, role: MemberRole } };