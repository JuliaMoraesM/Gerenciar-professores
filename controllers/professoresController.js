let professores = [
    {
    id: "1",
    nome: "Prof. Carlos",
    idade: 40,
    departamento: "Matemática",
    turmas: [
    { codigo: "9A", disciplina: "MAT101", alunos: ["João", "Maria", "Pedro"] },
    { codigo: "10A", disciplina: "MAT201", alunos: ["Ana", "Luiz"] }
    ]
},
    {
    id: "2",
    nome: "Prof. Ana",
    idade: 35,
    departamento: "História",
    turmas: [
    { codigo: "9A", disciplina: "HIS101", alunos: ["João", "Pedro"] },
    { codigo: "10B", disciplina: "HIS201", alunos: ["Maria", "Carlos", "Luiza"] }
    ]
},
{
    id: "3",
    nome: "Prof. João",
    idade: 50,
    departamento: "Ciências",
    turmas: [
    { codigo: "9A", disciplina: "CIE101", alunos: ["João", "Maria"] },
    { codigo: "9B", disciplina: "CIE101", alunos: ["Pedro", "Luiz"] }
    ]
}
];

module.exports = {

    listarProfessores: (req, res) => {
    res.json(professores);
},

    buscarPorId: (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
    professor ? res.json(professor) : res.status(404).send("Id não corresponde a nenhum professor");
    },

    listarTurmas: (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
    professor ? res.json(professor.turmas) : res.status(404).send("Id não corresponde a nenhum professor");
    },

    atualizarProfessor: (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
    if (!professor) return res.status(404).send("Id não corresponde a nenhum professor");

    const { nome, idade, departamento } = req.body;

    if (nome) professor.nome = nome;
    if (idade) professor.idade = idade;
    if (departamento) professor.departamento = departamento;

    res.json(professor);
},

    adicionarTurma: (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
    if (!professor) return res.status(404).send("Id não corresponde a nenhum professor");

    const { codigo, disciplina, alunos } = req.body;
    professor.turmas.push({ codigo, disciplina, alunos });

    res.json(professor);
},

    listarPorDepartamento: (req, res) => {
    const resultado = professores.filter(
    p => p.departamento.toLowerCase() === req.params.departamento.toLowerCase()
    );
    res.json(resultado);
    },

    removerProfessor: (req, res) => {
    const index = professores.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send("Id não corresponde a nenhum professor");

    professores.splice(index, 1);
    res.send("Professor removido!");
}

};
