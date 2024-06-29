import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenNotification = () => {
    const { socket } = useSocketContext();
    const { notification, setNotification } = useConversation();

    useEffect(() => {
        const handleNewNotification = (newNotification) => {
            setNotification([...notification, newNotification]);
        };

        socket?.on('newNotification', handleNewNotification);

        return () => {
            socket?.off('newNotification', handleNewNotification);
        };
    }, [socket, setNotification, notification]);
}

export default useListenNotification;
