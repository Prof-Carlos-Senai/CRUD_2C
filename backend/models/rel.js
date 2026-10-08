const Usuario = require('./Usuario')
const Produto = require('./Produto')

// Relacionamento: Usuário pode ter muitos Produtos
Usuario.hasMany(Produto, {
    foreignKey: 'idProduto',
    as: 'produtoUsuario',
    onDelete: 'CASCADE'
})
// Relacionamento reverso: um produto só pertence a um Usuário
Produto.belongsTo(Usuario, {
    foreignKey: 'idProduto',
    as: 'usuarioProduto'
})

module.exports = { Usuario, Produto }