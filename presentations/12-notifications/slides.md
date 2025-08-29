---
transition: slide-left
layout: cover
color: indigo-light
---

# Notificări în React Native

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Introducere în Notificări

:: content ::

**Notificările Push** sunt mesaje trimise de un server către aplicația ta, care apar pe dispozitivul utilizatorului chiar și atunci când aplicația este închisă. Sunt un instrument esențial pentru a capta atenția utilizatorilor, a trimite alerte importante sau a informa despre actualizări.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Notificări Locale</h3>
    <div class="mt-4">
    
Sunt programate **direct de pe dispozitivul utilizatorului** de către aplicația însăși. Nu necesită o conexiune la internet sau un server.

</div>
    <p class="mt-4 text-sm"><strong>Exemplu:</strong> O aplicație de ceas deșteptător, un memento pentru o sarcină. </p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Notificări Push</h3>
<div class="mt-4">
    
Sunt trimise de un **server backend** către dispozitive specifice prin intermediul serviciilor native ale platformei (APNs pentru iOS, FCM pentru Android).

</div>
    <p class="mt-4 text-sm"><strong>Exemplu:</strong> Un mesaj nou într-o aplicație de chat, o alertă de știri de ultimă oră.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Cazuri de Utilizare pentru Notificări

:: content ::

Notificările, atunci când sunt folosite corect, pot îmbunătăți semnificativ experiența utilizatorului și pot crește retenția acestuia.

<div class="ns-c-tight">

- **Alerte Tranzacționale**: Confirmări de comandă, actualizări de livrare, notificări de plată.
- **Angajament Social**: Mesaje noi, aprecieri, comentarii, cereri de prietenie.
- **Memento-uri și Sarcini**: Notificări pentru evenimente din calendar, sarcini de finalizat, alarme.
- **Marketing și Promoții**: Anunțarea de oferte speciale, produse noi sau conținut relevant (trebuie folosit cu moderație).
- **Informații în Timp Real**: Alerte de știri, scoruri sportive, actualizări meteo.
- **Recuperarea Utilizatorilor**: Notificări care încurajează utilizatorii inactivi să revină în aplicație (ex: "Nu te-am mai văzut de ceva vreme!").

</div>

<AdmonitionType type="warning">

Abuzul de notificări este unul dintre principalele motive pentru care utilizatorii dezinstalează aplicații. Este crucial să oferiți valoare și să permiteți utilizatorilor să controleze ce tip de notificări doresc să primească.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Setup-ul Proiectului cu `expo-notifications`

:: content ::

**`expo-notifications`** este librăria oficială Expo care oferă un API unificat pentru a gestiona atât notificările locale, cât și cele push pe iOS și Android.

**1. Instalare:**
Rulează în terminalul proiectului tău:
```bash
npx expo install expo-notifications
```
<br/>

**2. Configurare în `app.json`**

Pentru ca notificările push să funcționeze corect, în special pe Android, trebuie să adaugi câteva configurări în `app.json`.

```json
{
  "expo": {
    "android": {
      "useNextNotificationsApi": true,
      "googleServicesFile": "./google-services.json"
    }
  }
}
```

---
layout: default
---

<div class="ns-c-tight">

- **`useNextNotificationsApi: true`**: Activează API-ul modern de notificări pe Android.
- **`googleServicesFile`**: Calea către fișierul de configurare Firebase (necesar pentru push pe Android).

</div>
<br/>
<AdmonitionType type="info">

Pentru a primi notificări push pe un dispozitiv fizic, va trebui să creezi un proiect Firebase pentru Android și să obții chei APNs pentru iOS, proces gestionat în mare parte automat de **EAS Build**.

</AdmonitionType>
---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Solicitarea Permisiunilor

:: content ::

Înainte de a putea trimite orice notificare, trebuie să obținem permisiunea explicită a utilizatorului. `expo-notifications` simplifică acest proces.

Funcția **`Notifications.requestPermissionsAsync()`** afișează dialogul nativ al sistemului de operare.

**Gestionarea Stărilor de Permisiune:**

