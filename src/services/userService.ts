import { API_BASE_URL } from "../constants"
import type { User } from "../pages/profile/Profile";

export const getUserData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        return (await response.json()) as User;
      } catch (error) {
        console.error('Errore nel caricamento dell utente:', error);
        return null;
      }
}