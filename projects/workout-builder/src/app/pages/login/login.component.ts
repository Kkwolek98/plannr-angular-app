import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../../../../shared/src/lib/inputs/button/button.component";
import { InputComponent } from "../../../../../shared/src/lib/inputs/input/input.component";
import { LayoutCardComponent } from "../../components/layout-card/layout-card.component";
import { AuthenticationService } from "../../services/authentication.service";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  imports: [LayoutCardComponent, FormsModule, InputComponent, ReactiveFormsModule, ButtonComponent, RouterLink],
})
export class LoginComponent {
  private readonly authService = inject(AuthenticationService);

  protected form: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
  });

  login() {
    if (this.form.invalid) {
      throw Error("Invalid login credentials");
    }

    this.authService.login$(this.form.value.email!, this.form.value.password!).subscribe({
      next: () => {},
      error: (err) => {
        console.error({ err });
      },
    });
  }
}
