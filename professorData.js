app.get('/professores', (req, res) => {
    res.json(professores);
});

app.get('/professores/:id', (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
    if (!professor) {
    return res.status(404).send("Id não correspondente a nenhum professor");
    }

    res.json(professor);
});


app.get('/professores/:id/turmas', (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);
    if (!professor) {
    return res.status(404).send("Id não existente");
    }

    res.json(professor.turmas);
});

app.post("/professores/:id/turmas", (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);

    if (!professor) {
    return res.status(404).send("Id não corresponde a nenhum professor");
}

    const { codigo, disciplina, alunos } = req.body;

    professor.turmas.push({ codigo, disciplina, alunos });

    res.json(professor);
});

app.put("/professores/:id", (req, res) => {
    const professor = professores.find(p => p.id === req.params.id);

    if (!professor) {
    return res.status(404).send("Id não corresponde a nenhum professor");
}

    const { nome, idade, departamento } = req.body;
    if (nome) professor.nome = nome;
    if (idade) professor.idade = idade;
    if (departamento) professor.departamento = departamento;

    res.json(professor);
});

app.get("/professores/departamento/:departamento", (req, res) => {
    const resultado = professores.filter(
    p => p.departamento.toLowerCase() === req.params.departamento.toLowerCase()
);
    res.json(resultado);
});
app.delete("/professores/:id", (req, res) => {
    const index = professores.findIndex(p => p.id === req.params.id);

    if (index === -1) {
    return res.status(404).send("Id não corresponde a nenhum professor");
}

    professores.splice(index, 1);
    res.send("Professor foi removido!");
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
