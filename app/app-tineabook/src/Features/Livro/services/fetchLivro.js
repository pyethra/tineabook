import { getBookByID } from "./googleAPI";
import { getAvaliacao } from "./apiDB";
import { getHist } from "./apiDB";

// mapeia os dados vindos do banco
const mapLivroDB = (dbData) => ({
  id: dbData.id_livro,
  usuarioId: dbData.id_usuario,
  status: dbData.status,
  estrelas: dbData.estrelas,
  resenha: dbData.resenha,
  data: dbData.data,
});

// mapeia os dados vindos do Google Books
const mapLivroGoogle = (apiData) => ({
  id: apiData.id,
  title: apiData.volumeInfo?.title,
  authors: apiData.volumeInfo?.authors || [],
  publisher: apiData.volumeInfo?.publisher,
  description: apiData.volumeInfo?.description,
  pageCount: apiData.volumeInfo?.pageCount,
  categories: apiData.volumeInfo?.categories,
  thumbnail: apiData.volumeInfo?.imageLinks?.thumbnail,
  language: apiData.volumeInfo?.language,
  snippet: apiData.searchInfo?.textSnippet,
});

// mescla os dois objetos
const mergeLivroData = (dbData, apiData) => ({
  ...mapLivroGoogle(apiData),
  ...(dbData ? mapLivroDB(dbData) : {}), // só adiciona se existir no banco
});

// busca em paralelo
export const fetchLivro = async (idLivro) => {
  try {
    const [dbData, apiData] = await Promise.all([
      //getAvaliacao(idUsuario), // precisa filtrar dentro da função
      getBookByID(idLivro),
    ]);

    // filtra o livro específico no retorno do banco
    const livroDB = dbData.find((l) => l.id_livro === idLivro);

    return mergeLivroData(livroDB, apiData);
  } catch (error) {
    console.error("Erro ao buscar informações do livro:", error);
    throw error;
  }
};
