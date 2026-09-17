// importar o modulo express - framework de aplicação web para Node.js
const express = require('express')
// MODULO QUE PERMITE QUE O SERVIDOR ACEITE REQUISIÇÕES DIFERENTES(DOMINIO)
const cors = require('cors');

//INSTANCIANDO EXPRESS PARA APP 
const app = express();
// DEEFININDO A PORTA QUE O SERVIDOR VAI EXECUTAR
const port=3001;

// Configura o express para analisar as requisições com o corpo no formato json,
// isso é necessário para ler os dados enviados no corpo da requisição POST
app.use(express.json());

// Habilita o cors para todas as rotas da aplicação, permtindo acesso
app.use(cors());

// Objeto( tabela com os preços)
const precos={
    bicicleta:0.75, //preco por km para a bicicleta
    carro:0.25,
    drone: 1.20
}

// definindo uma rota de api tipo post 
// função de callback lida com requisiçao

app.post('/calcularfrete',(req,res)=>{
    const{distancia,tipoTransporte} = req.body;

    // verifica se a distancia ou tipoTransporte nao foram fornecidos
    if(distancia === undefined || tipoTransporte == undefined){
        return res.status(400).json({error:'Distancia e tipo de transporte são obrigatorio'})
    }
    const precoPorKm = precos[tipoTransporte.toLowerCase()];
    if(precoPorKm === undefined){
        return res.status(400).json({error: "Tipo de transporte invalido"})
    }
    const valorTotal = distancia * precoPorKm;
    
    res.json({valorTotal: valorTotal.toFixed(2)})
})


// Inicia o servidor para que ele comece a escutar as requisições na porta
app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost::${port}`);
})

