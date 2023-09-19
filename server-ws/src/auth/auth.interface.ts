export interface Payload {
  ulid: string;
  username: string;
}

export interface SocketUser {
  socketId?: string;
  ulid: string;
  username: string;
  isOnline: boolean;
}
