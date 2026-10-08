const Produto = require('../models/Produto')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nomeProduto || !valores.categoria || !valores.precoUnitario || !valores.data) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        await Produto.create(valores)
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' })
    } catch (err) {
        console.error('Não foi possível cadastrar o Produto', err)
        res.status(500).json({ message: 'Não foi possível cadastrar o Produto' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Produto.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível listar o Produto', err)
        res.status(500).json({ message: 'Não foi possível listar o Produto' })
    }
}

const consultarPorCod = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Produto.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Produto não encontrado!' })
        }
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível encontrar o Produto', err)
        res.status(500).json({ message: 'Não foi possível encontrar o Produto' })
    }
}

const consultarPorNome = async (req, res) => {
    const nomeProduto = req.params.nomeProduto
    try {
        const dados = await Produto.findOne({ where: { nomeProduto: nomeProduto } })
        if (!dados) {
            return res.status(404).json({ message: 'Nome do Produto não encontrado!' })
        }
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível encontrar o Nome do Produto', err)
        res.status(500).json({ message: 'Não foi possível encontrar o Nome do Produto' })
    }
}

const excluir = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Produto.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Produto não encontrado no banco de dados!' })
        } else {
            await Produto.destroy({ where: { codProduto: id } })
            res.status(200).json({ message: 'Produto excluído com sucesso!' })
        }
    } catch (err) {
        console.error('Não foi possível excluir o Produto', err)
        res.status(500).json({ message: 'Não foi possível excluir o Produto' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        let dados = await Produto.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Produto não encontrado no banco de dados!' })
        } else {
            await Produto.update(valores, { where: { codProduto: id } })
            dados = await Produto.findByPk(id)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Não foi possível atualizar o Produto', err)
        res.status(500).json({ message: 'Não foi possível atualizar o Produto' })
    }
}

module.exports = { cadastrar, listar, consultarPorCod, consultarPorNome, excluir, atualizar }