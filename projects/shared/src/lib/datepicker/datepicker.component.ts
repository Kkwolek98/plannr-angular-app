import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonComponent } from "../../public-api";

@Component({
  selector: "lib-datepicker",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: "./datepicker.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {}
