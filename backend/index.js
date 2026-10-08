const express = require('express')
const app = express()
const cors = require('cors')

const conn = require('./db/conn')
const usuarioController = require('./controller/usuario.controller')
const produtoController = require('./controller/produto.controller')

const PORT = 3000
const hostname = 'localhost' // 127.0.0.1

// ------------ Middleware ----------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//--------------- Rotas --------------

// Rotas de Usuário
app.post('/usuario', usuarioController.cadastrar)
app.get('/usuarios', usuarioController.listar)
app.get('/usuario/:id', usuarioController.consultarPorCod)
app.get('/usuario/buscar/:nome', usuarioController.consultarPorNome)
app.delete('/usuario/:id', usuarioController.excluir)
app.put('/usuario/:id', usuarioController.atualizar)

// Rotas de Produto
app.post('/produto', produtoController.cadastrar)
app.get('/produtos', produtoController.listar)
app.get('/produto/:id', produtoController.consultarPorCod)
app.get('/produto/buscar/:nomeProduto', produtoController.consultarPorNome)
app.delete('/produto/:id', produtoController.excluir)
app.put('/produto/:id', produtoController.atualizar)

// Rota raíz para teste de conectividade
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação rodando!!!' })
})

// -------------- Server -------------
conn.sync()
.then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err) => {
    console.error('Erro de conexão com o banco de dados!', err)
})