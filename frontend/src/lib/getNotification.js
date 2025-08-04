import axios from "axios";

const getNotifications = async (user, setNotificationsArr, setBellCount) => {    
    if (user && user.type === 'student') {
        
        try {
            const res = await axios.get('http://localhost:4080/notifications', {
                withCredentials: true
            })
            
            setNotificationsArr(res?.data.notifications);
            setBellCount(res?.data?.bellCount);

        } catch (error) {
            console.log(error);

        }
    }

}
export default getNotifications