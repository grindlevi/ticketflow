import { useState } from "react";
import { RegisterFormData } from "../utils/types";
import {
  validateUsernameLength,
  checkIfPasswordsMatch,
  checkIfPasswordContainsLowerCaseLetter,
  checkIfPasswordContainsUpperCaseLetter,
  checkIfPasswordContainsNumber,
} from "../utils/registerValidation";

const useRegistration = (onRegisterSuccess: () => void) => {
  const [passwordAlert, setPasswordAlert] = useState<boolean>(false);

  const handleSubmit = async (formData: RegisterFormData) => {
    const isValid =
      validateUsernameLength(formData.username) &&
      checkIfPasswordsMatch(formData.password, formData.confirmPassword) &&
      checkIfPasswordContainsLowerCaseLetter(formData.password) &&
      checkIfPasswordContainsUpperCaseLetter(formData.password) &&
      checkIfPasswordContainsNumber(formData.password);

    if (!isValid) {
      setPasswordAlert(true);
      return;
    }

    try {
      const response: Response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onRegisterSuccess();
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  return {
    handleSubmit,
    passwordAlert,
  };
};

export default useRegistration;