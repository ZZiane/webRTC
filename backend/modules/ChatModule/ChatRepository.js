class ChatRepository {

    constructor() {
        this.storedOffers = [];
        this.connectedSockets = [];
    }

    findOfferByUserName(offererUserName = null, answererUserName = null) {
        return this.storedOffers.find(o => o.offererUserName === offererUserName || o.answererUserName === answererUserName);
    }


    findSocketByUserName(userName) {
        return this.connectedSockets.find(s => s.userName === userName);
    }
    addUserSocket(socketId, userName) {
        this.connectedSockets.push({ socketId, userName });
    }

    addOffer(offer) {
        this.storedOffers.push(offer);

    }

    getOffers() {
        return this.storedOffers;
    }
}


module.exports = ChatRepository;