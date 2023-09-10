//Está sendo criando um array chamado produtos que esta armazenando: ID, nome, professor, preço, descrição e imagem.
const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",
    },
    ];

    // Foi criado uma função chamada renderizaProdutos().
    function renderizaProdutos(){
        // Declara uma variavel para armazenar o HTML gerado.
        let html = "";

        // Itera sobre o array de produtos.
        for (let i = 0; i < produtos.length; i++) {

            // Chama a função 'criaProduto()' para gerar o HTML para um unico produto.
            html = html + criaProduto(produtos[i], i);
        }

        // Retorna o HTML gerado.
        return html;
    }

    // Foi criado uma função chamada criaProduto(produto, index) criando uma representação em HTML para um produto.
    function criaProduto(produto, index) {

        // Retorna uma texto que contém HTML.
        // Cria uma div com um class chamado curso.
        // Chama uma imagem com um class "inicio", um título "t" e chama a imagem (src) puxando a propriedade imagem do objeto produto.
        // Cria uma div com um class chamado curso-info puxando as propriedades nome, prof, descrição do objeto.

        // Está criando uma div com um class chamado curso-preco.
        // Cria um class chamado preco-de que está puxando a propriedade preco_de do objeto produto.
        // Cria um class chamado preco-por que está puxando a propriedade preco_por do objeto produto.
        // Cria um botão com um class "btncar" e um class "btn-add". O atributo data-index é definido como o valor do índice index passado como argumento para a função. 
        return `
        <div class="curso">
            <img class='inicio' title="t" src="${produto.imagem}" />
            <div class="curso-info">
                <h4>${produto.nome}</h4>
                <p>${produto.prof}</p>
                <p>${produto.descricao}</p>
            </div>
            <div class="curso-preco">
                <span class="preco-de"R$${produto.preco_de}</span>
                <span class="preco-por"R$${produto.preco_por}</span>
                <button class="btncar btn-add" data-index="${index}"></button>
            </div>
        </div>
        `;
    }

    // Cria um objeto chamado container que puxa o id container do HTML.
    const container = document.querySelector('#container')

    // Está colocando o resultado da função renderizaProdutos() no innerHTML do elemento com o id "container". 
    container.innerHTML = renderizaProdutos();

    // Cria um objeto chamado carrinhoItens.
    const carrinhoItens = {}

    // Cria uma função que se chama renderizaCarrinho().
    function renderizaCarrinho(){

        // Declara uma variavel para armazenar o HTML gerado.
        let html = '';

        //Começa um loop for in com a variavel produtoId que passa pelas propriedades do produto carrinhoItens.
        for (let produtoId in carrinhoItens) {

            // Para cada chave no objeto carrinhoItens, esta chamando a função criaItemCarrinho() com o valor relacionado à chave.
            html = html + criaItemCarrinho(carrinhoItens[produtoId]);
        }
        // Seleciona o HTML com a classe "carrinho_itens". Depois atualiza o innerHTML com o valor da variável html.
        document.querySelector('.carrinho_itens').innerHTML = html;
    }
    // Cria uma função chamada criaItemCarrinho puxando a variavel produto.
    function criaItemCarrinho(produto) {

        // Retorna uma string que contém HTML.
        // Cria uma div com um class chamado carrinho_compra.
        // Está colocando o nome do produto com o h4.
        // Está colocando o valor da unidade e a quantidade.
        // Está fazendo a multiplicação do valor pela quantidade.
        // Cria um botão que permite remover itens do carrinho. 
        return `
        <div class="carrinho_compra">
            <h4>${produto.nome}</h4>
            <p>Preço unidade:${produto.preco_por}| Quantidade:${produto.quantidade}</p>
            <p>Valor: R$:${produto.preco_por*produto.quantidade}</p>
            <button data-produto-id="${produto.id}" class="btn-remove"></button>
        </div>
        `;
    }

    
    // Cria uma função chamada criaCarrinhoTotal().
    function criaCarrinhoTotal() {

        // Cria uma variavel local valendo 0.
        let total = 0;

        //Começa um loop usando o for in com a variavel produtoId que passa pelas do produto carrinhoItens.
        for (let produtoId in carrinhoItens) {

            //Calcula o valor total de cada produto no carrinho, multiplica pelo preço da unidade do produto (preco_por) e pela quantidade desse produto no carrinho (quantidade). O resultado é adicionado ao valor total na variável total.
            total = total + carrinhoItens[produtoId].preco_por *carrinhoItens[produtoId].quantidade;
        }

        // Foi selecionado o elemento HTML com o class "carrinho_total" usando o document.querySelector(). Em seguida, atualizando o innerHTML com uma string de HTML.
        // Está inserindo o valor total dos produtos ao carrinho.
        // Está criando um link com um href vazio e abrindo em uma nova aba.
        // Está inserindo um icone do cartão de crédito.
        // Adiciona o texto "Comprar Agora" deixando em negrito.
        document.querySelector('.carrinho_total').innerHTML = `
        <h4>Total: <strong> R$${total}</strong></h4>
        <a href="#" target="_blank">
        <ion-icon name="card-outline"></ion-icon>
        <strong>Comprar Agora</strong>
              </a>
        `;}

    //Cria uma função chamada adicionaItemNoCarrinho puxando o objeto produto.
    function adicionaItemNoCarrinho(produto) {

        //Verifica se o produto ainda não existe no carrinho, verifica se a propriedade produto.id não está presente no objeto carrinhoItens.
        //Se o produto não estiver no carrinho, o código dentro do if é executado.
        if (!carrinhoItens[produto.id]) {

            //Adiciona o produto ao carrinho de compras
            carrinhoItens[produto.id] = produto;

            //Inicializa a propriedade quantidade para 0 no objeto do produto no carrinho. Isso mostra a quantidade do produto no carrinho.
            carrinhoItens[produto.id].quantidade = 0;

        //Aumenta de 1 em 1 a quantidade do produto no carrinho.    
        }++carrinhoItens[produto.id].quantidade;

        //Chama a função renderizaCarrinho() para atualizar os itens no carrinho na página.
        renderizaCarrinho();

        //Chama a função criaCarrinhoTotal() para atualizar o valor total na página.
        criaCarrinhoTotal();}

    //Registra um ouvinte de evento de clique, quando o documento é selcionado, a função de é executada.
    document.body.addEventListener('click', function (event) {

        //Obtém o elemento que foi selecionado e o armazena na variável elemento. O event.target é o elemento que ocorreu o clique.
        const elemento = event.target;

        //Verifica se o elemento selecionado possui a class "btn-add", usando o método classList.contains(). Se o elemento tiver essa class o botão "Adicionar ao Carrinho" foi selecionado.
        if (elemento.classList.contains('btn-add')) {

            //Se o botão "Adicionar ao Carrinho" foi selecionado, esta linha pega o valor do atributo data-index desse botão, transformando em um numero inteiro pelo parseInt.
            const index = parseInt(elemento.getAttribute('data-index'), 10);

            //É acessado o objeto do produto no array produtos e o armazena na variável produto.
            const produto = produtos[index];

            //A função adicionaItemNoCarrinho() puxa os valores do objeto produto, e adiciona esse produto ao carrinho de compras.
            adicionaItemNoCarrinho(produto);
        }

        //Verifica se o elemento selecionado possui um class CSS "btn-remove". Se tiver essa class o loop sera executado.
        if (elemento.classList.contains('btn-remove')){

            //Pega o valor do atributo data-produto-id do botão para saber qual produto precisa ser removido do carrinho.
            const produtoId = elemento.getAttribute('data-produto-id');
            
            //Verifica se a quantidade do produto no carrinho é menor ou igual a 1. Se for, o produto é retirado do carrinho usando o delete carrinhoItens[produtoId]. Caso contrário, a quantidade é decrementada em 1.
            if (carrinhoItens[produtoId].quantidade <= 1) {
                delete carrinhoItens[produtoId];
            }   else {
                --carrinhoItens[produtoId].quantidade;
            }

            //Puxa a propriedade renderizaCarrinho() para atualizar a exibição dos itens do carrinho.
            renderizaCarrinho();

            //Puxa a propriedade criaCarrinhoTotal() para recalcular e atualizar o valor total do carrinho.
            criaCarrinhoTotal();
        }
    });
    