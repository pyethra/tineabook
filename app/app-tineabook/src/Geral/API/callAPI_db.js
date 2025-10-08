import axios from "axios";

// cria instância do axios com configs padrão
const apiDB = axios.create({
  baseURL: "https://localhost:7228/api/", // sua URL base
  timeout: 5000, // tempo limite
});

// exemplo de função GET
export const getAvaliacao = async () => {
  const response = await apiDB.get(`/avaliacao/`);
  return response.data;
};

export const getHist = async () => {
  const response = await apiDB.get(`/historico/`);
  return response.data;
};

/* exemplo de função POST
export const createPost = async (novoPost) => {
  const response = await api.post("/posts", novoPost);
  return response.data;
};
*/

export default apiDB;
