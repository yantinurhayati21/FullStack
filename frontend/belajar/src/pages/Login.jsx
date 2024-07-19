import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginResult, setLoginResult] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk mengambil data pengguna dari server
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fungsi untuk login
  const login = async (e) => {
    e.preventDefault();

    const dto = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      });

      if (response.ok) {
        const result = await response.json();
        setLoginResult(result.message);
        await fetchUser();
        navigate("/films"); // Arahkan pengguna ke halaman daftar film
      } else {
        const error = await response.json();
        setLoginResult(error.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Fungsi untuk logout
  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
      });
      setUser(null);
      setLoginResult("Successfully logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <h3 className="text-center text-gray-700">Login Result:</h3>
          <p className="text-center text-gray-900">{loginResult}</p>
        </div>
        {user ? (
          <div className="mt-4 text-center">
            <h3 className="text-gray-700">Welcome, {user.name}</h3>
            <button
              onClick={logout}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Please login to see user information</p>
            <Link
              to="/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
