
import type { AuthContextType, User } from "../contexts/AuthContext";

const mockUser: User = {
  id: "1",
  name: "Gayatri Dutta",
  email: "gayatri@example.com",
  darkMode: false,
};

export const mockAuth: AuthContextType = {
  user: mockUser,
  loading: false,

  login: async (email: string, password: string) => {
    console.log("Mock login:", { email, password });
    return Promise.resolve();
  },

  register: async (email: string, password: string, name: string) => {
    console.log("Mock register:", { email, password, name });
    return Promise.resolve();
  },

  logout: () => {
    console.log("Mock logout");
  },

  updateProfile: async (name: string, darkMode: boolean) => {
    console.log("Mock updateProfile:", { name, darkMode });
    return Promise.resolve();
  },
};
