import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [log, setLog] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);
      alert('Login successful!');
      if (data) {
        setLog(true);
        //change it to the /dashboard
        navigate('/home')
      }
      // Save token/user to localStorage/context here
      localStorage.setItem('token', data.token);

    } catch (err) {
      console.error('Login failed:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-black shadow-[0_0_10px_#f0f,0_0_20px_#f0f] p-10 rounded w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-white text-center text-xl font-bold">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded border text-white bg-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded border text-white bg-gray-800"
        />

        <button
          type="submit"
          className="py-2 px-4 rounded border shadow-md  text-black hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;