
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
