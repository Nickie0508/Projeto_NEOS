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

