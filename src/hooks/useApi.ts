// src/hooks/useApi.ts
import { useAuth } from "../context/authcontext";


const BASE_URL = "https://drdrills.achillesdrill.com";
export const useApi = () => {
  const { token, logout } = useAuth();

  const apiFetch = async (url: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });

      if (response.status === 401) {
        logout();
        throw new Error("Session expired. Please log in again.");
      }

      return response;
    } catch (err) {
      console.error("API Fetch Error:", err);
      throw err;
    }
  };

  return { apiFetch };
};
