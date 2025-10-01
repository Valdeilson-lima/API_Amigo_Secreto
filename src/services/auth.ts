import { getToDay } from "../utils/getToDay";

export const validatePassword = (password: string): boolean => {
  const currentPassword = getToDay();
  return password === currentPassword;
};

export const generateToken = (): string => {
    const currentPassword = getToDay();
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
};


export const validateToken = (token: string): boolean => {
    const currentPassword = getToDay();
    const validToken = `${process.env.DEFAULT_TOKEN}${currentPassword}`;
    return token === validToken;
}
