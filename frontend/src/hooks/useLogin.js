import { useNavigate } from "react-router-dom";

export default function useLogin({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/user/login";

  const login = async (email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);

        setIsAuthenticated(true);

        navigate("/");
      } else {
        const error = await response.json();
        alert(error.message);
        console.error("An error occurred while logging in: ", error);
      }
    } catch (error) {
      console.error("An error occurred while logging in: ", error);
    }
  };
  return { login };
}
