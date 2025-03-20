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