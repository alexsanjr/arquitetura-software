import { User } from "./User";

export type VideoType = "gratuito" | "premium";

export interface Video {
  title: string;
  accessLevel: VideoType;
  play(user: User): void;
}