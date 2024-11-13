const ChatRepository = require("./ChatRepository");

class ChatService {


    constructor(server) {
        this.chatRepository = new ChatRepository();
        server.on('connection', (socket) => {
            const { userName, password } = socket.handshake.auth;
            this.chatRepository.addUserSocket(socket.id, userName);
            if (this.chatRepository.getOffers().length) socket.emit('availableOffers', this.chatRepository.getOffers());
            socket.on('newOffer', (newOffer) => this.handleNewOffer(socket, userName, newOffer));
            socket.on('newAnswer', (offerObj, ackFunction) => this.handleNewAnswer(socket, offerObj, ackFunction));
            socket.on('sendIceCandidateToSignalingServer', (iceCandidateObj) => this.handleIceCandidate(socket, iceCandidateObj));
        });
    }

    handleNewOffer(socket, userName, newOffer) {
        const offer = {
            offererUserName: userName,
            offer: newOffer,
            offerIceCandidates: [],
            answererUserName: null,
            answer: null,
            answererIceCandidates: []
        };
        this.chatRepository.addOffer(offer);
        socket.broadcast.emit('newOfferAwaiting', [offer]);
    }

    handleNewAnswer(socket, offerObj, ackFunction) {
        const offerToUpdate = this.chatRepository.findOfferByUserName(offerObj.offererUserName);
        const socketToAnswer = this.chatRepository.findSocketByUserName(offerObj.offererUserName);

        if (!offerToUpdate || !socketToAnswer) return;

        ackFunction(offerToUpdate.offerIceCandidates);

        Object.assign(offerToUpdate, {
            answer: offerObj.answer,
            answererUserName: socket.handshake.auth.userName
        });

        socket.to(socketToAnswer.socketId).emit('answerResponse', offerToUpdate);
    }

    handleIceCandidate(socket, { didIOffer, iceUserName, iceCandidate }) {

        const offerInOffers = this.chatRepository.findOfferByUserName(didIOffer ? iceUserName : null, iceUserName);
        const recipientSocket = this.chatRepository.findSocketByUserName(didIOffer ? offerInOffers.answererUserName : offerInOffers.offererUserName);

        if (offerInOffers && recipientSocket) {
            (didIOffer ? offerInOffers.offerIceCandidates : offerInOffers.answererIceCandidates).push(iceCandidate);
            socket.to(recipientSocket.socketId).emit('receivedIceCandidateFromServer', iceCandidate);
        }
    }
}

module.exports = ChatService;