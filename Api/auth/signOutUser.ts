import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const signOutUser = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
