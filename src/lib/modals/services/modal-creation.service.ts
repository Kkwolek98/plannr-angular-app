import { ApplicationRef, ComponentRef, Injectable, createComponent, inject } from "@angular/core";
import { ModalContainerComponent } from "../components/modal-container/modal-container.component";

@Injectable({
  providedIn: "root",
})
export class ModalCreationService {
  private readonly appRef = inject(ApplicationRef);

  public createModalContainer<T>(): ComponentRef<ModalContainerComponent<T>> {
    const componentRef = createComponent(ModalContainerComponent<T>, {
      environmentInjector: this.appRef.injector,
    });

    document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();

    return componentRef;
  }
}
