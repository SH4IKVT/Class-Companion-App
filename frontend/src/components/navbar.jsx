import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar() {
    const Navigate = useNavigate();

    const loginHandle = () => {
        Navigate('/login');
    }
    const signupHandle = () => {
        Navigate('/signup');
    }

    return (
        <nav className="sticky top-0 shadow-yellow-300 bg-purple-900 w-screen">
            <div className="flex gap-10 justify-between p-4 items-center">
                <div className="flex items-center">
                    <h3 className="font-serif text-2xl text-black ml-20 flex items-center gap-1">
                        Study-Share

                    </h3>
                </div>
                <div className="flex items-center ">
                    <ul className="flex gap-10 list-none ">
                        <li ><Link to="" ><span className="flex items-center gap-1 text-black">Notes</span> </Link></li>
                        <li><Link to="" ><span className="flex items-center gap-1 text-black">Doubts</span> </Link></li>
                        <li><Link to="" ><span className="flex items-center gap-1 text-black">Dashboard</span> </Link></li>
                        <li><Link to="" ><span className="flex items-center gap-1 text-black">Notifications</span> </Link></li>

                    </ul>
                </div>
                <div className="flex items-center ">
                    <button className='gap-2 shadow-sm mr-5' onClick={loginHandle}> Login</button>
                    <button className='gap-2 shadow-sm mr-5' onClick={signupHandle}> Sign Up</button>


                </div>
            </div>
        </nav>
    );
}
