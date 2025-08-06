import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { notificationAtom, userAtom } from '../lib/atom';
import { IoNotificationsSharp } from "react-icons/io5";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import NotificationRenderer from './notificationRenderer';
import connectSocket from '../lib/connectSocket';
import getNotifications from '../lib/getNotification';
import { GraduationCap } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const [notification, setNotification] = useAtom(notificationAtom);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationsArr, setNotificationsArr] = useState([]);
    const [bellCount, setBellCount] = useState(0);
    const [scope, animate] = useAnimate();
    const socketRef = useRef(null);

    const loginHandle = () => navigate('/login');
    const logoutHandle = async () => {
        try {
            await axios.get('http://localhost:4080/logout', { withCredentials: true });
            alert('Logout successful');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!user) {
            setNotificationsArr([]);
            setNotificationOpen(false);
        }
    }, [user]);
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get('http://localhost:4080', { withCredentials: true });
                setUser(res?.data?.user);
            } catch (error) {
                console.log(error);
            }
        };
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        checkUser();
    }, []);

    useEffect(() => {
        if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
            socketRef.current = connectSocket(setNotification, setNotificationsArr, setBellCount, setNotificationOpen);
        }
        getNotifications(user, setNotificationsArr, setBellCount);
        return () => {
            if (socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
        };
    }, [user]);

    useEffect(() => {
        if (bellCount > 0 && scope.current) {
            animate(scope.current, {
                rotate: [0, -10, 10, -10, 10, -10, 0],
                transition: { duration: 0.5 },
            });
        }
    }, [bellCount, animate, scope]);

    const navLinkClass = ({ isActive }) =>
        `!text-white font-medium hover:!text-yellow-300 transition-colors duration-200 border-b-2 ${
            isActive ? 'border-yellow-300' : 'border-transparent'
        }`;

    return (
        <nav className="sticky top-0 px-3 shadow-yellow-300 bg-purple-900 w-screen z-50">
            <div className="flex justify-between p-4 items-center">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-3 !text-white font-medium">
                    <GraduationCap className="w-7 h-7 text-orange-500" />
                    <h2 className="text-xl">Class Companion</h2>
                </NavLink>

                {/* Navigation Links */}
                <ul className="flex gap-8 items-center">
                    {(user?.type === 'teacher' || user?.type === 'student') && (
                        <>
                            <li><NavLink to="/notes" className={navLinkClass}>Notes</NavLink></li>
                            <li>
                                <NavLink
                                    to={user?.type === 'teacher' ? "/teacher/assignments" : "/student/assignments"}
                                    className={navLinkClass}
                                >
                                    Assignments
                                </NavLink>
                            </li>
                            <li><NavLink to="/announcements" className={navLinkClass}>Announcements</NavLink></li>
                            <li><NavLink to="/doubts" className={navLinkClass}>Doubts</NavLink></li>
                            <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
                        </>
                    )}
                </ul>

                {/* User Controls */}
                <div className="flex items-center gap-5">
                    {!user ? (
                        <button className="text-white font-medium hover:text-yellow-300" onClick={loginHandle}>
                            Login
                        </button>
                    ) : (
                        <>
                            <button className="text-white font-medium hover:text-yellow-300" onClick={logoutHandle}>
                                Log out
                            </button>
                            <span
                                onClick={() => setNotificationOpen((prev) => !prev)}
                                className="hover:bg-purple-950/20 rounded-xl p-2 cursor-pointer"
                            >
                                <motion.div ref={scope} whileHover={{ scale: 1.04 }} className="relative">
                                    <IoNotificationsSharp size={30} className="text-white" />
                                    <span className="text-white text-sm absolute rounded-full w-5 h-5 bg-black/60 p-[2px] flex justify-center items-center right-0 top-3 font-extrabold">
                                        {bellCount}
                                    </span>
                                </motion.div>
                            </span>
                        </>
                    )}
                    <NotificationRenderer
                        setBellCount={setBellCount}
                        setNotificationsArr={setNotificationsArr}
                        notificationOpen={notificationOpen}
                        notificationsArr={notificationsArr}
                    />
                </div>
            </div>
        </nav>
    );
}
