import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { InactivityService } from "./services/inactivity.service";
import { JwtService } from "./services/jwt.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  private readonly jwtService = inject(JwtService);
  private readonly inactivityService = inject(InactivityService);
  private readonly authenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    const token = this.jwtService.getToken();
    if (!token) {
      return;
    }
    this.inactivityService.startListening(token);
    this.authenticationService.waitForLogout();
  }
}
