---
transition: slide-left
layout: cover
color: indigo-light
---

# Animații Native în React Native & Expo

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Introducere în Animații Native

:: content ::

Animațiile sunt un element esențial al unei experiențe de utilizare (UX) mobile de calitate. Ele nu sunt doar un detaliu estetic, ci un instrument puternic pentru a comunica cu utilizatorul.

**De ce sunt cruciale animațiile?**

<div class="grid grid-cols-3 gap-4 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Oferă Feedback</h3>
    <p class="text-sm">Confirmă acțiunile utilizatorului (ex: un buton care se scalează la apăsare) și arată starea sistemului (ex: un indicator de încărcare).</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Ghidează Atenția</h3>
    <p class="text-sm">Direcționează privirea utilizatorului către elemente importante sau noi, creând tranziții logice și intuitive între ecrane.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Arată Bine</h3>
    <p class="text-sm">Micro-interacțiunile subtile și animațiile fluide pot transforma o aplicație funcțională într-una memorabilă și plăcută de folosit.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Performanța: Firul de Execuție Nativ

:: content ::

React Native comunică între codul JavaScript și componentele native printr-un "pod" (Bridge) în arhitectura veche sau direct prin JSI în cea nouă. Animațiile complexe, dacă sunt controlate frecvent din JavaScript, pot supraîncărca această comunicare, rezultând în animații sacadate ("janky").

**Soluția este rularea animațiilor pe firul de execuție nativ (UI Thread).**

Acest lucru înseamnă că, odată ce o animație este pornită, întreaga logică a acesteia (calcularea fiecărui cadru) este delegată codului nativ, care rulează independent și mult mai rapid.

<br>

<AdmonitionType type="tip">

API-ul `Animated` din React Native permite acest lucru prin opțiunea **`useNativeDriver: true`**. Librării precum **React Native Reanimated** duc acest concept și mai departe, rulând întreaga logică a animațiilor și gesturilor pe firul de execuție al interfeței grafice.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Conceptele de Bază: `Animated`

:: content ::

API-ul `Animated` este unealta încorporată în React Native pentru a crea animații simple și performante.

**Componentele principale:**

<div class="ns-c-tight">

- **`Animated.Value`**: O valoare specială, "animabilă", care servește drept container pentru un număr. Animațiile modifică această valoare în timp, iar noi o legăm de proprietățile de stil ale componentelor.

- **Componente Animabile**: Pentru a putea aplica o `Animated.Value`, trebuie să folosim versiuni speciale ale componentelor de bază, precum `Animated.View`, `Animated.Text`, `Animated.Image` sau `Animated.ScrollView`.

</div>

<br>

---
layout: center
---

```js
import { useRef } from 'react';
import { Animated } from 'react-native';

function MyComponent() {
  // 1. Inițializezi o valoare animabilă (ex: pentru opacitate)
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // 2. O legi de stilul unei componente animabile
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text>Text care apare treptat</Text>
    </Animated.View>
  );
}
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Tipuri de Animații: `timing`, `spring`, `decay`

:: content ::

`Animated` oferă funcții pentru a defini *cum* se va schimba o valoare în timp.

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">`Animated.timing()`</h3>
<div class="text-sm mt-2">
    
Animație bazată pe timp. Controlezi valoarea finală (`toValue`), durata (`duration`) și curba de viteză (`easing`). Perfectă pentru efecte de fade, mișcare liniară sau culori.

</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">`Animated.spring()`</h3>
<div class="text-sm mt-2">

Simulează fizica unui arc. Controlezi valoarea finală, frecarea (`friction`) și tensiunea (`tension`). Ideală pentru efecte elastice, "bouncy", care se simt naturale.

</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-5 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">`Animated.decay()`</h3>
<div class="text-sm mt-2">

Animație bazată pe o viteză inițială (`velocity`) care decelerează treptat până la oprire. Utilă pentru efecte de aruncare sau scroll inerțial.

</div>
  </div>
</div>

<AdmonitionType type="warning">

Nu uitați să apelați `.start()` pe animația definită pentru a o porni!

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

export default function TimingExample() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true, // ESENȚIAL pentru performanță!
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim, // Legăm opacitatea de valoarea animată
          },
        ]}>
        <Text style={styles.fadingText}>Fade In / Out</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
    width: '100%25'
  },
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Animated.timing" />

---
layout: cover
---

<script setup>
const code = `
import { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button, Easing } from 'react-native';

export default function SpringExample() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animate = () => {
    // Resetăm valoarea înainte de a porni animația
    scaleAnim.setValue(0.5);
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3, // Cât de mult "frânează" arcul
      tension: 100, // Cât de "puternic" este arcul
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ scale: scaleAnim }], // Legăm transformarea de valoarea animată
          },
        ]}>
        <Text style={styles.text}>Spring!</Text>
      </Animated.View>
      <Button title="Rulează Animația Spring" onPress={animate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
  }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Animated.spring" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Combinarea Animațiilor & Interpolarea

