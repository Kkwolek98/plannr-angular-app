import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TopNavComponent } from "./components/top-nav/top-nav.component";

@Component({
  selector: "app-layout",
  standalone: true,
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TopNavComponent, CommonModule],
})
export class LayoutComponent {}
