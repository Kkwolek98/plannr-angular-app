import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public initToken(token: string): void {
    this.setToken(token);
  }

  public clearToken(): void {
    localStorage.removeItem("token");
  }

  private setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  private listenForActivity(): void {}
}
