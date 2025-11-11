let professores = [
    {
    id: "1",
    nome: "José Vasques",
    idade: 46,
    departamento: "Química",
    turmas: [
    { codigo: "3A", disciplina: "Quimica1", alunos: ["João Vitor", "Anna Clara", "Pedro Henrique"] },
    { codigo: "3B", disciplina: "Quimica2", alunos: ["Mariana Mendes", "Gustavo Henrique", "Caique Fadel"] }
    ]
},
    {
        id: "2",
        nome: "Natalia Valente",
        idade: 41,
        departamento: "Geografia",
        turmas: [
            { codigo: "2A", disciplina: "Geografia1", alunos: ["Julia Moraes", "Julia Lamare", "Luiza Coffani"] },
            { codigo: "2B", disciplina: "Geografia2", alunos: ["Thifany Antunes", "Carolina Freitas", "Camila Souza"] }
        ]
    },

    {id: "3",
    nome: "Donizete Silva",
    idade: 49,
    departamento: "Matemática",
    turmas: [
        { codigo: "1A", disciplina: "Matematica1", alunos: ["Vitoria Freitas", "Mateus Oliveira", "Rafaela Souza"] },
        { codigo: "1B", disciplina: "Matematica2", alunos: ["Danielle Namie", "Melissa Yukari", "Gabriel Oliveira"] }
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
