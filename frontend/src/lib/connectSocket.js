const retryLimit = 5;
let retryCount = 0;

const connectSocket = async (setNotification, setNotificationArr, setBellCount, setNotificationOpen) => {
    const wss = new WebSocket('ws://localhost:4080');

    wss.onopen = () => {
        retryCount = 0;
        console.log('Connected to WebSocket server');
    };

    wss.onmessage = (event) => {
        const data = JSON.parse(event.data); 
        setNotification(data);
        let isNew = false;
        console.log(data);
        
        setNotificationArr(prev => {
    const isNew = prev.length === 0 || prev[prev.length - 1]._id !== data._id;

    if (isNew) {
        const updatedArr = [...prev, data];
        setBellCount(updatedArr.length);
        console.log(updatedArr);
        return updatedArr;
    }

    return prev;
});
        if (Notification.permission === 'granted') {
            const browserNotification = new Notification(data.type || 'New Notification', {
                body: data.message,
            });
            browserNotification.onclick = () => {
                window.focus();
                setNotificationOpen(true);
                browserNotification.close();
            };
        }
    };

    wss.onclose = async () => {
        if (retryCount < retryLimit) {
            const delay = 2000 * Math.pow(2, retryCount);
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, delay));
            connectSocket(setNotification, setNotificationArr, setBellCount, setNotificationOpen);
        } else {
            console.log('WebSocket connection closed');
        }
    };

    wss.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return wss;
};

export default connectSocket;
