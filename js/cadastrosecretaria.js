
let alunos = [];

document.getElementById("alunoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarAluno();
});

function salvarAluno() {
    const index = document.getElementById("index").value;
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const rg = document.getElementById("rg").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;

    if (!validarDataNascimento(dataNascimento)) {
        alert("Data de nascimento inválida!");
        return;
    }

    if (index === "") {
        if (alunos.some(aluno => aluno.cpf === cpf)) {
            alert("CPF já cadastrado!");
            return;
        }

        alunos.push({ nome, cpf, rg, email, telefone, dataNascimento });
    } else {
        alunos[index] = { nome, cpf, rg, email, telefone, dataNascimento };
    }

    atualizarTabela();
    document.getElementById("alunoForm").reset();
    document.getElementById("index").value = "";
}

function atualizarTabela() {
    const tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";
    alunos.forEach((aluno, index) => {
        const row = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.rg}</td>
            <td>${aluno.email}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.dataNascimento}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        </tr>`;
        tabela.innerHTML += row;
    });
}

function buscarAluno() {
    const termo = document.getElementById("searchInput").value.toLowerCase();
    const tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";

    alunos
        .filter(aluno => 
            aluno.nome.toLowerCase().includes(termo) ||
            aluno.cpf.includes(termo) ||
            aluno.rg.includes(termo) ||
            aluno.email.toLowerCase().includes(termo) ||
            aluno.telefone.includes(termo)
        )
        .forEach((aluno, index) => {
            const row = `<tr>
                <td>${aluno.nome}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.rg}</td>
                <td>${aluno.email}</td>
                <td>${aluno.telefone}</td>
                <td>${aluno.dataNascimento}</td>
                <td>
                    <button onclick="editarAluno(${index})">Editar</button>
                    <button onclick="excluirAluno(${index})">Excluir</button>
                </td>
            </tr>`;
            tabela.innerHTML += row;
        });
}

function editarAluno(index) {
    const aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("rg").value = aluno.rg;
    document.getElementById("email").value = aluno.email;
    document.getElementById("telefone").value = aluno.telefone;
    document.getElementById("dataNascimento").value = aluno.dataNascimento;
    document.getElementById("index").value = index;
}

function excluirAluno(index) {
    if (confirm("Deseja excluir este aluno?")) {
        alunos.splice(index, 1);
        atualizarTabela();
    }
}

function validarDataNascimento(data) {
    const hoje = new Date();
    const nascimento = new Date(data);
    return !isNaN(nascimento) && nascimento <= hoje;
}