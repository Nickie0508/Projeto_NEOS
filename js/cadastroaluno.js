document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!validarCPF(document.getElementById("cpfAluno").value)) {
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
        const dadosAluno = {
            nome: document.getElementById("nomeAluno").value,
            cpf: document.getElementById("cpfAluno").value,
            rg: document.getElementById("rg").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value
        };

        fetch("processa_matricula.asp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAluno)
        })
        .then(response => response.json()) 
        .then(data => {
            alert(data.mensagem); 
            console.log("Resposta do servidor:", data);
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
        });
    });

    function validarCPF(cpf) {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    }
    function validarRG(rg) {
        const regex = /^[A-Za-z0-9.-]+$/;
        return regex.test(rg);
    }
    function validarTelefone(telefone) {
        const regex = /^\+?[0-9-]{8,15}$/;
        return regex.test(telefone);
    }
});
