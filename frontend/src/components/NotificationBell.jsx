// src/components/NotificationBell.jsx
import { useState, useEffect } from "react";
import socket from "../socket";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.on("newAnnouncement", () => {
      setCount((c) => c + 1);
    });
    return () => socket.off("newAnnouncement");
  }, []);

  return (
    <div className="relative cursor-pointer">
      🔔
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full px-1 text-xs">
          {count}
        </span>
      )}
    </div>
  );
}
