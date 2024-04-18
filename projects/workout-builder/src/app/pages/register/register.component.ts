import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../../../../shared/src/lib/inputs/button/button.component";
import { InputComponent } from "../../../../../shared/src/lib/inputs/input/input.component";
import { LayoutCardComponent } from "../../components/layout-card/layout-card.component";
import { AuthenticationService } from "../../services/authentication.service";
import { fieldsEqual } from "../../validators/fields-equal.validator";

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

@Component({
  selector: "app-register",
  standalone: true,
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  imports: [LayoutCardComponent, FormsModule, InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
})
export class RegisterComponent {
  private readonly authService = inject(AuthenticationService);

  protected form: FormGroup<RegisterForm> = new FormGroup(
    {
      email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
      repeatPassword: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8)],
      }),
    },
    { validators: fieldsEqual("password", "repeatPassword") }
  );

  register() {
    if (this.form.invalid) {
      throw Error("Invalid login credentials");
    }

    this.authService.register$(this.form.value.email!, this.form.value.password!).subscribe({
      next: () => {},
      error: (err) => {
        console.error({ err });
      },
    });
  }
}
