import { RegisterFormData } from "../../utils/types";

export class RegistrationFetch {
  private url: string = "/api/auth/register"

  public async registerUser(formData: RegisterFormData): Promise<boolean> {
    try {
      const response: Response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return response.ok;
    } catch (error) {
      console.error("Something went wrong: ", error);
      return false;
    }
  }
}