import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarDados(chave, valor) {
  try {
    const valorEmTexto = JSON.stringify(valor);
    await AsyncStorage.setItem(chave, valorEmTexto);
  } catch (erro) {
    console.log("Erro ao salvar dados:", erro);
  }
}

export async function carregarDados(chave, valorPadrao) {
  try {
    const valorSalvo = await AsyncStorage.getItem(chave);

    if (valorSalvo === null) {
      return valorPadrao;
    }

    return JSON.parse(valorSalvo);
  } catch (erro) {
    console.log("Erro ao carregar dados:", erro);
    return valorPadrao;
  }
}