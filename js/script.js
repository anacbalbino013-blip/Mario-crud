let personagens = [];

let idEditando = null;

const formulario = document.getElementById("formPersonagem");

const campoNome = document.getElementById("nome");
const campoTipo = document.getElementById("tipo");
const campoPoder = document.getElementById("poder");
const campoVidas = document.getElementById("vidas");
const campoAtivo = document.getElementById("ativo");

const listaPersonagens =
    document.getElementById("listaPersonagens");

const contador =
    document.getElementById("contador");

const botaoCadastrar =
    document.getElementById("btnCadastrar");


const imagens = {
    Mario: "https://upload.wikimedia.org/wikipedia/en/9/99/MarioSMBW.png",

    Luigi: "https://upload.wikimedia.org/wikipedia/en/7/73/Luigi_NSMBW.png",

    Peach: "https://upload.wikimedia.org/wikipedia/en/1/16/Princess_Peach_Stock_Art.png",

    Toad: "https://upload.wikimedia.org/wikipedia/en/5/5f/Toad_Stock_Art.png",

    Koopa: "https://upload.wikimedia.org/wikipedia/en/3/3e/Koopa_Troopa.png"
};


carregarPersonagens();

renderizarPersonagens();


formulario.addEventListener(
    "submit",
    cadastrarPersonagem
);


function cadastrarPersonagem(evento) {

    evento.preventDefault();

    const personagem = {

        id: idEditando === null
            ? Date.now()
            : idEditando,

        nome: campoNome.value,

        tipo: campoTipo.value,

        poder: campoPoder.value,

        vidas: campoVidas.value,

        ativo: campoAtivo.checked

    };


    if (idEditando === null) {

        personagens.push(personagem);

    } else {

        for (let i = 0; i < personagens.length; i++) {

            if (personagens[i].id === idEditando) {

                personagens[i] = personagem;

            }

        }

        idEditando = null;

        botaoCadastrar.textContent =
            "Cadastrar Personagem";
    }


    salvarPersonagens();

    renderizarPersonagens();

    formulario.reset();
}


function salvarPersonagens() {

    localStorage.setItem(
        "personagensMario",
        JSON.stringify(personagens)
    );
}


function carregarPersonagens() {

    const dados =
        localStorage.getItem("personagensMario");

    if (dados !== null) {

        personagens = JSON.parse(dados);

    }
}


function renderizarPersonagens() {

    listaPersonagens.innerHTML = "";


    for (let i = 0; i < personagens.length; i++) {

        const personagem = personagens[i];

        const card =
            document.createElement("div");

        card.classList.add("card");


        card.innerHTML = `

            <img
                src=""
                alt=""
            >

            <h3></h3>

            <p>
                <strong>Tipo:</strong>
            </p>

            <p>
                <strong>Poder:</strong>
            </p>

            <p>
                <strong>Vidas:</strong>
            </p>

            <p class="ativo"></p>

            <div class="acoes">

                <button
                    type="button"
                    class="editar"
                >
                    Editar
                </button>

                <button
                    type="button"
                    class="excluir"
                >
                    Excluir
                </button>

            </div>

        `;


        const imagem =
            card.querySelector("img");

        imagem.src =
            imagens[personagem.nome];

        imagem.alt =
            personagem.nome;


        const titulo =
            card.querySelector("h3");

        titulo.textContent =
            personagem.nome;


        const paragrafos =
            card.querySelectorAll("p");


        paragrafos[0].innerHTML =
            "<strong>Tipo:</strong> " +
            personagem.tipo;


        paragrafos[1].innerHTML =
            "<strong>Poder:</strong> " +
            personagem.poder;


        paragrafos[2].innerHTML =
            "<strong>Vidas:</strong> " +
            personagem.vidas;


        if (personagem.ativo) {

            paragrafos[3].textContent =
                "Personagem ativo";

        } else {

            paragrafos[3].textContent =
                "Personagem inativo";

        }


        const botoes =
            card.querySelectorAll("button");


        botoes[0].addEventListener(
            "click",
            function() {

                editarPersonagem(
                    personagem.id
                );

            }
        );


        botoes[1].addEventListener(
            "click",
            function() {

                excluirPersonagem(
                    personagem.id
                );

            }
        );


        listaPersonagens.appendChild(card);

    }


    atualizarContador();
}


function editarPersonagem(id) {

    for (let i = 0; i < personagens.length; i++) {

        if (personagens[i].id === id) {

            campoNome.value =
                personagens[i].nome;

            campoTipo.value =
                personagens[i].tipo;

            campoPoder.value =
                personagens[i].poder;

            campoVidas.value =
                personagens[i].vidas;

            campoAtivo.checked =
                personagens[i].ativo;

            idEditando = id;

            botaoCadastrar.textContent =
                "Atualizar Personagem";

        }
    }
}


function excluirPersonagem(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este personagem?"
        );


    if (confirmar) {

        const novaLista = [];


        for (let i = 0; i < personagens.length; i++) {

            if (personagens[i].id !== id) {

                novaLista.push(personagens[i]);

            }

        }


        personagens = novaLista;

        salvarPersonagens();

        renderizarPersonagens();

    }
}


function atualizarContador() {

    contador.textContent =
        "Total: " + personagens.length;

}
