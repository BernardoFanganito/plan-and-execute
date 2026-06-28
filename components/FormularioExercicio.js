import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function FormularioExercicio({
  exercicioInicial,
  aoSalvar,
  aoCancelar,
}) {
  const [nome, setNome] = useState(exercicioInicial?.nome || "");
  const [series, setSeries] = useState(String(exercicioInicial?.series || ""));
  const [repeticoes, setRepeticoes] = useState(String(exercicioInicial?.repeticoes || ""));
  const [carga, setCarga] = useState(String(exercicioInicial?.carga || ""));

  function salvar() {
    if (nome.trim() === "") return;

    aoSalvar({
      nome,
      series,
      repeticoes,
      carga,
    });
  }

  return (
    <View style={styles.formBox}>
      <Text style={styles.label}>Nome do exercício</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Supino reto"
        placeholderTextColor="#777789"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Séries</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 4"
        placeholderTextColor="#777789"
        value={series}
        onChangeText={setSeries}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Repetições</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 12"
        placeholderTextColor="#777789"
        value={repeticoes}
        onChangeText={setRepeticoes}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Carga</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 20"
        placeholderTextColor="#777789"
        value={carga}
        onChangeText={setCarga}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={salvar}>
  <Text style={styles.saveButtonText}>
    {exercicioInicial
      ? "💾 Salvar alterações"
      : "➕ Adicionar exercício"}
  </Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={aoCancelar}>
        <Text style={styles.cancelButtonText}>❌ Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formBox: {
    backgroundColor: "#15151C",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#262636",
  },
  label: {
    color: "#B8B8C7",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#07070A",
    color: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#262636",
  },
  saveButton: {
    backgroundColor: "#15803D",
    padding: 15,
    borderRadius: 14,
    marginTop: 16,
  },
  saveButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "#2A1218",
    padding: 15,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#7F1D1D",
  },
  cancelButtonText: {
    color: "#FCA5A5",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
});