import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import { useAtom } from "jotai";
import { userAtom } from "../lib/atom";

function Signup() {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfpassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reg,setReg]=useState(false);
    const [user, setUser] = useAtom(userAtom);
    
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setIsLoading(true);

        try {
            const res = await axios.post('http://localhost:4080/register', {
                 username, email, password 
            },{
                withCredentials: true
            });

            const data = res.data;
            console.log('Registration successful:', data);
            alert('Registration successful!');
                setReg(true);
                setUser(data.user);
                navigate('/home');
        } catch (err) {
            console.error('Registration failed:', err);
            setError(err?.response?.data?.message || 'Failed to connect to the server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    if (user) {
        return navigate('/home');
    }
    return (
        <div className="min-h-screen w-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-black shadow-[0_0_10px_#f0f,0_0_20px_#f0f] p-10 rounded w-full max-w-sm flex flex-col gap-4">
                <h2 className="text-white text-2xl font-bold text-center">Sign Up</h2>
                
                {error && (
                    <div className="text-red-500 text-center">{error}</div>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    required
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 rounded border text-white bg-transparent"
                />
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 rounded border text-white bg-transparent"
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-2 rounded border text-white bg-transparent"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfpassword(e.target.value)}
                    className="px-4 py-2 rounded border text-white bg-transparent"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="py-2 px-4 rounded border shadow-md bg-white text-black hover:bg-gray-200 transition disabled:opacity-50"
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                <p className="text-white text-center">
                    Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;