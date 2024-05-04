import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({
  name: "libTime",
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    return this.createOutput(hours, minutes, seconds);
  }

  private createOutput(hours: number, minutes: number, seconds: number): string {
    let output: string = "";

    if (hours) {
      output += `${hours}hr `;
    }

    if (minutes) {
      output += `${minutes}m `;
    }

    if (seconds) {
      output += `${seconds}s `;
    }

    return output.trim();
  }
}
