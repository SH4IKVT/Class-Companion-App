import { Link,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom } from '../lib/atom';

export default function Navbar() {
    const Navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    const loginHandle = () => {
        Navigate('/login');
    }
    const logoutHandle = async() => {
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
        checkUser();
    }, []);
    useEffect(() => {
        console.log(user);
        
    },[user])
    return (
        <nav className="sticky top-0 shadow-yellow-300 bg-purple-900 w-screen">
            <div className="flex gap-10 justify-between p-4 items-center">
                <div className="flex items-center">
                    <Link to={'/'}><h3 className="font-serif text-2xl text-white/90 font-bold ml-20 flex items-center gap-1">
                        Study-Share

                    </h3></Link>
                </div>
                <div className="flex items-center ">
                    <ul className="flex gap-10 list-none ">
                        <li ><Link to="" ><span className="flex items-center gap-1 text-black">Notes</span> </Link></li>
                        <li><Link to="/doubts"><span className="flex items-center gap-1 text-black">Doubts</span></Link></li>
                         <li><Link to="" ><span className="flex items-center gap-1 text-black">Dashboard</span> </Link></li>
                        <li><Link to="" ><span className="flex items-center gap-1 text-black">Notifications</span> </Link></li>

                    </ul>
                </div>
                {
                    !!!user?
                    <div className="flex items-center ">
                    <button className='gap-2 shadow-sm mr-5' onClick={loginHandle}> Login</button>
                </div>:
                <div className="flex items-center ">
                    <button className='gap-2 shadow-sm mr-5' onClick={logoutHandle}> Log out</button>
                </div>
                }
            </div>
        </nav>
    );
}
