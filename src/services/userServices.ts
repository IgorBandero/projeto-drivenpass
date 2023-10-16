import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NewUserData } from "@/protocols";
import { emailAlreadyInUseError } from "@/errors";
import { userRepository } from '@/repositories';

export async function signUp(newUser: NewUserData): Promise<User> {
  await validateEmail(newUser.email);
  const cryptedPassword = await bcrypt.hash(newUser.password, 10);
  return userRepository.registerNewUser({email: newUser.email, password: cryptedPassword});
}

async function validateEmail(email: string) {
  const registeredUser = await userRepository.findUserByEmail(email);
  if (registeredUser) {
    throw emailAlreadyInUseError();
  }
}

export const userService = {
  signUp,
};