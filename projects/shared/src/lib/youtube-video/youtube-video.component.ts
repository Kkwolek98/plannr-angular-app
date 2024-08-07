import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, input, signal } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: "lib-youtube-video",
  standalone: true,
  templateUrl: "./youtube-video.component.html",
  styleUrl: "./youtube-video.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SpinnerComponent],
})
export class YoutubeVideoComponent {
  private readonly sanitizer = inject(DomSanitizer);

  public width = input<number>(184);
  public height = input<number>(180);

  public url = input(undefined, {
    transform: (val: string) => {
      if (!val) {
        return undefined;
      }

      const embededUrl = this.getEmbeddedLink(val);

      return this.sanitizer.bypassSecurityTrustResourceUrl(embededUrl);
    },
  });

  protected loading = signal<boolean>(true);

  protected setLoadingFalse(): void {
    setTimeout(() => {
      this.loading.set(false);
    }, 100);
  }

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
