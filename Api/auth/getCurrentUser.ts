import { User } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
