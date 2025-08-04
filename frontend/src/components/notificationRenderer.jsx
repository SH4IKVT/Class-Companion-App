import React from 'react'
import { motion } from 'motion/react'
import axios from 'axios';

export default function NotificationRenderer({ notificationOpen, notificationsArr, setNotificationsArr }) {
    const handleMarkAsRead = async (e, notification) => {
        e.stopPropagation();
        try {
            const id = notification._id
            if (!notification.isRead) {
                await axios.get(`http://localhost:4080/notifications?notificationId=${id}&action=markAsRead`, {
                    withCredentials: true
                })
                const updatedNotifications = notificationsArr.map((notification) => {
                    if (notification._id === id) {
                        return { ...notification, isRead: true };
                    }
                    return notification;
                });
                setNotificationsArr(updatedNotifications);
            }
            // push notification to dedicated page
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {notificationOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="absolute w-[400px] right-0 top-16 bg-zinc-800/80 pt-2 pb-4 px-3 rounded-xl shadow-zinc-950 shadow-xl border-zinc-800/65 border-2 z-20 flex flex-col justify-center gap-2"
                >
                    <h2 className="font-bold text-xl py-2 text-white/80 ">Notifications</h2>
                    <div className='flex flex-col gap-3 max-h-[70vh] overflow-y-scroll py-2 pr-2 pl-1'>
                        {
                            notificationsArr.length ? notificationsArr.map((notification, index) => {
                                const formatted = new Date(notification.createdAt).toLocaleString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour12: true,
                                });
                                return (
                                    <motion.div whileHover={{ translateY: '-2px', scale: 1.01 }} initial={{ opacity: 0, y: 10 }}
                                        viewport={{ once: true }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        onClick={e => { handleMarkAsRead(e, notification) }} key={index} className={`cursor-pointer border  p-2 px-3 rounded-md  hover:shadow-zinc-900 hover:shadow-lg transition-shadow duration-300 ${notification.isRead
                                            ? 'border-zinc-700'
                                            : 'border-0 border-l-4 border-blue-400 bg-zinc-900 hover:bg-zinc-800'
                                            }`}>
                                        <h3 className="text-white font-semibold text-sm md:text-base">{notification.type}</h3>
                                        <p className="text-sm text-white/80">{notification.message}</p>
                                        <p className="text-xs text-zinc-400 pt-1">
                                            {formatted}</p>
                                    </motion.div>
                                )
                            }) :
                                <div className=" h-[20vh] flex justify-center items-center">
                                    <h3 className="font-bold text-sm text-white/50">No notifications found</h3>
                                </div>
                        }
                    </div>
                </motion.div>
            )}
        </>
    )
}
