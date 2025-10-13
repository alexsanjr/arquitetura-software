import { Video, VideoType } from "./Video";
import { User } from "./User";

export class RealVideo implements Video {
  constructor(public title: string, public accessLevel: VideoType) { }

  play(user: User): void {
    console.log(`Reproduzindo vídeo: ${this.title} para ${user.name}`);
  }
}