:: content ::

API-ul `Animated` oferă funcții pentru a compune animații complexe și pentru a deriva valori.

<div class="grid grid-cols-2 gap-8 mt-4 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Combinare</h3>
    <div class="mt-4 text-left">

- **`Animated.sequence([...])`**: Rulează un array de animații una după alta.
- **`Animated.parallel([...])`**: Rulează animațiile simultan.
- **`Animated.stagger(delay, [...])`**: Rulează animațiile în paralel, dar cu o întârziere între ele.
  
</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Interpolare</h3>
    <div class="mt-4 text-left">

Metoda **`.interpolate()`** este extrem de puternică. Ea permite maparea unei `Animated.Value` de la un interval de intrare (`inputRange`) la un interval de ieșire (`outputRange`).

</div>
<div class="mt-4 text-sm text-left"><strong>Exemplu:</strong> 
    
Pe măsură ce o valoare se mișcă de la 0 la 1, poți face ca o culoare să se schimbe de la 'alb' la 'negru', o opacitate de la 0 la 1 și o rotație de la '0deg' la '360deg', **toate bazate pe aceeași `Animated.Value`**.
    
</div>
  </div>
</div> 

---
layout: cover
---

<script setup>
const code = `
import { useRef } from 'react';
import { Animated, View, StyleSheet, Button, Text } from 'react-native';

export default function InterpolationExample() {
  const animValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    animValue.setValue(0); // Reset
    Animated.timing(animValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false, // Interpolarea culorilor nu este suportată de driver-ul nativ
    }).start();
  };

  // Mapăm valoarea 0-1 la o mișcare de 0-200 pixeli
  const moveInterpolate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  // Mapăm valoarea 0-1 la o rotație de 0-360 grade
  const rotateInterpolate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Mapăm valoarea 0-1 la o schimbare de culoare
  const colorInterpolate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(99, 71, 255)', 'rgb(255, 99, 71)'],
  });

  const animatedStyle = {
    transform: [{ translateX: moveInterpolate }, { rotate: rotateInterpolate }],
    backgroundColor: colorInterpolate,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
         <Text style={styles.text}>WOW</Text>
      </Animated.View>
      <Button title="Pornește Animația" onPress={startAnimation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
      color: 'white',
      fontWeight: 'bold'
  }
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Interpolare" />


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# React Native Reanimated

:: content ::

**React Native Reanimated** este considerată librăria standard pentru animații complexe și bazate pe gesturi. Principalul său avantaj este că permite definirea și rularea animațiilor **complet pe firul de execuție al interfeței (UI Thread)**, eliminând orice dependență de firul JavaScript în timpul animației.

**De ce este mai performantă?**
<div class="ns-c-tight">

- **Ocolește Podul/JSI**: Animațiile rulează 100% nativ, fără a trimite evenimente înainte și înapoi către JS.
- **Ideală pentru Gesturi**: Se integrează perfect cu `React Native Gesture Handler`, permițând crearea de animații fluide și întreruptibile, care răspund instantaneu la interacțiunea utilizatorului (ex: drag-and-drop, swipe-to-delete).
- **Worklets**: Permite scrierea de funcții JavaScript simple (`worklets`) care pot fi executate sincron pe UI Thread.

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title :: 

**Instalare și Configurare:**

:: content ::

Rulați comanda pentru a instala librăria:
```bash
npx expo install react-native-reanimated
```
Apoi, adăugați plugin-ul în `babel.config.js`:
```js
module.exports = function (api) {
  // ...
  return {
    // ...
    plugins: ['react-native-reanimated/plugin'],
  };
};


