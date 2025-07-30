import React from 'react'
import {motion} from "motion/react"
import { useState } from 'react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { notificationAtom } from '../lib/atom';

const transition = {
    from:{opacity:0, y:-100},
    to:{opacity:1, y:0}
}
export default function Popup() {
    const [isVisible, setVisibility] = useState(false);
    const [notification, setNotification] = useAtom(notificationAtom);
    useEffect(() => {
        if (notification) {
            setVisibility(true);
            setTimeout(() => {
                setVisibility(false);
            }, 5000);    
        }

    },[notification])
  return (
    <motion.div initial={transition.from} animate={isVisible? transition.to:transition.from} transition={{type:"spring", duration:1}} className="fixed top-6 left-0 right-0 flex justify-center pointer-events-none z-50">
        <div className="bg-zinc-900/90 text-white p-5 rounded-lg w-11/12 sm:w-3/5 lg:w-[28%] shadow-black/60 shadow-2xl pointer-events-auto ring-1 ring-zinc-700/50">
      <h3 className='font-bold text-base mb-1'>{notification?.type}</h3>
      <p className='text-sm'>{notification?.message}</p>
        </div>
    </motion.div>
  )
}
