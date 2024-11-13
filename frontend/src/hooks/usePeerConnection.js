import { useEffect, useState } from "react";


let peerConnection;
const usePeerConnection = (socketConnection, peerConfiguration, userName) => {
    const [offers, setOffers] = useState([]);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    let didIOffer = false;

    useEffect(() => {
        if (socketConnection) {
            peerConnection = new RTCPeerConnection(peerConfiguration);
            socketConnection.on('availableOffers', (offers) => setOffers(offers));
            socketConnection.on('newOfferAwaiting', (offers) => setOffers(offers));
            socketConnection.on('answerResponse', addAnswer);
            socketConnection.on('receivedIceCandidateFromServer', (iceCandidate) => {
                peerConnection.addIceCandidate(iceCandidate);
            });
            return () => socketConnection.disconnect();
        }
    }, [socketConnection])

    const fetchUserMedia = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setLocalStream(stream);
            return stream;
        } catch (err) {
            console.error('Error accessing user media:', err);
            return null;
        }
    };

    const createPeerConnection = async (localStream, offerObj) => {
        if (!localStream) return console.error('Local stream is not available.');

        peerConnection = new RTCPeerConnection(peerConfiguration);
        const newRemoteStream = new MediaStream();
        setRemoteStream(newRemoteStream);

        localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
        peerConnection.addEventListener('icecandidate', (e) => {
            if (e.candidate && socketConnection) {
                socketConnection.emit('sendIceCandidateToSignalingServer', {
                    iceCandidate: e.candidate,
                    iceUserName: userName,
                    didIOffer,
                });
            }
        });

        peerConnection.addEventListener('track', (e) => {
            e.streams[0].getTracks().forEach((track) => newRemoteStream.addTrack(track));
        });

        if (offerObj) {
            await peerConnection.setRemoteDescription(offerObj.offer);
        }
    };

    const addAnswer = async (offerObj) => {
        if (peerConnection) {
            await peerConnection.setRemoteDescription(offerObj.answer);
        }
    };

    const answer = async (offerObj) => {
        const stream = await fetchUserMedia();
        if (stream) {
            await createPeerConnection(stream, offerObj);
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            offerObj.answer = answer;
            didIOffer = false;
            const offerIceCandidates = await socketConnection.emitWithAck('newAnswer', offerObj);
            console.log(offerIceCandidates)

            offerIceCandidates.forEach((c) => peerConnection.addIceCandidate(c));
        }
    };

    const call = async () => {
        const stream = await fetchUserMedia();
        if (stream) {
            await createPeerConnection(stream);
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            didIOffer = true;
            socketConnection.emit('newOffer', offer);
        }
    };

    return {
        call,
        answer,
        offers,
        localStream,
        remoteStream,
    }
}

export default usePeerConnection;