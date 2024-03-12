import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent<DataType = undefined, ReturnDataType = undefined> {
  public get isOpen(): boolean {
    return this._isOpen;
  }

  public data?: DataType;

  private _isOpen: boolean = false;
  protected _closedSubject$: Subject<ReturnDataType> = new Subject();

  public closed$: Observable<ReturnDataType> = this._closedSubject$.asObservable();

  public open(): void {
    this._isOpen = true;
    this.openStateChange.emit(this._isOpen);
  }

  public close(returnData?: ReturnDataType): void {
    this._isOpen = false;
    if (returnData) {
      this._closedSubject$.next(returnData);
    }
    this.openStateChange.emit(this._isOpen);
  }

  public toggle(): void {
    this._isOpen = !this._isOpen;
    this.openStateChange.emit(this._isOpen);
  }

  @Output() openStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
