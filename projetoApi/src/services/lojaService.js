const db = require('../db')

module.exports = {
    buscarProdutos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM item', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarProduto: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('select * from item where codigo = ?', [codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    inserir: (item, quantidade, preco) => {

        return new Promise((aceito, rejeitado) => {
            db.query('insert into item (item, quantidade, preco) values (?, ?, ?)',
                [item, quantidade, preco],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results)
                }
            );
        });
    },

    alterar: (codigo, item, quantidade, preco) => {

        return new Promise((aceito, rejeitado) => {
            db.query('update item set item = ?, quantidade = ?, preco = ? where codigo = ?',
                [item, quantidade, preco, codigo],
                (error, results) => {
                    if (error) { rejeitado(error); return; }
                    aceito(results)
                }
            );
        });
    },

    excluir: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('delete from item where codigo = ?', [codigo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};