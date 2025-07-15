const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "features");

const structure = {
  PesquisarLivros: [
    "components/BookItem.jsx",
    "screens/SearchScreen.jsx",
    "services/booksAPI.js",
    "hooks/useBookSearch.js",
    "utils/formatBookResult.js",
    "index.js",
  ],
  HistoricoLeitura: [
    "components/LeituraCard.jsx",
    "screens/HistoricoScreen.jsx",
    "services/historicoService.js",
    "hooks/useHistorico.js",
    "utils/agruparPorMes.js",
    "index.js",
  ],
  Resenhas: [
    "components/ResenhaForm.jsx",
    "components/ResenhaItem.jsx",
    "screens/CriarResenhaScreen.jsx",
    "screens/VerResenhasScreen.jsx",
    "services/resenhaService.js",
    "hooks/useResenhas.js",
    "utils/formatarTexto.js",
    "index.js",
  ],
  Organizacao: [
    "components/ListaLeituras.jsx",
    "components/CategoriaCard.jsx",
    "screens/OrganizacaoScreen.jsx",
    "services/organizacaoService.js",
    "hooks/useOrganizacao.js",
    "utils/ordenarPorCategoria.js",
    "index.js",
  ],
  Autenticacao: [
    "components/InputEmail.jsx",
    "components/InputSenha.jsx",
    "components/BotaoEntrar.jsx",
    "screens/LoginScreen.jsx",
    "screens/RegisterScreen.jsx",
    "services/authService.js",
    "hooks/useAuthForm.js",
    "utils/validarEmail.js",
    "index.js",
  ],
  PerfilUsuario: [
    "components/AvatarUsuario.jsx",
    "components/BotaoEditarPerfil.jsx",
    "screens/PerfilScreen.jsx",
    "services/perfilService.js",
    "hooks/usePerfil.js",
    "utils/formatarData.js",
    "index.js",
  ],
};

function createFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", "utf8");
    console.log("📝 Arquivo criado:", filePath);
  }
}

function createStructure() {
  for (const [feature, files] of Object.entries(structure)) {
    const featureDir = path.join(baseDir, feature);
    if (!fs.existsSync(featureDir)) {
      fs.mkdirSync(featureDir, { recursive: true });
      console.log("📁 Diretório criado:", featureDir);
    }

    files.forEach((file) => {
      const fullPath = path.join(featureDir, file);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      createFile(fullPath);
    });
  }
}

createStructure();