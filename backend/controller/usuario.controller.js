const Usuario = require('../models/Usuario')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        await Usuario.create(valores)
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
    } catch (err) {
        console.error('Não foi possível cadastrar o Usuário', err)
        res.status(500).json({ message: 'Não foi possível cadastrar o Usuário' })
    }
}

const listar = async (req, res) => {
    try {
        const dados = await Usuario.findAll()
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível listar o Usuário', err)
        res.status(500).json({ message: 'Não foi possível listar o Usuário' })
    }
}

const consultarPorCod = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (!dados) {
            return res.status(404).json({ message: 'Usuário não encontrado!' })
        }
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível encontrar o Usuário', err)
        res.status(500).json({ message: 'Não foi possível encontrar o Usuário' })
    }
}

const consultarPorNome = async (req, res) => {
    const nome = req.params.nome
    try {
        const dados = await Usuario.findOne({ where: { nome: nome } })
        if (!dados) {
            return res.status(404).json({ message: 'Nome do Usuário não encontrado!' })
        }
        res.status(200).json(dados)
    } catch (err) {
        console.error('Não foi possível encontrar o Nome do Usuário', err)
        res.status(500).json({ message: 'Não foi possível encontrar o Nome do Usuário' })
    }
}

const excluir = async (req, res) => {
    const id = req.params.id
    try {
        const dados = await Usuario.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Usuário não encontrado no banco de dados!' })
        } else {
            await Usuario.destroy({ where: { codUsuario: id } })
            res.status(200).json({ message: 'Usuário excluído com sucesso!' })
        }
    } catch (err) {
        console.error('Não foi possível excluir o Usuário', err)
        res.status(500).json({ message: 'Não foi possível excluir o Usuário' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body
    try {
        let dados = await Usuario.findByPk(id)
        if (!dados) {
            res.status(404).json({ message: 'Usuário não encontrado no banco de dados!' })
        } else {
            await Usuario.update(valores, { where: { codUsuario: id } })
            dados = await Usuario.findByPk(id)
            res.status(200).json(dados)
        }
    } catch (err) {
        console.error('Não foi possível atualizar o Usuário', err)
        res.status(500).json({ message: 'Não foi possível atualizar o Usuário' })
    }
}

module.exports = { cadastrar, listar, consultarPorCod, consultarPorNome, excluir, atualizar }
