import { Injectable, inject } from "@angular/core";
import { ModalComponent } from "../components/modal/modal.component";
import { ModalCreationService } from "./modal-creation.service";

@Injectable({
  providedIn: "root",
})
export class ModalsService {
  private readonly modalCreationService = inject(ModalCreationService);

  public newModal<T>(modalType: typeof ModalComponent, data: T): ModalComponent<T> {
    const modalContainer = this.modalCreationService.createModalContainer();
    const modal = modalContainer.instance.setModal(modalType);
    modal.instance.data = data;
    modal.instance.open();

    modal.changeDetectorRef.detectChanges();

    return modal.instance as ModalComponent<T>;
  }
}