Putem verifica starea curentă a permisiunilor folosind `Notifications.getPermissionsAsync()`. Rezultatul este un obiect care poate avea una dintre următoarele stări:

<div class="ns-c-tight">

- **`granted`**: Utilizatorul a acordat permisiunea. Putem programa notificări.
- **`denied`**: Utilizatorul a refuzat permisiunea. Nu putem trimite notificări și nu mai putem afișa dialogul de solicitare.
- **`undetermined`**: Starea inițială. Utilizatorul nu a fost încă întrebat. Acesta este momentul ideal pentru a afișa un dialog explicativ ("priming prompt") înainte de a apela `requestPermissionsAsync()`.

</div>

<AdmonitionType type="warning">

Pe iOS, permisiunile pot fi mai granulare (ex: alerte, sunete, ecuson). Pe Android, este de obicei o singură permisiune generală.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function PermissionsExample() {
  const [status, setStatus] = useState(null);

  const checkPermissions = async () => {
    const currentStatus = await Notifications.getPermissionsAsync();
    setStatus(currentStatus.status);
  };

  const requestPermissions = async () => {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    setStatus(newStatus);

    if (newStatus !== 'granted') {
      alert('Permisiunea pentru notificări a fost refuzată. Mergeți la setări pentru a o activa manual.');
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starea permisiunii: {status || 'verificare...'}</Text>
      {status !== 'granted' && (
        <Button title="Solicită Permisiunea" onPress={requestPermissions} />
      )}
      {status === 'denied' && (
         <Button title="Mergi la Setări" onPress={() => Linking.openSettings()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 15 
  },
  text: { 
    fontSize: 18, 
    textAlign: 'center' 
  },
});
`
const dependencies = 'expo-notifications'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Permisiuni" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Notificări Locale

:: content ::

Notificările locale sunt programate direct din aplicație. Funcția principală este **`scheduleNotificationAsync(content, trigger)`**.

<div class="ns-c-tight">

- **`content`**: Un obiect care definește ce va conține notificarea.
  - `title`: Titlul notificării.
  - `body`: Mesajul principal.
  - `data`: Un obiect cu date suplimentare (ex: `{ "screen": "Details", "itemId": 42 }`) pe care le poți folosi la interacțiune.
  - `sound`: `true` pentru sunetul implicit sau numele unui fișier de sunet personalizat.

- **`trigger`**: Un obiect care definește când se va declanșa notificarea.
  - `seconds`: Numărul de secunde de la momentul programării.
  - `repeats: true`: Dacă notificarea trebuie să se repete.
  - Pentru declanșări bazate pe dată, se poate folosi un obiect mai complex: `{ year, month, day, hour, minute }`.

</div>

---
layout: cover
---

<script setup>
const code = `
import { View, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// --- IMPORTANT: Setează handler-ul global pentru notificări ---
// Acesta decide ce se întâmplă cu o notificare când aplicația este în prim-plan
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function LocalNotificationsExample() {

  // Programează o notificare simplă, o singură dată
  const scheduleOneTimeNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📬 Ai un e-mail!",
        body: 'Verifică-ți inbox-ul pentru noutăți.',
        data: { screen: 'Inbox' },
      },
      trigger: { seconds: 5 }, // Se declanșează în 5 secunde
    });
    Alert.alert('Notificare programată', 'Vei primi o notificare în 5 secunde.');
  };

  // Programează o notificare repetitivă
  const scheduleRepeatingNotification = async () => {
     await Notifications.scheduleNotificationAsync({
      content: {
        title: "💧 E timpul să bei apă!",
        body: 'Hidratarea este importantă.',
      },
      trigger: { 
        seconds: 60, // Se repetă în fiecare minut
        repeats: true 
      }, 
    });
     Alert.alert('Notificare repetitivă', 'Vei primi o notificare în fiecare minut.');
  }
  
  // Anulează toate notificările programate
  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert('Anulat', 'Toate notificările au fost anulate.');
  };

  return (
    <View style={styles.container}>
      <Button title="Notificare în 5 secunde" onPress={scheduleOneTimeNotification} />
      <Button title="Memento Apă (la 1 min)" onPress={scheduleRepeatingNotification} />
      <Button title="Anulează Toate Notificările" onPress={cancelAllNotifications} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 20 
  },
});
`
const dependencies = 'expo-notifications'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Notificări Locale" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Push Notifications cu Serviciul Expo

:: content ::

Pentru ca un server să poată trimite o notificare push unui dispozitiv, are nevoie de o "adresă" unică pentru acel dispozitiv. Această adresă este **Expo Push Token**.

**Cum funcționează:**

<div class="ns-c-tight">

- **1. Aplicația solicită token-ul**: La pornire (după ce a primit permisiunea), aplicația ta apelează `Notifications.getExpoPushTokenAsync()`.
- **2. Aplicația trimite token-ul la server**: Token-ul primit este trimis și salvat în baza de date a serverului tău, de obicei asociat cu contul utilizatorului.
- **3. Serverul trimite notificarea**: Când serverul vrea să trimită o notificare, face o cerere `POST` către serverele Expo, incluzând token-ul dispozitivului destinatar și conținutul notificării.
- **4. Expo livrează notificarea**: Serverele Expo se ocupă de comunicarea complexă cu serviciile native (APNs pentru iOS, FCM pentru Android) pentru a livra notificarea pe dispozitiv.

</div>
---
layout: center
---

<Excalidraw
  drawFilePath="./12-notifications/push-flow.excalidraw"
  class="w-[600px] mx-auto"
  :darkMode="false"
  :background="false"
/>


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Obținerea Expo Push Token

:: content ::

Funcția **`Notifications.getExpoPushTokenAsync()`** returnează un obiect care conține token-ul. Este o operațiune asincronă.

<AdmonitionType type="warning">

Această funcție va funcționa **doar pe un dispozitiv fizic**, nu în emulator sau simulator.

</AdmonitionType>

---
layout: center
---

```js
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  let token;
  // Verificăm permisiunile
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Nu s-a putut obține token-ul pentru notificări push!');
    return;
  }
  // Obținem token-ul
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);
  // Aici, am trimite token-ul la server-ul nostru
  // await fetch('https://my-server.com/save-token', { method: 'POST', body: { token } });

  return token;
}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Testarea cu Expo Push Notification Tool

