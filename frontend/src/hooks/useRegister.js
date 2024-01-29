export default function useRegister() {
  const API_URL = "http://localhost:5000/api/user/register";

  const register = async (username, password) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    console.log(response.status);
  };

  return { register };
}
