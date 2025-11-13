import getBookByID from '../../../shared/api/callAPI_googlebooks';

export const buscarLivroPorId = async (livroId) => {
  try {
    const livroData = await getBookByID(livroId);
    const info = livroData.volumeInfo;

    const livroFormatado = {
      titulo: info.title,
      autor: info.authors?.[0] || 'Autor desconhecido',
      generos: info.categories || ['Gênero não informado'],
      sinopse: info.description || 'Nenhuma sinopse disponível.',
      capa: info.imageLinks?.thumbnail || 'https://via.placeholder.com/100x150.png?text=Sem+Capa',
    };

    livroFormatado.sinopse = livroFormatado.sinopse.replace(/<[^>]*>/g, '');

    return livroFormatado;
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    throw error;
  }
};

export default {
  buscarLivroPorId,
};

