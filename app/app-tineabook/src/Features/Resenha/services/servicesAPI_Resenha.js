import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7228/api/avaliacao', // Substitua pela URL real
  timeout: 10000,
});

// Função para listar livros
const getAvaliacoes = async () => {
  try {
    const response = await api.get('/avaliacao');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Erro ao carregar avaliações');
  }
};

// Função para criar um livro
const postAvaliacoes = async (avaliacoesData) => {
  try {
    // A URL que você está enviando a requisição
    const response = await api.post('/avaliacao', avaliacoesData, {
      headers: {
        'Content-Type': 'application/json', // Explicitamente definindo o tipo de conteúdo como JSON (não é sempre necessário, mas é uma boa prática)
      },
    });
    return response.data; // Retorna os dados recebidos da API
  } catch (error) {
    // Se ocorrer erro, a função lança uma exceção
    throw new Error(error.message || 'Erro ao criar livro');
  }
};


// Função para atualizar um livro
const putAvaliacoes = async (bookId, bookData) => {
  try {
    const response = await api.put(`/books/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Erro ao atualizar livro');
  }
};

// Função para excluir um livro
const deleteAvaliacoes = async (bookId) => {
  try {
    const response = await api.delete(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Erro ao excluir livro');
  }
};

export const avalicoesService = {
  getAvaliacoes,
  postAvaliacoes,
  putAvaliacoes,
  deleteAvaliacoes,
};
