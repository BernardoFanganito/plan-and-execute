# Plan & Execute

> Aplicativo mobile de produtividade pessoal desenvolvido em React Native com Expo — gerenciamento de treinos, afazeres e lembretes com notificações locais.

![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-compatible-000000?logo=apple&logoColor=white)
![Android](https://img.shields.io/badge/Android-compatible-3DDC84?logo=android&logoColor=white)

---

## Sobre o projeto

Plan & Execute é um app de produtividade pessoal que reúne em um único lugar o controle de treinos semanais, lista de afazeres e lembretes com notificações agendadas. Desenvolvido do zero com React Native e Expo, sem dependência de backend — todos os dados são persistidos localmente no dispositivo.

---

## Funcionalidades

### 🏋️ Treinos
- Plano semanal de exercícios configurável por dia da semana
- Marcação de exercícios como concluídos com persistência entre sessões
- Histórico de treinos realizados
- Tela de detalhe por treino com lista de exercícios e séries

### ✅ Afazeres
- Lista de tarefas com criação, conclusão e exclusão
- Dados persistidos localmente com AsyncStorage

### 🔔 Lembretes
- Criação de lembretes com horário definido
- Notificações locais agendadas via `expo-notifications`
- Seletor de data/hora com tema escuro (DateTimePicker nativo)
- Cancelamento automático de notificação ao concluir ou excluir lembrete

### 📊 Histórico
- Registro dos treinos completados ao longo do tempo

---

## Tecnologias

- **React Native 0.81** + **Expo 54**
- **React 19**
- `@react-native-async-storage/async-storage` — persistência local de dados
- `expo-notifications` — notificações locais agendadas
- `@react-native-community/datetimepicker` — seletor nativo de data/hora
- `react-native-paper` — componentes de UI com Material Design
- `@expo/vector-icons` — ícones

---

## Como rodar

**Pré-requisitos:** Node.js e Expo CLI instalados

```bash
# Instalar dependências
npm install

# Iniciar o projeto
npx expo start
```

Escaneie o QR Code com o aplicativo **Expo Go** (iOS ou Android) ou rode no emulador.

---

## Estrutura do projeto

```
├── App.js              # Componente raiz e gerenciamento de estado global
├── screens/            # Telas do aplicativo
│   ├── Home.js         # Tela inicial
│   ├── Treinos.js      # Plano semanal de treinos
│   ├── DetalheTreino.js# Detalhe e execução do treino do dia
│   ├── Afazeres.js     # Lista de tarefas
│   ├── Lembretes.js    # Gerenciamento de lembretes
│   └── Historico.js    # Histórico de treinos
├── components/         # Componentes reutilizáveis
│   └── FormularioExercicio.js
├── services/           # Serviços de dados
│   ├── storage.js      # Persistência com AsyncStorage
│   └── notifications.js# Agendamento de notificações locais
└── data/
    └── treinos.js      # Dados iniciais do plano de treinos
```

---

## Autor

**Bernardo Fanganito**  
[github.com/BernardoFanganito](https://github.com/BernardoFanganito)
