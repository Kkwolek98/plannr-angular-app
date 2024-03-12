import { Injectable, inject } from "@angular/core";
import { ModalComponent } from "../components/modal/modal.component";
import { ModalConfig } from "../components/types/types";
import { ModalCreationService } from "./modal-creation.service";

@Injectable({
  providedIn: "root",
})
export class ModalsService {
  private readonly modalCreationService = inject(ModalCreationService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public newModal<T extends ModalComponent<any, any>>(modalType: new () => T, modalConfig: ModalConfig): T {
    const modalContainer = this.modalCreationService.createModalContainer();
    modalContainer.instance.setConfig(modalConfig);
    const modal = modalContainer.instance.setModal(modalType);
    modal.instance.open();

    modal.changeDetectorRef.detectChanges();

    return modal.instance as T;
  }
}
