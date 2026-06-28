import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({
  navegar,
  treinos,
}) {

const diasDaSemana = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const hoje = diasDaSemana[new Date().getDay()];

const treinoHoje = treinos.find(
  treino => treino.dia === hoje
);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>P&E</Text>
      <Text style={styles.subtitle}>Plan & Execute</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navegar("afazeres")}
      >
        <Text style={styles.icon}>📝</Text>

        <View>
          <Text style={styles.cardTitle}>Afazeres gerais</Text>
          <Text style={styles.cardText}>
            Organize suas tarefas do dia
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navegar("treinos")}
      >
        <Text style={styles.icon}>💪</Text>

        <View>
          <Text style={styles.cardTitle}>Treinos</Text>
          <Text style={styles.cardText}>
  {hoje} • {treinoHoje?.treino || "Sem treino cadastrado"}
</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navegar("lembretes")}
      >
        <Text style={styles.icon}>🔔</Text>

        <View>
          <Text style={styles.cardTitle}>Lembretes importantes</Text>
          <Text style={styles.cardText}>
            Controle seus lembretes
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.version}>v0.5</Text>
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

  logo: {
    color: "#8B5CF6",
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 110,
  },

  subtitle: {
    color: "#B8B8C7",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 48,
  },

  card: {
    backgroundColor: "#15151C",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#262636",
  },

  icon: {
    fontSize: 34,
    marginRight: 18,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "700",
  },

  cardText: {
    color: "#A7A7B7",
    fontSize: 14,
    marginTop: 5,
  },

  version: {
    color: "#55556A",
    textAlign: "center",
    marginTop: 28,
  },
});