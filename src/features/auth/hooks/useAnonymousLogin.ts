import { useState } from "react";
import { anonymousLogin } from "@/services/auth/anonymous/anonymous";

export function useAnonymousLogin() {
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuestLogin = async () => {
    try {
      setGuestLoading(true);
      setError(null);

      const response = await anonymousLogin();

      return response;
    } catch (err: any) {
      const message = err?.code || err?.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setGuestLoading(false);
    }
  };

  return {
    handleGuestLogin,
    guestLoading,
    error,
  };
}
