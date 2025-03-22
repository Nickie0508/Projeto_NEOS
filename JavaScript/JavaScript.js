//SEÇÕS
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');

    //Usado para inicialemente ocultar as seções
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('ocultar');
    });

    //Usado para mostrar a seção correspondente ao escolhido no index 
    if (formType === 'aluno') {
        document.getElementById('formularioAluno').classList.remove('ocultar');
        document.getElementById('formularioAluno').classList.add('mostrar');
    } else if (formType === 'professor') {
        document.getElementById('formularioProfessor').classList.remove('ocultar');
        document.getElementById('formularioProfessor').classList.add('mostrar');
    } else if (formType === 'disciplina') {
        document.getElementById('formularioDisciplina').classList.remove('ocultar');
        document.getElementById('formularioDisciplina').classList.add('mostrar');
    } else if (formType === 'turma') {
        document.getElementById('formularioTurma').classList.remove('ocultar');
        document.getElementById('formularioTurma').classList.add('mostrar');
    }
    
});
//==================================================================================================================================
//CADASTRO ALUNO 
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const cpfInput = document.getElementById("cpfAluno");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (!validarCamposObrigatorios()) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }
        if (!validarCPF(cpfInput.value)) {
            alert("CPF inválido! Digite no formato 000.000.000-00.");
            return;
        }
        if (!validarRG(document.getElementById("rg").value)) {
            alert("RG inválido! Use apenas letras, números, ponto ou hífen.");
            return;
        }
        if (!validarTelefone(document.getElementById("telefone").value)) {
            alert("Número de telefone inválido! Digite apenas números, '+' ou '-'.");
            return;
        }

        // Verifica se o CPF já existe antes de enviar
        const cpfJaExiste = await verificarCPFNoServidor(cpfInput.value);
        if (cpfJaExiste) {
            alert("Este CPF já está cadastrado!");
            return;
        }

        const dadosAluno = {
            nome: document.getElementById("nomeAluno").value,
            cpf: cpfInput.value,
            rg: document.getElementById("rg").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            endereco: {
                estado: document.getElementById("enderecoestados").value,
                cidade: document.getElementById("enderecocidade").value,
                cep: document.getElementById("enderecocep").value
            },
            curso: document.getElementById("curso").value,
            turno: document.getElementById("turno").value
        };

        // Envia os dados para o servidor
        try {
            const response = await fetch("https://seu-servidor.com/api/matricula", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosAluno)
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar matrícula: " + response.statusText);
            }

            const data = await response.json();
            alert("Matrícula concluída com sucesso!");
            console.log("Resposta do servidor:", data);
        } catch (error) {
            console.error("Erro ao enviar matrícula:", error);
            alert("Erro ao enviar matrícula. Tente novamente mais tarde.");
        }
    });

    // Verifica se o CPF já está no servidor
    async function verificarCPFNoServidor(cpf) {
        try {
            const response = await fetch(`https://seu-servidor.com/api/verificar-cpf?cpf=${cpf}`);
            const data = await response.json();
            return data.existe; // Retorna verdadeiro se o CPF já estiver no servidor
        } catch (error) {
            console.error("Erro ao verificar CPF:", error);
            return false; // Retorna falso em caso de erro
        }
    }
});

// Valida campos obrigatórios
function validarCamposObrigatorios() {
    const campos = document.querySelectorAll("[required]");
    for (let campo of campos) {
        if (!campo.value.trim()) {
            return false;
        }
    }
    return true;
}

// Valida CPF
function validarCPF(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

// Valida RG
function validarRG(rg) {
    return /^[A-Za-z0-9.-]+$/.test(rg);
}

// Valida telefone
function validarTelefone(telefone) {
    return /^\+?[0-9-]{8,15}$/.test(telefone);
}
//==================================================================================================================================
//CADASTRO PROFESSOR
// Função para validar o formulário e gerar o JSON
function validarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const disciplinas = [...document.querySelectorAll('input[name="disciplinas"]:checked')].map(d => d.value);
    const regimeContratacao = document.getElementById("regimeContratacao").value;

    // Verificar se todas as informações foram preenchidas
    if (!nome || !dataNascimento || !cpf || !rg || !endereco || !telefone || !email || !senha || disciplinas.length === 0 || !regimeContratacao) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }

    // Criar objeto JSON com os dados
    const dados = {
        nome,
        dataNascimento,
        cpf,
        rg,
        endereco,
        telefone,
        email,
        senha,
        disciplinas,
        regimeContratacao
    };

    // Converter para JSON e gerar o arquivo para download
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cadastro.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("Cadastro salvo com sucesso!");

    // Limpar o formulário
    document.getElementById("formCadastro").reset();
}

