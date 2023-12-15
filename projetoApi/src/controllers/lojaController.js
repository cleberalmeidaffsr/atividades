const lojaService = require('../services/lojaService');

module.exports = {
    buscarProdutos: async (req, res) => {
        let json = {error:'', result:[]};

        let loja = await lojaService.buscarProdutos();

        for(let i in loja){
            json.result.push({
                codigo: loja[i].codigo,
                produto: loja[i].item,
                quantidade: loja[i].quantidade,
                preco: loja[i].preco
            });
        }
        res.json(json);
    },

    buscarProduto: async(req, res) => {
        let json = {error: '', result:{}}; 

        let codigo = req.params.codigo;
        let produto = await lojaService.buscarProduto(codigo);

        if(produto) {
            json.result = itemUm;
        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error: '', result:{}}; 

        let item = req.body.item;
        let quantidade = req.body.quantidade;
        let preco = req.body.preco;

        if(item && quantidade && preco) {
            let itemCodigo = await lojaService.inserir(item, quantidade, preco);
            json.result = {
                codigo: itemCodigo,
                item,
                quantidade,
                preco
            };
        } else {
            json.error = 'Campos não enviados'
        }

        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error: '', result:{}}; 

        let codigo = req.params.codigo;
        let item = req.body.item;
        let quantidade = req.body.quantidade;
        let preco = req.body.preco;

        if(codigo && item && quantidade && preco) {
            let itemCodigo = await lojaService.alterar(codigo, item, quantidade, preco);
            json.result = {
                codigo,
                item,
                quantidade,
                preco
            };
        } else {
            json.error = 'Campos não enviados'
        }
        res.json(json);
    },

    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await lojaService.excluir(req.params.codigo);

        res.json(json);
    }
}
