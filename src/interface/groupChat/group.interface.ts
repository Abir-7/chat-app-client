export interface IChatGroup {
  _id: string; // Unique identifier for the chat group
  name: string; // Name of the group
  isGroup: boolean; // Whether it is a group or not
  users: string[]; // Array of user IDs
  createdAt: string; // ISO string representing creation date
  updatedAt: string; // ISO string representing last update date
  __v: number; // Version key (used by Mongoose)
}
