import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ButtonComponent } from "@shared/inputs/button/button.component";
import { InputComponent } from "@shared/inputs/input/input.component";
import { NotificationsService } from "@shared/notifications/services/notifications.service";
import { UserService } from "@workout-builder/app/services/user.service";
import { UserDetails } from "@workout-builder/app/types/user/user-details";
import { UserDetailsEditForm } from "./types/forms";

@Component({
  selector: "app-user-details-page",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: "./user-details-page.component.html",
  styleUrl: "./user-details-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  private notificationsService = inject(NotificationsService);

  userDetails = signal(this.activatedRoute.snapshot.data["userDetails"] as UserDetails);
  form: FormGroup<UserDetailsEditForm> = new FormGroup({
    firstName: new FormControl(this.userDetails().firstName),
    lastName: new FormControl(this.userDetails().lastName),
    birthDate: new FormControl(this.userDetails().birthDate),
    weight: new FormControl(this.userDetails().weight),
    height: new FormControl(this.userDetails().height),
  });

  ngOnInit(): void {
    this.form.disable();
  }

  saveUserDetails(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    this.userService.updateCurrentUserDetails$(formValue as Partial<UserDetails>).subscribe({
      next: (res) => {
        this.form.setValue(res as Required<UserDetails>);
        this.form.disable();

        this.notificationsService.open({
          message: "User details updated",
          type: "success",
        });
      },
      error: (error) => {
        console.error(error);

        this.notificationsService.open({
          message: "User details update unsuccessful",
          type: "error",
        });
      },
    });
  }
}
