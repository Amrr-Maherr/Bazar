import { useState } from "react";
import { loginUser } from "@/services/auth/login/login";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await loginUser({ email, password });

      if (response) {
        setSuccess("Login successful");
      }

      return response;
    } catch (err: any) {
      const message = err?.code || err?.message || "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    loading,
    error,
    success,
  };
}
