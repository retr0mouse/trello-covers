export class GoogleAPI{
    static async getBooks(name) {
        const response = await fetch(`http://localhost:3000/books/` + name);
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        return await response.json();
    }
}