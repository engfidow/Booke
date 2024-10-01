import { useCookies } from "react-cookie";

export const useAuth = () => {
  const [cookies] = useCookies(["token"]);
  
  // Check if the token exists in the cookies
  const isAuthenticated = () => !!cookies.token;

  // You can also return other useful functions like `logout`, `getUser`, etc.
  return { isAuthenticated, token: cookies.token };
};