:: content ::

Expo oferă o unealtă web simplă pentru a trimite notificări push de test, fără a avea nevoie de un server configurat.

**Pași:**

<div class="ns-c-tight">

- **1. Rulează aplicația**: Rulează codul de pe slide-ul anterior pe un dispozitiv fizic pentru a obține token-ul.
- **2. Copiază Token-ul**: Copiază token-ul afișat în consolă (arată ca `ExponentPushToken[...]`).
- **3. Accesează unealta**: Mergi la [Expo Push Notification Tool](https://expo.dev/notifications).
- **4. Trimite notificarea**: Lipește token-ul în câmpul corespunzător, completează titlul și mesajul, și apasă "Send a Notification".

</div>

---
layout: center
---

<img src="/12-notifications/expo-push-tool.png" class="h-100 mx-auto rounded-lg mt-4" alt="Interfața Expo Push Notification Tool"/>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Trimiterea de pe un Server

:: content ::

Într-o aplicație reală, serverul tău va trimite notificările. Acest lucru se face printr-o cerere `POST` către endpoint-ul Expo: `https://exp.host/--/api/v2/push/send`.

Corpul cererii (`body`) trebuie să fie un array de obiecte, fiecare reprezentând o notificare.

```js
// Exemplu de cod Node.js folosind fetch
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Titlu Original',
    body: 'Și iată niște date!',
    data: { someData: 'merge aici' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });}
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Gestionarea Interacțiunilor

:: content ::

Este esențial să putem reacționa la notificări, fie că aplicația este deschisă, în fundal sau închisă complet. `expo-notifications` oferă "listeners" (ascultători) pentru aceste scenarii.

**Cazuri Principale:**

<div class="ns-c-tight">

- **1. Notificare primită în timp ce aplicația este în prim-plan (foreground)**:
    - Folosim `Notifications.addNotificationReceivedListener(listener)`.
    - Acest ascultător se declanșează când notificarea sosește. Aici poți actualiza UI-ul, de exemplu, afișând un nou mesaj într-o listă de chat.

- **2. Utilizatorul apasă pe notificare (aplicația în fundal sau închisă)**:
    - Folosim `Notifications.addNotificationResponseReceivedListener(listener)`.
    - Acesta este cel mai important ascultător. Se declanșează când utilizatorul interacționează cu notificarea.
    - `listener`-ul primește un obiect `response` care conține `notification.request.content.data`. Aici folosim datele trimise (`data`) pentru a naviga la ecranul corespunzător (**deep linking**).

</div>

<AdmonitionType type="tip">

Ambele funcții returnează un obiect `Subscription` care ar trebui salvat și folosit pentru a elimina ascultătorul la demontarea componentei, pentru a preveni scurgerile de memorie (`Notifications.removeNotificationSubscription(subscription)`).

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: " Deschide Detalii! 📬",
      body: 'Apasă aici pentru a naviga la ecranul de detalii.',
      data: { screen: 'details', itemId: 123 }, // Date pentru deep linking
    },
    trigger: { seconds: 2 },
  });
}

export default function NotificationInteraction() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Listener pentru când notificarea este primită (app în prim-plan)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Notificare primită în prim-plan!');
    });

    // Listener pentru când se apasă pe notificare
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notificare apăsată!');
      const { screen, itemId } = response.notification.request.content.data;
      // Aici ar avea loc navigarea reală
      // Ex: router.push(\`/\${screen}?itemId=\${itemId}\`);
      alert(\`Navigare către \${screen} cu ID-ul \${itemId}\`);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Apasă butonul pentru a trimite o notificare de test.</Text>
      <Button
        title="Trimite Notificare în 2 sec"
        onPress={schedulePushNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
`
const dependencies = 'expo-notifications,expo-router'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Interacțiune Notificări"/>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Concepte Avansate & Bune Practici

:: content ::

<div class="ns-c-tight">

**Canale de Notificare (Android Notification Channels)**
- Pe Android 8.0+, toate notificările trebuie să aparțină unui "canal". Canalele permit utilizatorilor un control granular asupra tipurilor de notificări pe care le primesc (ex: pot dezactiva notificările de "Marketing", dar le pot păstra pe cele de "Mesaje").
- Trebuie să creați canalele înainte de a trimite notificări folosind `Notifications.setNotificationChannelAsync()`.

**Ecusoane (Badges)**
- Ecusonul este numărul afișat pe iconița aplicației. Îl puteți seta manual cu `Notifications.setBadgeCountAsync(count)`.
- Acesta se incrementează adesea la primirea unei notificări push și se resetează la deschiderea aplicației.

**Sunete Personalizate**
- Puteți include fișiere de sunet personalizate în build-ul aplicației și să specificați numele fișierului în `content.sound` pentru a reda un sunet de notificare unic.

</div>

---
layout: center
---

### Bune Practici

<div class="ns-c-tight text-left">

- **Cere Permisiunea în Context**: Nu cere permisiunea la prima deschidere a aplicației. Așteaptă până când utilizatorul încearcă să acceseze o funcționalitate care beneficiază de pe urma notificărilor și explică-i de ce sunt necesare.

- **Fii Relevant și Concis**: Mesajele trebuie să fie scurte, clare și să ofere valoare imediată.

- **Permite Controlul Utilizatorului**: Oferă un ecran de setări în aplicație unde utilizatorii pot alege ce tipuri de notificări doresc să primească.

- **Nu Fi Enervant**: Limitează frecvența notificărilor. Prea multe notificări, în special cele de marketing, vor duce la dezinstalare.

- **Testează**: Verifică cum arată și se comportă notificările pe diferite dispozitive și versiuni de sistem de operare.

</div>