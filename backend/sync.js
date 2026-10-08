const conn = require('./db/conn')
const { Usuario, Produto } = require('./models/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas sincronizadas')
    }catch(err){
        console.error('Erro ao sincronizar as tabelas',err)
    }finally{
       await conn.close()
       console.log('Fechando a conexão com o banco de dados') 
    }
}

syncDataBase()