import { sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
