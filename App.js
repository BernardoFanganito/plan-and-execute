import React, { useEffect, useState } from "react";

import { salvarDados, carregarDados } from "./services/storage";
import Home from "./screens/Home";
import Treinos from "./screens/Treinos";
import DetalheTreino from "./screens/DetalheTreino";
import Lembretes from "./screens/Lembretes";
import Afazeres from "./screens/Afazeres";
import Historico from "./screens/Historico";
import { treinosDaSemana } from "./data/treinos";

export default function App() {
  const [tela, setTela] = useState("home");
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [exerciciosFeitos, setExerciciosFeitos] = useState({});
  const [treinos, setTreinos] = useState(treinosDaSemana);
  const [historicoTreinos, setHistoricoTreinos] = useState([]);
  const [afazeres, setAfazeres] = useState([
  { id: 1, titulo: "Lavar a moto", concluido: false },
  { id: 2, titulo: "Estudar React", concluido: true },
]);

  const [lembretes, setLembretes] = useState([
    { id: 1, titulo: "Beber água", concluido: false },
    { id: 2, titulo: "Comprar creatina", concluido: false },
    { id: 3, titulo: "Separar roupa da academia", concluido: true },
  ]);

  useEffect(() => {
  async function carregarAfazeres() {
    const dados = await carregarDados("afazeres", []);
    setAfazeres(dados);
  }

  carregarAfazeres();
}, []);


useEffect(() => {
  salvarDados("afazeres", afazeres);
}, [afazeres]);

useEffect(() => {
  async function carregarLembretes() {
    const dados = await carregarDados("lembretes", []);
    setLembretes(dados);
  }

  carregarLembretes();
}, []);

useEffect(() => {
  salvarDados("lembretes", lembretes);
}, [lembretes]);


useEffect(() => {
  async function carregarTreinos() {
    const dados = await carregarDados("treinos", treinosDaSemana);
    setTreinos(dados);
  }

  carregarTreinos();
}, []);

useEffect(() => {
  salvarDados("treinos", treinos);
}, [treinos]);


useEffect(() => {
  async function carregarHistorico() {
    const dados = await carregarDados("historicoTreinos", []);
    setHistoricoTreinos(dados);
  }

  carregarHistorico();
}, []);

useEffect(() => {
  salvarDados("historicoTreinos", historicoTreinos);
}, [historicoTreinos]);


useEffect(() => {
  async function carregarExerciciosFeitos() {
    const dados = await carregarDados("exerciciosFeitos", {});
    setExerciciosFeitos(dados);
  }

  carregarExerciciosFeitos();
}, []);

useEffect(() => {
  salvarDados("exerciciosFeitos", exerciciosFeitos);
}, [exerciciosFeitos]);

  function navegar(telaDestino) {
    setTela(telaDestino);
  }

  function selecionarDia(dia) {
    setDiaSelecionado(dia);
    setTela("detalheTreino");
  }

  function marcarExercicio(nome) { 


    
    setExerciciosFeitos({
      ...exerciciosFeitos,
      [nome]: !exerciciosFeitos[nome],
    });
  }


function adicionarExercicio(diaId, dadosExercicio) {
  const novosTreinos = treinos.map(dia => {
    if (dia.id !== diaId) return dia;

    const novoExercicio = {
      id: Date.now(),
      nome: dadosExercicio.nome,
      series: Number(dadosExercicio.series),
      repeticoes: Number(dadosExercicio.repeticoes),
      carga: Number(dadosExercicio.carga),
      concluido: false,
    };

    return {
      ...dia,
      exercicios: [...dia.exercicios, novoExercicio],
    };
  });

  setTreinos(novosTreinos);

  const diaAtualizado = novosTreinos.find(dia => dia.id === diaId);
  setDiaSelecionado(diaAtualizado);
}

function editarExercicio(diaId, exercicioId, dadosExercicio) {
  const novosTreinos = treinos.map(dia => {
    if (dia.id !== diaId) return dia;

    return {
      ...dia,
      exercicios: dia.exercicios.map(exercicio =>
        exercicio.id === exercicioId
          ? {
              ...exercicio,
              nome: dadosExercicio.nome,
              series: Number(dadosExercicio.series),
              repeticoes: Number(dadosExercicio.repeticoes),
              carga: Number(dadosExercicio.carga),
            }
          : exercicio
      ),
    };
  });

  setTreinos(novosTreinos);

  const diaAtualizado = novosTreinos.find(dia => dia.id === diaId);
  setDiaSelecionado(diaAtualizado);
}

function excluirExercicio(diaId, exercicioId) {
  const novosTreinos = treinos.map(dia => {
    if (dia.id !== diaId) return dia;

    return {
      ...dia,
      exercicios: dia.exercicios.filter(
        exercicio => exercicio.id !== exercicioId
      ),
    };
  });

  setTreinos(novosTreinos);

  const diaAtualizado = novosTreinos.find(dia => dia.id === diaId);
  setDiaSelecionado(diaAtualizado);
}

function editarNomeTreino(diaId, novoNome) {
  const novosTreinos = treinos.map(dia =>
    dia.id === diaId
      ? { ...dia, treino: novoNome }
      : dia
  );

  setTreinos(novosTreinos);

  const diaAtualizado = novosTreinos.find(dia => dia.id === diaId);
  setDiaSelecionado(diaAtualizado);
}

  function registrarTreinoConcluido(dia, treino) {
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  const jaRegistrado = historicoTreinos.some(
    item => item.data === dataHoje && item.treino === treino
  );

  if (jaRegistrado) return;

  const novoRegistro = {
    id: Date.now(),
    dia: dia,
    treino: treino,
    data: dataHoje,
  };

  setHistoricoTreinos([...historicoTreinos, novoRegistro]);

}

function excluirRegistroTreino(id) {
  setHistoricoTreinos(
    historicoTreinos.filter(item => item.id !== id)
  );
}

  function concluirLembrete(id) {
    setLembretes(
      lembretes.map(item =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  }

  function excluirLembrete(id) {
    setLembretes(lembretes.filter(item => item.id !== id));
  }

  function adicionarLembrete(texto) {

    
  setLembretes([
    ...lembretes,
    {
      id: Date.now(),
      titulo: texto,
      concluido: false,
    },
  ]);
}

function concluirAfazer(id) {
  setAfazeres(
    afazeres.map(item =>
      item.id === id
        ? { ...item, concluido: !item.concluido }
        : item
    )
  );
}


function editarLembrete(id, novoTitulo) {
  setLembretes(
    lembretes.map(item =>
      item.id === id
        ? { ...item, titulo: novoTitulo }
        : item
    )
  );
}


function excluirAfazer(id) {
  setAfazeres(
    afazeres.filter(item => item.id !== id)
  );
}

function adicionarAfazer(texto) {  setAfazeres([
    ...afazeres,
    {
      id: Date.now(),
      titulo: texto,
      concluido: false,
    },
  ]);
}

function editarAfazer(id, novoTitulo) {
  setAfazeres(
    afazeres.map(item =>
      item.id === id
        ? { ...item, titulo: novoTitulo }
        : item
    )
  );
}

  if (tela === "treinos") {
  return (
    <Treinos
      navegar={navegar}
      selecionarDia={selecionarDia}
      treinos={treinos}
    />
  );
}

  if (tela === "detalheTreino") {
    return (
      <DetalheTreino
        navegar={navegar}
        editarNomeTreino={editarNomeTreino}
        diaSelecionado={diaSelecionado}
        exerciciosFeitos={exerciciosFeitos}
        marcarExercicio={marcarExercicio}
        registrarTreinoConcluido={registrarTreinoConcluido}
        adicionarExercicio={adicionarExercicio}
        editarExercicio={editarExercicio}
        excluirExercicio={excluirExercicio}
      />
    );
  }

  if (tela === "lembretes") {
    return (
      <Lembretes
        navegar={navegar}
        lembretes={lembretes}
        concluirLembrete={concluirLembrete}
        excluirLembrete={excluirLembrete}
        editarLembrete={editarLembrete}
        adicionarLembrete={adicionarLembrete}
      />
    );
  }

  

if (tela === "afazeres") {
  return (
    <Afazeres
      navegar={navegar}
      afazeres={afazeres}
      concluirAfazer={concluirAfazer}
      excluirAfazer={excluirAfazer}
      adicionarAfazer={adicionarAfazer}
      editarAfazer={editarAfazer}
    />
  );
}

if (tela === "historico") {
  return (
   <Historico
  navegar={navegar}
  historicoTreinos={historicoTreinos}
  excluirRegistroTreino={excluirRegistroTreino}
/>
  );
}

  return (
  <Home
    navegar={navegar}
    treinos={treinos}
  />
);
}

