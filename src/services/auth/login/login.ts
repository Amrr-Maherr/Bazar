import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

type LoginParams = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: LoginParams) {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response.user;
}
