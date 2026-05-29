import { signInAnonymously } from "firebase/auth";
import { auth } from "../firebase/firebase";

export async function anonymousLogin() {
  const response = await signInAnonymously(auth);
  return response.user;
}
