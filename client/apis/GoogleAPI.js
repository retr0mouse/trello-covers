export class GoogleAPI{
    static async getBooks(name) {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyCPEDr5QVi6rbthmGTmqowctbm7-kfe4IY`);
        const data = await response.json();
        return data;
    }
}