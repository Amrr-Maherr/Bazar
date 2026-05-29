import { useState } from "react";
import { signupUser } from "@/services/auth/signup/signup";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await signupUser({ email, password });

      if (response) {
        setSuccess("Account created successfully");
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
    handleSignup,
    loading,
    error,
    success,
  };
}
