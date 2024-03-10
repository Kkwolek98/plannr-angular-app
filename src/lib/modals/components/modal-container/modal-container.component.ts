import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-modal-container",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./modal-container.component.html",
  styleUrl: "./modal-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent {}
