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
