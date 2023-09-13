export class MessageDto {
  message: string;
  user: {
    socketId?: string;
    ulid: string;
    username: string;
    isOnline: boolean;
  };
}
