// fetchPesquisa_API.js
export const fetchPesquisa_API = async (searchTerm) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return [];
    }
};