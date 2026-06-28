import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function Historico({
  navegar,
  historicoTreinos,
  excluirRegistroTreino,
}) {

  const totalTreinos = historicoTreinos.length;

const dataAtual = new Date();
const mesAtual = dataAtual.getMonth();
const anoAtual = dataAtual.getFullYear();

const treinosNoMes = historicoTreinos.filter(item => {
  const partes = item.data.split("/");
  const mes = Number(partes[1]) - 1;
  const ano = Number(partes[2]);

  return mes === mesAtual && ano === anoAtual;
}).length;

const treinosNoAno = historicoTreinos.filter(item => {
  const partes = item.data.split("/");
  const ano = Number(partes[2]);

  return ano === anoAtual;
}).length; 


const historicoOrdenado = [...historicoTreinos].sort((a, b) => {
  const [diaA, mesA, anoA] = a.data.split("/");
  const [diaB, mesB, anoB] = b.data.split("/");

  const dataA = new Date(anoA, mesA - 1, diaA);
  const dataB = new Date(anoB, mesB - 1, diaB);

  return dataB - dataA;
});

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navegar("home")}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Histórico</Text>
      
      
      <Text style={styles.pageSubtitle}>
  Total de treinos: {totalTreinos}
</Text>

<View style={styles.summaryBox}>
  <Text style={styles.summaryText}>Este mês: {treinosNoMes}</Text>
  <Text style={styles.summaryText}>Este ano: {treinosNoAno}</Text>
</View>

      <ScrollView style={styles.list}>
        {historicoOrdenado.map(item => (
          <View key={item.id} style={styles.historyCard}>
            <Text style={styles.historyTitle}>
              {item.dia} • {item.treino}
            </Text>

            <TouchableOpacity
  onPress={() => excluirRegistroTreino(item.id)}
>
  <Text style={styles.deleteButton}>
    🗑️ Excluir registro
  </Text>
</TouchableOpacity>

            <Text style={styles.historyDate}>
              Data: {item.data}
            </Text>
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

summaryBox: {
  backgroundColor: "#15151C",
  borderRadius: 18,
  padding: 18,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#262636",
},

summaryText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 6,
},

  list: {
    marginTop: 10,
  },
  historyCard: {
    backgroundColor: "#15151C",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#262636",
  },
  historyTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  historyDate: {
    color: "#A7A7B7",
    fontSize: 14,
    marginTop: 6,
  },

  deleteButton: {
  color: "#EF4444",
  marginTop: 12,
  fontSize: 15,
  fontWeight: "700",
},

});