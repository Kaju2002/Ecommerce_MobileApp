
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
