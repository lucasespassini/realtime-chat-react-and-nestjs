export interface Payload {
  ulid: string;
  username: string;
  icon: string;
}

export interface SocketUser {
  usr_ulid: string;
  cvt_ulid?: string;
  usr_socket_id: string;
  usr_username: string;
}
