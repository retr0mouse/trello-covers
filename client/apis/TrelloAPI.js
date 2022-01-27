export class TrelloAPI{
    static async getMember(trelloKey, trelloToken) {
        const response = await fetch(`https://api.trello.com/1/tokens/${trelloToken}/member?key=${trelloKey}`);
        if(!response.ok){
            throw new Error("Request failed with status code " + response.status);
        }
        return response.json();
    }

    static async getBoards(memberId, trelloKey, trelloToken) {
        const response = await fetch(`https://api.trello.com/1/members/${memberId}/boards?key=${trelloKey}&token=${trelloToken}`);
        return response.json();
    }

    static async getCards(selectedBoardId, trelloKey, trelloToken) {
        const response = await fetch(`https://api.trello.com/1/boards/${selectedBoardId}/cards?key=${trelloKey}&token=${trelloToken}`);
        return response.json();
    }

    static async addAttachment(imageUrl, selectedCardId, trelloKey, trelloToken) {
        const response = await fetch(`https://api.trello.com/1/cards/${selectedCardId}/attachments?key=${trelloKey}&token=${trelloToken}&setCover=${true}&url=${encodeURIComponent(imageUrl)}`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
    }
}