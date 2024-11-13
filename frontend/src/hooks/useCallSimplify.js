import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import usePeerConnection from './usePeerConnection';


const useCallSimplify = ({ userName, isScreenShare, withAudio }) => {
    const [socket, setSocket] = useState(null);
    const { answer, call, offers, localStream, remoteStream } = usePeerConnection(socket, {
        iceServers: [
            { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
        ],
    }, { userName, screenShare: isScreenShare, withAudio });


    useEffect(() => {
        if (userName) {
            const socketConnection = io.connect('http://127.0.0.1:5000/', {
                auth: { userName, password: 'x' },
            });
            setSocket(socketConnection);
        }
    }, [userName]);

    return { offers, call, answer, localStream, remoteStream };
};

export default useCallSimplify;
