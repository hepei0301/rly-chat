import { TypedEvent } from './utils/typedEvent';

export interface ImProps {
  type: string;
  userId: string | number;
  userName: string;
}

export interface MeetChatProps {
  phone: string | number;
  name: string;
}

export interface MeetProps {
  type: string;
  checkedList: MeetChatProps[];
}

export interface ToggleHornProp {
  type: string;
}

// 打开Im
export const EventOpenIm = new TypedEvent<ImProps>();

// 打开Meet
export const EventOpenMeet = new TypedEvent<MeetProps>();

// 关闭Im
export const EventCloseIm = new TypedEvent();

// 关闭Meet
export const EventCloseMeet = new TypedEvent();

// 控制喇叭
export const EventToggleHorn = new TypedEvent<ToggleHornProp>();

// 设置频道
export const EventChannelId = new TypedEvent<string>();

// 控制对讲机
export const EventToggleTotalkd = new TypedEvent<boolean>();
