import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { treinosDaSemana } from "../data/treinos";

export default function Treinos({ navegar, selecionarDia, treinos }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navegar("home")}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Treinos</Text>
      <Text style={styles.pageSubtitle}>Escolha o dia da semana</Text>

      <ScrollView style={styles.list}>
        {treinos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayCard}
            onPress={() => selecionarDia(item)}
          >
            <Text style={styles.dayEmoji}>{item.emoji}</Text>

            <View>
              <Text style={styles.dayTitle}>{item.dia}</Text>
              <Text style={styles.dayText}>{item.treino}</Text>
            </View>
          </TouchableOpacity>
        ))}

      <TouchableOpacity
  style={styles.dayCard}
  onPress={() => navegar("historico")}
>
  <Text style={styles.dayEmoji}>📊</Text>

  <View>
    <Text style={styles.dayTitle}>Histórico de treinos</Text>
    <Text style={styles.dayText}>Veja sua evolução</Text>
  </View>
</TouchableOpacity>


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
  list: {
    marginTop: 10,
  },
  dayCard: {
    backgroundColor: "#15151C",
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#262636",
  },
  dayEmoji: {
    fontSize: 30,
    marginRight: 18,
  },
  dayTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  dayText: {
    color: "#A7A7B7",
    fontSize: 14,
    marginTop: 4,
  },
});