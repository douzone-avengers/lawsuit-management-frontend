type UserBasicInfoType = {
  id: number;
  email: string;
  name: string;
  role: string;
  hierarchy: string;
};

type CaseBasicInfoType = {
  id: number;
  type: string;
  num: string;
  name: string;
};

export type MessageInfoType = {
  id: number;
  roomId: number;
  senderId: number;
  content: string;
  createdAt: string;
};

type MessageDetailInfoType = {
  id: number;
  roomId: number;
  senderId: number;
  content: string;
  createdAt: string;
};

export type RoomBasicInfoType = {
  id: number;
  type: string;
  name: string | null;
  users: UserBasicInfoType[];
};

export type RoomDetailInfoType = RoomBasicInfoType & {
  recentMessage: MessageDetailInfoType | null;
  unreadMessageCount: number;
};

export type SearchUserByEmailResponseType = UserBasicInfoType | null;

export type SearchUserDetailByEmailResponseType = UserBasicInfoType & {
  lawsuits: CaseBasicInfoType[];
};

export type SearchFriendsByEmailResponseType = UserBasicInfoType[];

export type GetOneToOneRoomByEmailResponseType = RoomBasicInfoType | null;

export type CreateRoomResponseType = RoomBasicInfoType;

export type GetAllRoomsResponseType = RoomDetailInfoType[];

export type GetAllMessagesResponseType = MessageInfoType[];
