import { useState, useEffect } from 'react';
import { MOCK_USERS } from './adminData';

export function useSession() {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  
  useEffect(() => {
    // Simulate network authentication lookup
    setTimeout(() => setStatus("authenticated"), 300);
  }, []);

  return {
    data: status === "authenticated" ? { user: MOCK_USERS[0] } : null, // MOCK_USERS[0] is "Budi Santoso"
    status
  };
}
