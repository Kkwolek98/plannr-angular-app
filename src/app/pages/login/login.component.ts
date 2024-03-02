import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "../../components/inputs/input/input.component";
import { LayoutCardComponent } from "../../components/layout-card/layout-card.component";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  imports: [LayoutCardComponent, FormsModule, InputComponent, ReactiveFormsModule],
})
export class LoginComponent {
  public form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
}