// Função para controlar o menu sanfonado (accordion)
document.querySelector('.accordion-btn').addEventListener('click', function() {
    const content = document.querySelector('.accordion-content');
    const icon = document.getElementById('iconAccordion');

    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+';  // Indicando que a sanfona está fechada
    } else {
        content.style.display = 'block';
        icon.textContent = '−';  // Indicando que a sanfona está aberta
    }
});

//==================================================================================================================================
// CADASTRO DISCIPLINAS
function validarFormulario(event) {
    event.preventDefault();

    const nomeMateria = document.getElementById("nomeMateria").value.trim();
    const codigoMateria = document.getElementById("codigoMateria").value.trim();
    const cargaHoraria = document.getElementById("cargaHoraria").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const turno = document.getElementById("turno").value;

    if (!nomeMateria || !codigoMateria || !cargaHoraria || !descricao || !turno) {
        alert("Por favor, preencha todos os campos!");
        return false;
    }

    if (cargaHoraria <= 0) {
        alert("A carga horária deve ser um número positivo!");
        return false;
    }

    alert("Matéria cadastrada com sucesso!");
    document.getElementById("formCadastroMateria").reset();
}
//==================================================================================================================================
//CADASTRO DE TURMAS

    // Função para exibir a mensagem de sucesso ou erro
    function exibirMensagem(mensagem, sucesso = true) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = mensagem;
        messageDiv.style.color = sucesso ? 'green' : 'red';
    }

    // Função para adicionar os campos de alunos dinamicamente
    function adicionarCamposAlunos() {
        const quantidadeAlunos = document.getElementById('quantidadeAlunos').value;
        const listaAlunos = document.getElementById('listaAlunos');
        
        // Limpar a lista de alunos antes de adicionar novos campos
        listaAlunos.innerHTML = '';
        
        for (let i = 1; i <= quantidadeAlunos; i++) {
            const alunoDiv = document.createElement('div');
            alunoDiv.classList.add('aluno');
            alunoDiv.innerHTML = `
                <label for="nomeAluno${i}">Nome do Aluno ${i}</label>
                <input type="text" id="nomeAluno${i}" name="nomeAluno${i}" required>
            `;
            listaAlunos.appendChild(alunoDiv);
        }
    }

    // Chamar a função de adicionar campos de alunos sempre que a quantidade mudar
    document.getElementById('quantidadeAlunos').addEventListener('input', adicionarCamposAlunos);

    // Função para validar e enviar o formulário
    document.getElementById('formCadastro').addEventListener('submit', function (event) {
        event.preventDefault();

        const nomeSala = document.getElementById('nomeSala').value;
        const capacidadeSala = document.getElementById('capacidadeSala').value;
        const nomeProfessor = document.getElementById('nomeProfessor').value;
        const emailProfessor = document.getElementById('emailProfessor').value;
        const quantidadeAlunos = document.getElementById('quantidadeAlunos').value;

        // Verificar se os campos estão preenchidos
        if (!nomeSala || !capacidadeSala || !nomeProfessor || !emailProfessor || !quantidadeAlunos) {
            exibirMensagem('Por favor, preencha todos os campos obrigatórios.', false);
            return;
        }

        // Validar a capacidade da sala (mínimo 10, máximo 30)
        if (capacidadeSala < 10 || capacidadeSala > 30) {
            exibirMensagem('A capacidade da sala deve ser entre 10 e 30 alunos.', false);
            return;
        }

        // Validar a quantidade de alunos (mínimo 10, máximo 30)
        if (quantidadeAlunos < 10 || quantidadeAlunos > 30) {
            exibirMensagem('O número de alunos deve ser entre 10 e 30.', false);
            return;
        }

        // Validar o e-mail do professor (deve conter '@')
        if (!emailProfessor.includes('@')) {
            exibirMensagem('Por favor, insira um e-mail válido para o professor (deve conter o símbolo "@").', false);
            return;
        }

        // Validar os alunos (nomes dos alunos)
        let alunosValidos = true;
        for (let i = 1; i <= quantidadeAlunos; i++) {
            const nomeAluno = document.getElementById(`nomeAluno${i}`).value;
            if (!nomeAluno) {
                alunosValidos = false;
                break;
            }
        }

        if (!alunosValidos) {
            exibirMensagem('Por favor, preencha todos os nomes dos alunos.', false);
            return;
        }

        // Simulação de cadastro bem-sucedido
        exibirMensagem(`Cadastro bem-sucedido! Sala: ${nomeSala}, Professor: ${nomeProfessor}, Alunos: ${quantidadeAlunos}`, true);

        // Limpar os campos após o envio
        document.getElementById('formCadastro').reset();
        document.getElementById('listaAlunos').innerHTML = '';
    });

    // Inicializar a lista de alunos com os campos vazios
    adicionarCamposAlunos();