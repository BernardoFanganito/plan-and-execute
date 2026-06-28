import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import FormularioExercicio from "../components/FormularioExercicio";

export default function DetalheTreino({
  editarNomeTreino,
  navegar,
  diaSelecionado,
  exerciciosFeitos,
  marcarExercicio,
  registrarTreinoConcluido,
  adicionarExercicio,
  editarExercicio,
  excluirExercicio,
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [exercicioEditando, setExercicioEditando] = useState(null);
  const [editandoNomeTreino, setEditandoNomeTreino] = useState(false);
  const [novoNomeTreino, setNovoNomeTreino] = useState(diaSelecionado.treino);

  const total = diaSelecionado.exercicios.length;

  const feitos = diaSelecionado.exercicios.filter(
    exercicio => exerciciosFeitos[exercicio.nome]
  ).length;

  const treinoConcluido = total > 0 && feitos === total;

  function abrirFormularioNovo() {
    setExercicioEditando(null);
    setMostrarFormulario(true);
  }

  function abrirFormularioEdicao(exercicio) {
    setExercicioEditando(exercicio);
    setMostrarFormulario(true);
  }

  function cancelarFormulario() {
    setExercicioEditando(null);
    setMostrarFormulario(false);
  }

  function salvarFormulario(dadosExercicio) {
    if (exercicioEditando) {
      editarExercicio(
        diaSelecionado.id,
        exercicioEditando.id,
        dadosExercicio
      );
    } else {
      adicionarExercicio(diaSelecionado.id, dadosExercicio);
    }

    setExercicioEditando(null);
    setMostrarFormulario(false);
  }


  function confirmarExclusaoExercicio(exercicio) {
  Alert.alert(
    "Excluir exercício",
    `Deseja excluir "${exercicio.nome}"?`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => excluirExercicio(diaSelecionado.id, exercicio.id),
      },
    ]
  );
}


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navegar("treinos")}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{diaSelecionado.dia}</Text>
     
     
     {editandoNomeTreino ? (
  <>
    <TextInput
      style={styles.input}
      value={novoNomeTreino}
      onChangeText={setNovoNomeTreino}
      placeholder="Nome do treino"
      placeholderTextColor="#777789"
    />

    <TouchableOpacity
      style={styles.saveWorkoutButton}
      onPress={() => {
        editarNomeTreino(diaSelecionado.id, novoNomeTreino);
        setEditandoNomeTreino(false);
      }}
    >
      <Text style={styles.saveWorkoutButtonText}>
        💾 Salvar nome do treino
      </Text>
    </TouchableOpacity>
  </>
) : (
  <View style={styles.rowTitle}>
    <Text style={styles.pageSubtitle}>
      {diaSelecionado.treino}
    </Text>

    <TouchableOpacity onPress={() => setEditandoNomeTreino(true)}>
      <Text style={styles.actionButton}>✏️</Text>
    </TouchableOpacity>
  </View>
)}

      <TouchableOpacity style={styles.addExerciseButton} onPress={abrirFormularioNovo}>
        <Text style={styles.addExerciseButtonText}>＋ Adicionar exercício</Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <FormularioExercicio
          exercicioInicial={exercicioEditando}
          aoSalvar={salvarFormulario}
          aoCancelar={cancelarFormulario}
        />
      )}

      <ScrollView style={styles.list}>
        {diaSelecionado.exercicios.map((exercicio) => {
          const feito = exerciciosFeitos[exercicio.nome];

          return (
            <View key={exercicio.id} style={styles.exerciseCard}>
              <TouchableOpacity onPress={() => marcarExercicio(exercicio.nome)}>
                <Text style={styles.checkbox}>{feito ? "✅" : "⭕"}</Text>
              </TouchableOpacity>

              <View style={styles.exerciseInfo}>
                <Text style={[styles.exerciseText, feito && styles.doneText]}>
                  {exercicio.nome}
                </Text>

                <Text style={styles.exerciseDetails}>
                  {exercicio.series} séries • {exercicio.repeticoes} reps • {exercicio.carga} kg
                </Text>
              </View>

              <TouchableOpacity onPress={() => abrirFormularioEdicao(exercicio)}>
                <Text style={styles.actionButton}>✏️</Text>
              </TouchableOpacity>

              <TouchableOpacity
  onPress={() => confirmarExclusaoExercicio(exercicio)}
>
  <Text style={styles.actionButton}>🗑️</Text>
</TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <Text style={styles.progress}>
        {feitos} de {total} exercícios concluídos
      </Text>

      {treinoConcluido && (
        <Text style={styles.completedMessage}>
          🎉 Treino concluído!
        </Text>
      )}

      {treinoConcluido && (
        <TouchableOpacity
          style={styles.saveWorkoutButton}
          onPress={() =>
            registrarTreinoConcluido(diaSelecionado.dia, diaSelecionado.treino)
          }
        >
          <Text style={styles.saveWorkoutButtonText}>
            💾 Salvar treino concluído
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07070A",
    padding: 24,
    paddingTop: 70,
  },
  voltar: {
    color: "#8B5CF6",
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 28,
  },
  pageSubtitle: {
    color: "#B8B8C7",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
  },

  input: {
  backgroundColor: "#15151C",
  color: "#FFFFFF",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#262636",
},

  addExerciseButton: {
    backgroundColor: "#8B5CF6",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  addExerciseButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  rowTitle: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

  list: {
    marginTop: 10,
  },
  exerciseCard: {
    backgroundColor: "#15151C",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#262636",
  },
  checkbox: {
    fontSize: 24,
    marginRight: 14,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  exerciseDetails: {
    color: "#A7A7B7",
    fontSize: 13,
    marginTop: 5,
  },
  doneText: {
    color: "#777789",
    textDecorationLine: "line-through",
  },
  actionButton: {
    fontSize: 21,
    marginLeft: 10,
  },
  progress: {
    color: "#8B5CF6",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
  },
  completedMessage: {
    color: "#22C55E",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  saveWorkoutButton: {
    backgroundColor: "#15803D",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  saveWorkoutButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});