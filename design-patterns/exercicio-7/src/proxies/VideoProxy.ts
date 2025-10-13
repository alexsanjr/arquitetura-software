import { User } from "../models/User";
import { RealVideo } from "../models/RealVideo";
import { Video, VideoType } from "../models/Video";

export class VideoProxy implements Video {
  private realVideo?: RealVideo;

  constructor(public title: string, public accessLevel: VideoType) { }

  play(user: User): void {
    if (this.accessLevel === "gratuito" || user.type === "premium") {
      if (!this.realVideo) {
        console.log(`Acesso permitido! Carregando vídeo real...`);
        this.realVideo = new RealVideo(this.title, this.accessLevel);
      }
      this.realVideo.play(user);
    } else {
      console.log(`Acesso negado! O vídeo "${this.title}" é premium e ${user.name} não tem permissão.`);
    }
  }
}
