import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add auth check with Supabase later
    navigate("/dashboard"); // ✅ Redirect to dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to Drive Clone
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 text-gray-700 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-200 rounded-lg shadow-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span className="font-semibold text-indigo-600 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
