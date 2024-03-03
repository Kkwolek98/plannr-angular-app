import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../components/inputs/button/button.component";
import { InputComponent } from "../../components/inputs/input/input.component";
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
  imports: [LayoutCardComponent, FormsModule, InputComponent, ReactiveFormsModule, ButtonComponent],
})
export class LoginComponent {
  form: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl("", { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl("", { nonNullable: true, validators: [Validators.required] }),
  });

  readonly authService = inject(AuthenticationService);

  login() {
    console.log(this.form.controls);
    if (this.form.invalid) {
      throw Error("Invalid login credentials");
    }

    this.authService.login$(this.form.value.email!, this.form.value.password!).subscribe({
      next: (res) => {
        console.log({ res });
      },
      error: (err) => {
        console.error({ err });
      },
    });
  }
}
