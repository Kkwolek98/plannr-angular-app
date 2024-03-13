import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-youtube-video",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./youtube-video.component.html",
  styleUrl: "./youtube-video.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeVideoComponent {
  private readonly sanitizer = inject(DomSanitizer);
  public url = input(undefined, {
    transform: (val: string) => {
      if (!val) {
        return undefined;
      }

      const embededUrl = this.getEmbeddedLink(val);

      return this.sanitizer.bypassSecurityTrustResourceUrl(embededUrl);
    },
  });

  private getEmbeddedLink(normalLink: string): string {
    const videoId = normalLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )?.[1];
    if (!videoId) {
      throw Error("Invalid YouTube link");
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
