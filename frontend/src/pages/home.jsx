import { useLocation } from "react-router-dom"
import Login from "../components/login";
import Signup from "../components/signup";

export default function Home() {
    const location = useLocation();
    if (location.pathname === '/login') {
        <Login />
    } else {
        <Signup />
    }
    return (
        <div>
            hello Home
        </div>
    )
}