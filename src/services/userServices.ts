import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserToken, NewUserData, UserLoginData, LoginData } from "@/protocols";
import { emailAlreadyInUseError, invalidLoginError } from "@/errors";
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

async function signIn(userData: UserLoginData): Promise<UserToken> {
  const userDb = await userRepository.findUserByEmail(userData.email);
  if (!userDb){
      throw invalidLoginError();
  }
  const correctPassword = await bcrypt.compare(userData.password, userDb.password);
  if (!correctPassword) {
      throw invalidLoginError();
  }
  const token = await setTokenSession(userDb.id);
  return ({
    user: {id: userDb.id, email:userDb.email},
    token
  });
}

async function setTokenSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  const session : LoginData = { userId, token };
  await userRepository.newSession(session);
  return token;
}

export const userService = {
  signUp,
  signIn,
};