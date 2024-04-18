import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { ModalConfig } from "../types/types";

@Component({
  selector: "lib-modal-container",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./modal-container.component.html",
  styleUrl: "./modal-container.component.scss",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ModalContainerComponent<T> {
  @ViewChild("modalContainer", { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;
  protected modal?: ComponentRef<ModalComponent<T>>;
  protected config: ModalConfig = {
    hasBackdrop: true,
    hasCloseButton: true,
  };

  public setModal(modalType: typeof ModalComponent<T>): ComponentRef<ModalComponent<T>> {
    this.modal = this.modalContainer.createComponent(modalType);
    this.modal.instance.openStateChange.subscribe({ next: (state: boolean) => this.openStateChange(state) });

    return this.modal;
  }

  public setConfig(config: ModalConfig): void {
    this.config = { ...this.config, ...config };
  }

  protected openStateChange(isOpen: boolean): void {
    if (isOpen) {
      this.dialog.nativeElement.showModal();
    } else {
      this.dialog.nativeElement.close();
    }
  }
}
