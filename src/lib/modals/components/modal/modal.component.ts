import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent<T> {
  private _isOpen: boolean = false;

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public data?: T;

  public open(): void {
    this._isOpen = true;
    this.openStateChange.emit(this._isOpen);
  }

  public close(): void {
    this._isOpen = false;
    this.openStateChange.emit(this._isOpen);
  }

  public toggle(): void {
    this._isOpen = !this._isOpen;
    this.openStateChange.emit(this._isOpen);
  }

  @Output() openStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
