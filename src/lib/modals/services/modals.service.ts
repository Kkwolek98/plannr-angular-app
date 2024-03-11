import { Injectable, inject } from "@angular/core";
import { ModalComponent } from "../components/modal/modal.component";
import { ModalConfig } from "../components/types/types";
import { ModalCreationService } from "./modal-creation.service";

@Injectable({
  providedIn: "root",
})
export class ModalsService {
  private readonly modalCreationService = inject(ModalCreationService);

  public newModal(modalType: typeof ModalComponent, modalConfig?: ModalConfig): ModalComponent {
    const modalContainer = this.modalCreationService.createModalContainer();
    if (modalConfig) {
      modalContainer.instance.setConfig(modalConfig);
    }
    const modal = modalContainer.instance.setModal(modalType);
    modal.instance.open();

    modal.changeDetectorRef.detectChanges();

    return modal.instance as ModalComponent;
  }
}
