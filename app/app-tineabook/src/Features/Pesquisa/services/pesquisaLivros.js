const pesquisaLivros = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

export default pesquisaLivros;

