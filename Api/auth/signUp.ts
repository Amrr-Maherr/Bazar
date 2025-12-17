import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
