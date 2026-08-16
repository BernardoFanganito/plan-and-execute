import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermissaoNotificacao() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function agendarNotificacaoLembrete(titulo, dataHora) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔔 Lembrete",
      body: titulo,
    },
    trigger: { type: "date", date: new Date(dataHora) },
  });

  return id;
}

export async function cancelarNotificacaoLembrete(notificationId) {
  if (!notificationId) return;
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}