```
---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Reanimated

:: content ::

Reanimated introduce propriul set de hook-uri și funcții, care înlocuiesc `Animated`.

<div class="ns-c-tight">

- **`useSharedValue`**: Echivalentul lui `Animated.Value`. Creează o valoare "partajată" între UI Thread și JS Thread. Modificarea sa se face prin proprietatea `.value`.

- **`useAnimatedStyle`**: Un hook care definește un obiect de stil animat. Se actualizează automat pe UI Thread ori de câte ori o `SharedValue` folosită în interior se schimbă, fără a cauza o re-randare a componentei React.

- **Funcții de Animație (`with...`)**:
  - **`withTiming(toValue, config)`**: Similar cu `Animated.timing`.
  - **`withSpring(toValue, config)`**: Similar cu `Animated.spring`.

</div>
---
layout: cover
---

<script setup>
const code = `
import { useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

export default function ReanimatedExample() {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: \`\${rotation.value}deg\` }
      ],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(scale.value + 0.2);
    // withRepeat rulează o animație de mai multe ori
    rotation.value = withRepeat(withTiming(rotation.value + 45, { duration: 500 }), 2, true);
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]}>
          <Text style={styles.text}>Reanimated</Text>
      </Animated.View>
      <Button title="Animație" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: 'violet',
    borderRadius: 20,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
      color: 'white',
      fontWeight: 'bold'
  }
});
`
const dependencies = 'react-native-reanimated'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Reanimated" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Lottie: Animații de la Designeri

:: content ::

**Lottie** este o librărie creată de Airbnb care permite redarea animațiilor exportate din **Adobe After Effects** direct în aplicația ta. Designerii pot crea animații vectoriale complexe, le pot exporta ca un fișier **JSON**, iar tu le poți reda nativ.

**Avantaje:**

<div class="ns-c-tight">

- **Animații de Înaltă Calitate**: Permite implementarea unor animații complexe (personaje, tranziții elaborate) care ar fi extrem de dificil de recreat în cod.
- **Separarea Responsabilităților**: Designerii se ocupă de animație, dezvoltatorii de implementare.
- **Fișiere Mici**: Animațiile JSON sunt de obicei foarte mici în comparație cu GIF-uri sau videoclipuri.
- **Scalabilitate**: Fiind vectoriale, animațiile arată perfect la orice dimensiune, fără pierderi de calitate.
- **Control Programatic**: Poți controla redarea (play, pause, loop), progresul și viteza animației din cod.

</div>

**Instalare:**
```bash
npx expo install lottie-react-native
```
---
layout: cover
---

<script setup>
const dependencies = 'lottie-react-native'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Lottie" :assets="assets" />

---

<script setup>

const code = `
import { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function LottieExample() {
  const animation = useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.lottie}
        // Sursă de la LottieFiles: https://lottiefiles.com/animations/react-logo-spinning-360-Rz1t43K1Y1
        source={{ uri: 'https://lottie.host/81f33f6a-1e66-4c4c-a1d2-04e414164b30/fTq0p4jPEX.json' }}
      />
      <View style={styles.buttonContainer}>
        <Button title="Rulează" onPress={() => animation.current?.play()} />
        <Button title="Pauză" onPress={() => animation.current?.pause()} />
        <Button title="Resetează" onPress={() => animation.current?.reset()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: 250,
    height: 250,
    backgroundColor: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%25',
    marginTop: 20,
  },
});
`
const assets = {
    'assets/react-logo.json': 'https://lottie.host/81f33f6a-1e66-4c4c-a1d2-04e414164b30/fTq0p4jPEX.json'
}

const dependencies="lottie-react-native"
</script>
<ExpoPreview :code="code" :assets="assets" name="Exemplu Lottie" :dependencies="dependencies" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Probleme Comune & Soluții

:: content ::

<div class="ns-c-tight">

- **Problemă: Animații sacadate ("janky")**
  - **Soluție:** Asigură-te că folosești **`useNativeDriver: true`** ori de câte ori este posibil cu API-ul `Animated`. Pentru animații complexe, în special cele care răspund la gesturi, migrează la **React Native Reanimated**. Evită să declanșezi re-randări (cu `setState`) în timpul unei animații.

- **Problemă: Animațiile intră în conflict cu gesturile utilizatorului**
  - **Soluție:** Aceasta este o problemă clasică. Soluția standard este combinarea **React Native Reanimated** cu **React Native Gesture Handler**. Aceste două librării sunt concepute să lucreze împreună pentru a crea experiențe fluide și întreruptibile.

- **Problemă: Probleme de configurare a librăriilor (în special Reanimated)**
  - **Soluție:** Urmează **cu strictețe** ghidul oficial de instalare. Cea mai frecventă greșeală este omiterea adăugării plugin-ului `react-native-reanimated/plugin` în `babel.config.js`. După orice modificare a acestui fișier, este necesar să repornești serverul de dezvoltare cu `npx expo start -c` pentru a șterge cache-ul.

</div>
---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Cazuri de Utilizare Populare

:: content ::

<div class="text-sm">

<div class="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
  <div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
    <h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Micro-interacțiuni</h3>
    <p class="text-sm">Animații mici care oferă feedback: un buton de "Like" care se umple și vibrează, un comutator (toggle) care glisează lin, iconițe care se transformă.</p>
  </div>
  <div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
    <h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Tranziții între Ecrane</h3>
    <p class="text-sm">Animații de tip "Shared Element Transition", unde un element (ex: o imagine) se transformă și se mută fluid de pe un ecran pe altul, creând o continuitate vizuală.</p>
  </div>
  <div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
    <h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Onboarding și Tutoriale</h3>
    <p class="text-sm">Carusele animate care introduc utilizatorul în aplicație, evidențiind funcționalitățile cheie într-un mod atractiv și interactiv.</p>
  </div>
  <div class="neversink-indigo-light-scheme p-4 rounded-lg bg-[var(--neversink-bg-color)]">
    <h3 class="font-bold text-lg text-[var(--neversink-highlight-color)]">Feedback și Stări</h3>
    <p class="text-sm">Indicatoare de încărcare (spinners), animații de succes sau eroare (ex: o bifă sau un X animat), bare de progres.</p>
  </div>
</div>
</div>