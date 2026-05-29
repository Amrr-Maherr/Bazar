import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

type SignupParams = {
  email: string;
  password: string;
};

export async function signupUser({ email, password }: SignupParams) {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response.user;
}
