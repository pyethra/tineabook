import axios from "axios";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

const getBookByID = async (id) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livro no Google Books:", error);
    throw error;
  }
};

export default getBookByID;
