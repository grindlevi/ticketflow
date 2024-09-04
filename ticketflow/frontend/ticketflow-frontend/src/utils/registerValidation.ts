export const validateUsernameLength = (username: string): boolean => {
  return username.length > 6;
};

export const checkIfPasswordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const checkIfPasswordContainsLowerCaseLetter = (password: string): boolean => {
  return /[a-z]/.test(password);
};

export const checkIfPasswordContainsUpperCaseLetter = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

export const checkIfPasswordContainsNumber = (password: string): boolean => {
  return /[0-9]/.test(password);
};