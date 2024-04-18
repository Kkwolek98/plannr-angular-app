import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: "app-logged-in-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  templateUrl: "./logged-in-layout.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggedInLayoutComponent {}
