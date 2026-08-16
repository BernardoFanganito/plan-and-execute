import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function Lembretes({
  navegar,
  lembretes,
  concluirLembrete,
  excluirLembrete,
  adicionarLembrete,
  editarLembrete,
}) {

  const [novoLembrete, setNovoLembrete] = useState("");

  const [lembreteEditando, setLembreteEditando] = useState(null);

  const [dataHora, setDataHora] = useState(null);

  const [mostrarPicker, setMostrarPicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navegar("home")}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Lembretes</Text>
      <Text style={styles.pageSubtitle}>Seus lembretes importantes</Text>

      <TextInput
  style={styles.input}
  placeholder="Digite um novo lembrete"
  placeholderTextColor="#777789"
  value={novoLembrete}
  onChangeText={setNovoLembrete}
/>

   <TouchableOpacity
  style={styles.dateButton}
  onPress={() => setMostrarPicker(true)}
>
  <Text style={styles.dateButtonText}>
    {dataHora
      ? `🕐 ${dataHora.toLocaleString("pt-BR")}`
      : "🕐 Definir horário (opcional)"}
  </Text>
</TouchableOpacity>

{dataHora && (
  <TouchableOpacity onPress={() => setDataHora(null)}>
    <Text style={styles.clearDateText}>Remover horário</Text>
  </TouchableOpacity>
)}

{mostrarPicker && (
  <DateTimePicker
    value={dataHora || new Date()}
    mode="datetime"
    display="default"
    themeVariant="dark"
    onChange={(event, dataSelecionada) => {
      setMostrarPicker(false);
      if (dataSelecionada) {
        setDataHora(dataSelecionada);
      }
    }}
  />
)}

            <TouchableOpacity
  style={styles.addButton}
  onPress={() => {
  if (novoLembrete.trim() === "") return;

  if (lembreteEditando) {
    editarLembrete(lembreteEditando, novoLembrete, dataHora);
    setLembreteEditando(null);
  } else {
    adicionarLembrete(novoLembrete, dataHora);
  }

  setNovoLembrete("");
  setDataHora(null);
}}
>
        <Text style={styles.addButtonText}>
  {lembreteEditando
    ? "💾 Atualizar lembrete"
    : "＋ Adicionar lembrete"}
</Text>
      </TouchableOpacity>

{lembreteEditando && (
  <TouchableOpacity
    style={styles.cancelButton}
    onPress={() => {
      setNovoLembrete("");
      setLembreteEditando(null);
      setDataHora(null);
    }}
  >
    <Text style={styles.cancelButtonText}>
      ❌ Cancelar edição
    </Text>
  </TouchableOpacity>
)}


      <ScrollView style={styles.list}>
        {lembretes.map(item => (
          <View key={item.id} style={styles.reminderCard}>
            <TouchableOpacity onPress={() => concluirLembrete(item.id)}>
              <Text style={styles.checkbox}>{item.concluido ? "✅" : "⭕"}</Text>
            </TouchableOpacity>

                        <View style={{ flex: 1 }}>
              <Text style={[styles.reminderText, item.concluido && styles.doneText]}>
                {item.titulo}
              </Text>
              {item.dataHora && (
                <Text style={styles.reminderTime}>
                  🔔 {new Date(item.dataHora).toLocaleString("pt-BR")}
                </Text>
              )}
            </View>

   <TouchableOpacity
  onPress={() => {
    setNovoLembrete(item.titulo);
    setLembreteEditando(item.id);
    setDataHora(item.dataHora ? new Date(item.dataHora) : null);
  }}
>
  <Text style={styles.actionButton}>✏️</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => excluirLembrete(item.id)}>
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
  reminderCard: {
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
    reminderText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
  reminderTime: {
    color: "#8B5CF6",
    fontSize: 12,
    marginTop: 4,
  },

    dateButton: {
    backgroundColor: "#15151C",
    padding: 14,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#262636",
  },
  dateButtonText: {
    color: "#B8B8C7",
    textAlign: "center",
    fontSize: 14,
  },
  clearDateText: {
    color: "#FCA5A5",
    textAlign: "center",
    fontSize: 13,
    marginBottom: 16,
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