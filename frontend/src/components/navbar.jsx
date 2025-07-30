import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { notificationAtom, userAtom } from '../lib/atom';
import { IoNotificationsSharp } from "react-icons/io5";
import { AnimatePresence, motion, useAnimate } from "motion/react"
import NotificationRenderer from './notificationRenderer';
import connectSocket from '../lib/connectSocket';
import getNotifications from '../lib/getNotification';

export default function Navbar() {
    const Navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const [notification, setNotification] = useAtom(notificationAtom);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationsArr, setNotificationsArr] = useState([]);
    const [bellCount, setBellCount] = useState(0);
    const [scope, animate] = useAnimate();
    const socketRef = useRef(null);
    const loginHandle = () => {
        Navigate('/login');
    }
    const logoutHandle = async () => {
        try {
            await axios.get('http://localhost:4080/logout', {
                withCredentials: true
            })
            alert('Logout successful');
            setUser(null);
            Navigate('/');
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await axios.get('http://localhost:4080', {
                    withCredentials: true
                })
                setUser(res?.data?.user);
            } catch (error) {
                console.log(error);

            }
        }
        if("Notification" in window && Notification.permission !== "granted") {
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
        }
    }, [user])
    useEffect(()=>{
        if (bellCount > 0 &&scope.current) {
            animate(scope.current,{
                rotate:[0, -10, 10, -10, 10, -10, 0],
                transition: {
                    duration: 0.5,
                }
            })
        }
        
    },[bellCount,animate,scope])
    return (
        <nav className="absolute top-0 shadow-yellow-300 bg-purple-900 w-screen">
            <div className="flex gap-10 justify-between p-4 items-center">
                <div className="flex items-center">
                    <Link to={'/'}><h3 className="font-serif text-2xl text-white/90 font-bold ml-20 flex items-center gap-1">
                        Study-Share

                    </h3></Link>
                </div>
                <div className="flex items-center ">
                    <ul className="flex gap-10 list-none ">
                        <li ><Link to="" ><span className="flex items-center gap-1 text-black">Notes</span> </Link></li>
                        <li><Link to="" ><span className="flex items-center gap-1 text-black">Doubts</span> </Link></li>
                        <li><Link to="" ><span className="flex items-center gap-1 text-black">Dashboard</span> </Link></li>
                        <li><Link to="/notification" ><span className="flex items-center gap-1 text-black">Notifications</span> </Link></li>

                    </ul>
                </div>
                {
                    !!!user ?
                        <div className="flex items-center ">
                            <button className='gap-2 shadow-sm mr-5' onClick={loginHandle}> Login</button>
                        </div> :
                        <div className="flex items-center ">
                            <button className='gap-2 shadow-sm mr-5' onClick={logoutHandle}> Log out</button>
                            <span onClick={e => setNotificationOpen(prev => !prev)} className='hover:bg-purple-950/20 rounded-xl p-2 cursor-pointer'>
                                <motion.div ref={scope} whileHover={{ scale: 1.04 }} className='relative'>
                                    <IoNotificationsSharp size={30} className='text-white' />
                                    <span className=' text-white text-sm absolute rounded-full w-5 h-5 bg-black/60 p-[2px] flex justify-center items-center right-0 top-3 font-extrabold'>{bellCount}</span>
                                </motion.div>
                            </span>
                        </div>
                }
                <NotificationRenderer setBellCount={setBellCount} setNotificationsArr={setNotificationsArr} notificationOpen={notificationOpen} notificationsArr={notificationsArr} />
            </div>

        </nav>
    );
}
