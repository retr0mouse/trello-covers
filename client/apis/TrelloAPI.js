export class TrelloAPI{
    static async getMember(trelloKey, trelloToken) {
        const response = await fetch(`http://localhost:3000/members/${trelloToken}/${trelloKey}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
    }

    static async getBoards(memberId, trelloKey, trelloToken) {
        const response = await fetch(`http://localhost:3000/boards/${memberId}/${trelloKey}/${trelloToken}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
    }

    static async getCards(selectedBoardId, trelloKey, trelloToken) {
        const response = await fetch(`http://localhost:3000/cards/${selectedBoardId}/${trelloKey}/${trelloToken}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
    }

    static async addAttachment(selectedCardId, trelloKey, trelloToken, imageUrl) {
        const response = await fetch(`http://localhost:3000/attachment/${selectedCardId}/${trelloKey}/${trelloToken}/${imageUrl}`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
    }
}