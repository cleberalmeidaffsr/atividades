// Declarando Variáveis 
const incluir = document.querySelector('.incluir-container')
const tbody = document.querySelector('tbody')
const Nome = document.querySelector('#nome')
const Funcao = document.querySelector('#funcao')
const Salario = document.querySelector('#salario')
const btnSalvar = document.querySelector('#btnSalvar')

// Variável para is itens
let itens
// Armazena o index para a função de edição
let id

// variável para pega os items do banco
// O item é armazenado(em um armazenamento local) na "dbfunc"(nome do banco), caso não tiver nada ele retorna um array vazio
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

// variável para passar os items dentro para dentro do banco (serve para adicionar, atualizar ou deletar)
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

// abrindo uma janela para incluir os dados (edit = false, index = 0 para não ter nenhum parâmetro, tudo opcional)
function abrindoIncluir(edit = false, index = 0) {
    // assim que clicar no botão, adicionar a classe "active" para aparecer na tela a janela
    incluir.classList.add('active')

    // para cada clique fora da janela feita, remove a classe "active"
    incluir.onclick = e => {
        if (e.target.className.indexOf('incluir-container') !== -1) {
            incluir.classList.remove('active')
        }
    }

    // se for a janela aberta para edição, já carregar os items que estão atribuidos
    if (edit) {
        Nome.value = itens[index].nome
        Funcao.value = itens[index].funcao
        Salario.value = itens[index].salario
        // atribuir o index do funcionário ao ID
        id = index
    } else { // caso não for uma edição, vai carregar com os valores em branco
        Nome.value = ''
        Funcao.value = ''
        Salario.value = ''
    }

}

// função para editar
function editItem(index) {

    // deixando o edit em true e passando o index do funcionário
    abrindoIncluir(true, index)
}

// deletando p funcionário
function deleteItem(index) {
    // faz um splice do index, removendo 1 item que é o index do funcionário
    itens.splice(index, 1)
    // atualiza o banco
    setItensBD()
    // carrega os dados em tela
    loadItens()
}

// insere os itens no html
function insertItem(item, index) {
    // cria uma váriavel que adiciona uma linha (tr)
    let tr = document.createElement('tr')

    // cria o elemento tr no html, cria colunas com on items, botoes de editar e excluir
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
    // coloca no corpo da tabela a tr criada, ou seja, coloca o html criado acima dentro do index.html
    // appendChild(tr) serve pra adicionar cada tr criado dentro do tbody
    tbody.appendChild(tr)
}

// quando clica em salvar ou no lado de fora da janela
btnSalvar.onclick = e => {
    // se os dados estiverem vazios
    if (Nome.value == '' || Funcao.value == '' || Salario.value == '') {
        return
    }

    // retorna um erro pedindo pra preencher o campo vazio
    e.preventDefault();

    // se o id for diferente de indefinido, ou seja, se vim de uma edição, ele atualiza o array so pra aquele id
    if (id !== undefined) {
        itens[id].nome = Nome.value
        itens[id].funcao = Funcao.value
        itens[id].salario = Salario.value
    } else {
        // caso contrário ele da um push incluindo um novo item no banco
        itens.push({ 'nome': Nome.value, 'funcao': Funcao.value, 'salario': Salario.value })
    }

    setItensBD()

    incluir.classList.remove('active')
    loadItens()
    id = undefined
}

// função que vai ser executada assim que a janela for carregada
function loadItens() {
    // pega os itens do banco
    itens = getItensBD()
    tbody.innerHTML = ''
    // faz um forEach para cada dado, inserindo cada linha do item corretamente
    itens.forEach((item, index) => {
        insertItem(item, index)
    })

}

loadItens()