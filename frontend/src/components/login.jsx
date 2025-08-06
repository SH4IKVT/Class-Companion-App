import axios from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../lib/atom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [log, setLog] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4080/login',
        {
          email, password
        }, {
        withCredentials: true
      });

      const data = await response.data;
      alert('Login successful!');
      setLog(true);
      setUser(data.user);
      //change it to the /dashboard
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      
      setError(err?.response?.data?.message || 'Failed to connect to the server. Please try again.');
    }
  };
  if (user) {
    return navigate('/dashboard');
  }
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fafafa] to-[#dce7dd] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black/5 shadow-xl shadow-gray-400/70 p-10 rounded-2xl w-full max-w-sm flex flex-col gap-4 "
      >
        <h2 className="text-black text-center text-xl font-bold">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg border text-black "
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded border text-black "
        />

        <button
          type="submit"
          className="py-2 px-4 rounded border shadow-md  text-white hover:bg-gray-200 transition"
        >
          Login
        </button>
      <p className="text-black/80 text-center">
        Don't have an account? <Link to="/signup" className="text-purple-400 ml-2 hover:underline">Sign Up</Link>
      </p>
      </form>

    </div>
  );
}

export default Login;