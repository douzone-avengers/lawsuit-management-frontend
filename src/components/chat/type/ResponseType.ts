type UserBasicInfoType = {
  id: number;
  email: string;
  name: string;
  hierarchy: string;
};

type CaseBasicInfoType = {
  id: number;
  type: string;
  num: string;
  name: string;
};

export type RoomBasicInfoType = {
  id: number;
  type: string;
  name: string | null;
  users: UserBasicInfoType[];
};

export type SearchUserByEmailResponseType = UserBasicInfoType | null;

export type SearchUserDetailByEmailResponseType = UserBasicInfoType & {
  lawsuits: CaseBasicInfoType[];
};

export type SearchFriendsByEmailResponseType = UserBasicInfoType[];

export type GetOneToOneRoomByEmailResponseType = RoomBasicInfoType | null;

export type CreateRoomResponseType = RoomBasicInfoType;

export type GetAllRoomsResponseType = RoomBasicInfoType[];
