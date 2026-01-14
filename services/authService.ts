// Reset Password API
export const resetPassword = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/user/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Reset Password Service Error:", error);
    throw error;
  }
};
// Resend Reset OTP API
export const resendResetOtp = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/user/resend-reset-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Resend Reset OTP Service Error:", error);
    throw error;
  }
};
// Verify Reset OTP API
export const verifyResetOtp = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/user/verify-reset-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Verify Reset OTP Service Error:", error);
    throw error;
  }
};
// Forgot Password API
export const forgotPassword = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/user/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Forgot Password Service Error:", error);
    throw error;
  }
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUser = async ({
  name,
  email,
  password,
  confirmPassword,
}: RegisterParams): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Register Service Error:", error);
    throw error;
  }
};

export const loginUser = async ({
  email,
  password,
}: LoginParams): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
};
