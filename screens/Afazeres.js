import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

export default function Afazeres({
  navegar,
  afazeres,
  concluirAfazer,
  excluirAfazer,
  adicionarAfazer,
  editarAfazer,
}) {
  const [novoAfazer, setNovoAfazer] = useState("");
  const [afazerEditando, setAfazerEditando] = useState(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navegar("home")}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Afazeres</Text>
      <Text style={styles.pageSubtitle}>Suas tarefas gerais</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um novo afazer"
        placeholderTextColor="#777789"
        value={novoAfazer}
        onChangeText={setNovoAfazer}
      />

      <TouchableOpacity
  style={styles.addButton}
  onPress={() => {

    

  if (novoAfazer.trim() === "") return;

  if (afazerEditando) {
    editarAfazer(afazerEditando, novoAfazer);
    setAfazerEditando(null);
  } else {
    adicionarAfazer(novoAfazer);
  }

  setNovoAfazer("");
}}
>
        <Text style={styles.addButtonText}>
  {afazerEditando ? "💾 Atualizar afazer" : "＋ Adicionar afazer"}
</Text>
      </TouchableOpacity>

      {afazerEditando && (
  <TouchableOpacity
    style={styles.cancelButton}
    onPress={() => {
      setNovoAfazer("");
      setAfazerEditando(null);
    }}
  >
    <Text style={styles.cancelButtonText}>
      ❌ Cancelar edição
    </Text>
  </TouchableOpacity>
)}

      <ScrollView style={styles.list}>
        {afazeres.map(item => (
          <View key={item.id} style={styles.taskCard}>
            <TouchableOpacity onPress={() => concluirAfazer(item.id)}>
              <Text style={styles.checkbox}>
                {item.concluido ? "✅" : "⭕"}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.taskText, item.concluido && styles.doneText]}>
              {item.titulo}
            </Text>

            <TouchableOpacity
  onPress={() => {
    setNovoAfazer(item.titulo);
    setAfazerEditando(item.id);
  }}
>
  <Text style={styles.actionButton}>✏️</Text>
</TouchableOpacity>

            <TouchableOpacity onPress={() => excluirAfazer(item.id)}>
              <Text style={styles.actionButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
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


  addButton: {
    backgroundColor: "#8B5CF6",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },


cancelButton: {
  backgroundColor: "#2A1218",
  padding: 14,
  borderRadius: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#7F1D1D",
},

cancelButtonText: {
  color: "#FCA5A5",
  textAlign: "center",
  fontSize: 15,
  fontWeight: "700",
},

  list: {
    marginTop: 10,
  },
  taskCard: {
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
    marginRight: 16,
  },
  taskText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
  },
  doneText: {
    color: "#777789",
    textDecorationLine: "line-through",
  },
  actionButton: {
    fontSize: 22,
    marginLeft: 12,
  },
});