import { RegisterFormData } from "../../utils/types";

export class RegisterValidator {
  private registerFormData: RegisterFormData
  private lowerCaseLetters: RegExp = /[a-z]/g
  private upperCaseLetters: RegExp = /[A-Z]/g
  private numbers: RegExp = /[0-9]/g

  constructor(registerFormData: RegisterFormData){
    this.registerFormData = registerFormData
  }

  public validateUsernameLength(): boolean {
    return this.registerFormData.username.length > 6;
  }

  public checkIfPasswordsMatch(): boolean {
    return this.registerFormData.password === this.registerFormData.confirmPassword
  }

  public checkIfPasswordContainsLowerCaseLetter(): boolean {
    return this.lowerCaseLetters.test(this.registerFormData.password)
  }

  public checkIfPasswordContainsUpperCaseLetter(): boolean {
    return this.upperCaseLetters.test(this.registerFormData.password)
  }
  
  public checkIfPasswordContainsNumber(): boolean {
    return this.numbers.test(this.registerFormData.password)
  }

}