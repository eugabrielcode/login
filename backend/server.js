const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Agora o Express lida com JSON diretamente

const usuarios = []; // Simulação de um banco de dados

// Rota de Registro
app.post("/register", (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ success: false, message: "Preencha todos os campos!" });
    }

    const usuarioExiste = usuarios.find((user) => user.email === email);
    if (usuarioExiste) {
        return res.status(400).json({ success: false, message: "E-mail já cadastrado!" });
    }

    usuarios.push({ nome, email, senha });
    return res.json({ success: true, message: "Cadastro realizado com sucesso!" });
});

// Rota de Login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find((user) => user.email === email && user.senha === senha);
    if (!usuario) {
        return res.status(401).json({ success: false, message: "Credenciais inválidas!" });
    }

    return res.json({ success: true, message: `Bem-vindo, ${usuario.nome}!` });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});