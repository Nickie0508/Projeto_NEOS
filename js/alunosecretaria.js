document.getElementById("alunoForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        rg: document.getElementById("rg").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        dataNascimento: document.getElementById("dataNascimento").value
    };

    try {                              // alterar o link para conectar com o backend
        const response = await fetch("http://localhost:5000/api/alunos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Aluno cadastrado com sucesso!");
            listarAlunos(); // atualiza e mostra a lista na tela
        } else {
            alert(data.erro);
        }
    } catch (error) {
        alert("Erro ao cadastrar aluno!");
    }
});

async function listarAlunos() {       // alterar o link para conectar com o backend
    const response = await fetch("http://localhost:5000/api/alunos");
    const alunos = await response.json();

    const tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        const row = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.rg}</td>
            <td>${aluno.email}</td>
            <td>${aluno.telefone}</td>
            <td>${new Date(aluno.dataNascimento).toLocaleDateString()}</td>
            <td><button onclick="excluirAluno('${aluno._id}')">Excluir</button></td>
        </tr>`;
        tabela.innerHTML += row;
    });
}
listarAlunos();

async function excluirAluno(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;

    await fetch(`http://localhost:5000/api/alunos/${id}`, {
        method: "DELETE"
    });

    alert("Aluno excluído!");
    listarAlunos();
}
