import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";



 const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children})=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([]);
    const {authUser} = useAuthContext();
    const supplierId = localStorage.getItem('supplierid')
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const apiURL = import.meta.env.VITE_API_URL;
    const [userId,setUserId] = useState(authUser||adminId||supplierId)
    useEffect(() => {
        if (userId) {
            const socket = io(apiURL, {
                query: {
                    userId: userId
                }
            });
            setSocket(socket);
    
            socket.on("getOnlineUsers", (users) => { 
                setOnlineUsers(users);
            });
    
            // Close socket connection when component unmounts or userId changes
            return () => socket.close();
        } else {
            // Handle case where userId is not available or invalid
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [userId]);
    

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}