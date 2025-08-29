---
transition: slide-left
layout: cover
color: indigo-light
---

### Permisiuni și Accesarea API-urilor Dispozitivelor

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Introducere în API-uri Native & Permisiuni

:: content ::

**API-urile Native** (Application Programming Interfaces) sunt puntea de legătură între codul nostru JavaScript și funcționalitățile hardware ale dispozitivului. Ele permit aplicației noastre React Native să acceseze componente precum camera foto, senzorul GPS, galeria media, contactele și multe altele.

**De ce sunt necesare permisiunile?**

<div class="grid grid-cols-3 gap-4 mt-8">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Confidențialitatea Utilizatorului</h3>
    <p class="text-sm">Utilizatorii trebuie să aibă control asupra datelor lor. Permisiunile asigură că aplicația nu accesează informații sensibile fără consimțământ explicit.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Încredere și Transparență</h3>
    <p class="text-sm">O aplicație care solicită permisiuni în mod clar și contextual construiește încredere. Utilizatorul înțelege de ce o anumită funcționalitate este necesară.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-bg-color)] p-4 rounded-lg text-center">
    <h3 class="text-lg font-bold text-[var(--neversink-text-color)]">Securitatea Sistemului</h3>
    <p class="text-sm">Sistemele de operare (iOS și Android) impun un model strict de permisiuni pentru a preveni abuzurile și a proteja integritatea platformei.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Fluxul Modern de Permisiuni în Expo

:: content ::

Expo simplifică dramatic gestionarea permisiunilor prin **hook-uri specifice fiecărui modul** (ex: `useCameraPermissions`). Acestea urmează un model universal și predictibil.

**Modelul Universal: Verifică -> Solicită -> Gestionează**

**Stările Cheie ale Permisiunilor:**

<div class="ns-c-tight">

- **`undetermined`**: Starea inițială. Aplicația nu a cerut încă permisiunea, iar utilizatorul nu a luat nicio decizie.
- **`granted`**: Utilizatorul a acordat permisiunea. API-ul poate fi accesat.
- **`denied`**: Utilizatorul a refuzat permisiunea. Aceasta poate fi o refuzare temporară (poate fi solicitată din nou) sau permanentă (cu opțiunea "Nu mai întreba niciodată").

</div>

---
layout: default
---

<Excalidraw
  drawFilePath="./11-permissions-and-native-apis/permissions-flow.excalidraw"
  class="w-[320px] mx-auto"
  :darkMode="false"
  :background="false"
/>


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Accesarea Camerei cu `expo-camera`

:: content ::

Librăria `expo-camera` oferă acces complet la camera dispozitivului, permițând afișarea previzualizării (viewfinder), capturarea de fotografii și înregistrarea de videoclipuri.

**1. Instalare:**

```bash
npx expo install expo-camera
```

**2. Solicitarea Permisiunii cu Hook-ul `useCameraPermissions`**

Acest hook returnează un array cu două elemente:
<div class="ns-c-tight">

- **`status`**: Obiectul care conține starea curentă a permisiunii.
- **`requestPermission`**: O funcție care, atunci când este apelată, deschide dialogul nativ pentru a cere permisiunea.

</div>

<br/>
<AdmonitionType type="info">

Pe lângă permisiunea pentru cameră, adesea este necesară și permisiunea pentru microfon (`useMicrophonePermissions`) dacă doriți să înregistrați video cu sunet.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function CameraExample() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    // Permisiunile se încarcă încă
    return <View />;
  }

  if (!permission.granted) {
    // Permisiunile nu au fost acordate încă
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Avem nevoie de permisiunea ta pentru a folosi camera</Text>
        <Button onPress={requestPermission} title="Acordă permisiunea" />
      </View>
    );
  }
  
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      {capturedPhoto ? (
        <View style={styles.previewContainer}>
            <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
            <Button title="Fă alta" onPress={() => setCapturedPhoto(null)} />
        </View>
      ) : (
        <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Fă o poză</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  camera: { 
    flex: 1, 
    width: '100%25' 
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10
  },
  text: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white' 
  },
  previewContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 20 
  },
  previewImage: { 
    width: 300, 
    height: 400, 
    borderRadius: 10 
  }
});
`
const dependencies = 'expo-camera'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Camera" />


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Accesarea Locației cu `expo-location`

:: content ::

Librăria `expo-location` oferă acces la serviciile de localizare ale dispozitivului (GPS, Wi-Fi, rețea celulară) pentru a obține coordonatele curente.

**1. Instalare:**

```bash
npx expo install expo-location
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Diferența Critică: Foreground vs. Background

:: content ::

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Locație în Prim-Plan (Foreground)</h3>
    <div class="mt-4">
    
Permite accesul la locație **doar atunci când aplicația este deschisă și vizibilă** pentru utilizator. Aceasta este cea mai comună și mai puțin invazivă formă de acces.

</div>
    <p class="mt-4 text-sm"><strong>Exemplu:</strong> O aplicație de hărți care arată poziția curentă.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Locație în Fundal (Background)</h3>
    <div class="mt-4">
    
Permite accesul la locație **chiar și atunci când aplicația este închisă sau rulează în fundal**. Necesită o permisiune separată și o justificare foarte clară, fiind supusă unor reguli stricte în magazinele de aplicații.

</div>
    <p class="mt-4 text-sm"><strong>Exemplu:</strong> O aplicație de fitness care urmărește o alergare.</p>
  </div>
</div>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import * as Location from 'expo-location';

export default function LocationExample() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permisiunea de a accesa locația a fost refuzată');
      setLoading(false);
      return;
    }

    try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
    } catch(error) {
        setErrorMsg('Nu s-a putut obține locația. Asigură-te că serviciile de localizare sunt activate.');
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  let text = 'În așteptare...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords, null, 2);
  }

  return (
    <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size="large" />
        ) : (
            <Text style={styles.paragraph}>{text}</Text>
        )}
      <Button title="Reîncarcă Locația" onPress={getLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace'
  },
});
`
const dependencies = 'expo-location'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Locație" />


---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Accesarea Galeriei cu `expo-image-picker`

:: content ::

Librăria `expo-image-picker` oferă o interfață simplă pentru a accesa galeria media (fotografii și videoclipuri) a dispozitivului, permițând utilizatorului să selecteze unul sau mai multe fișiere.

**1. Instalare:**

```bash
npx expo install expo-image-picker
```

**2. Solicitarea Permisiunii**

Spre deosebire de alte module, `expo-image-picker` gestionează adesea permisiunile **implicit**. Atunci când apelați o funcție precum `launchImageLibraryAsync`, aceasta va solicita automat permisiunea dacă nu a fost deja acordată. Totuși, este o bună practică să o solicitați și manual pentru un control mai bun.

**Funcția Principală: `launchImageLibraryAsync(options)`**

Aceasta deschide interfața nativă a galeriei și returnează un `Promise` care se rezolvă cu un obiect ce conține informații despre fișierele selectate.

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Nu este necesară solicitarea permisiunilor, ImagePicker o va face automat
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Doar imagini
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert('Info', 'Nu ai selectat nicio imagine.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selectează o imagine de profil</Text>
      <Button title="Alege o imagine din galerie" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: { 
    width: 200, 
    height: 200, 
    borderRadius: 100 
  },
});
`
const dependencies = 'expo-image-picker'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Image Picker" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Gestionarea Refuzului Permisiunilor

:: content ::

Ce se întâmplă când un utilizator refuză o permisiune, în special cu opțiunea "Nu mai întreba niciodată"? În acest caz, aplicația nu mai poate afișa dialogul de solicitare. Singura modalitate prin care utilizatorul poate acorda permisiunea este să meargă manual în **setările dispozitivului**.

**Rolul nostru este să gestionăm această situație cu grație:**
<div class="ns-c-tight">

1.  **Detectarea Refuzului Permanent**: Hook-urile de permisiuni (ex: `useCameraPermissions`) oferă o proprietate `canAskAgain` în obiectul de status. Dacă `status` este `denied` și `canAskAgain` este `false`, înseamnă că permisiunea a fost refuzată permanent.

2.  **Oferirea de Feedback Clar**: Afișați un mesaj în interfață care explică de ce funcționalitatea nu este disponibilă și cum poate fi activată.

3.  **Utilizarea `Linking` pentru a Ajuta Utilizatorul**: API-ul `Linking` poate deschide direct pagina de setări a aplicației, facilitând procesul pentru utilizator. `Linking.openSettings()` este funcția dedicată pentru acest scop.

</div>
---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { Button, Text, View, StyleSheet, Linking, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function HandleDenialExample() {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const handlePress = async () => {
    if (!status) return; // Status is null on first render

    if (status.granted) {
      Alert.alert('Succes', 'Permisiunea este deja acordată!');
      return;
    }

    if (status.canAskAgain) {
      // Putem cere din nou permisiunea
      const { status: newStatus } = await requestPermission();
      if (newStatus === 'granted') {
          Alert.alert('Succes', 'Permisiunea a fost acordată!');
      }
    } else {
      // Permisiunea a fost refuzată permanent
      Alert.alert(
        'Permisiune Refuzată',
        'Pentru a folosi această funcționalitate, trebuie să activezi permisiunea de locație din setările aplicației.',
        [
          { text: 'Anulează', style: 'cancel' },
          { text: 'Mergi la Setări', onPress: () => Linking.openSettings() }
        ]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Starea curentă a permisiunii: {status?.status || 'loading...'}</Text>
      <Button title="Solicită Permisiune Locație" onPress={handlePress} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 20 
  }
});
`
const dependencies = 'expo-location'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Gestionare Refuz" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Configurare & Bune Practici

:: content ::

**1. Adăugarea Descrierilor de Utilizare în `app.json`**

Atât iOS, cât și Android necesită o justificare clară pentru solicitarea permisiunilor sensibile. Aceste mesaje sunt afișate utilizatorului în dialogul de solicitare. Ele se configurează în `app.json`.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Permite $(PRODUCT_NAME) să acceseze camera ta pentru a face fotografii."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permite $(PRODUCT_NAME) să folosească locația ta pentru a-ți arăta locația pe hartă."
        }
      ]
    ]
  }
}
```

---
layout: default
---

**2. Solicitarea Permisiunilor "În Context"**

**Nu** solicitați toate permisiunile la pornirea aplicației. Cea mai bună practică este să ceri permisiunea **exact în momentul** în care utilizatorul încearcă să folosească o funcționalitate care depinde de ea. (Ex: cere acces la cameră doar când utilizatorul apasă butonul "Fă o poză").

**3. Folosirea unui "Priming Prompt" (Dialog de Pregătire)**

<div class="flex">

<div>

Înainte de a afișa dialogul nativ de permisiune (care poate fi refuzat permanent), este adesea util să afișezi propriul tău dialog explicativ.

Acest "priming prompt" explică **de ce** permisiunea este necesară și ce beneficii aduce. Dacă utilizatorul este de acord, abia atunci declanșezi solicitarea nativă. Acest lucru crește semnificativ rata de acceptare.

</div>

<div>

<img src="/11-permissions-and-native-apis/promp-priming.png" class="w-100" />

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Considerații Specifice Platformei

:: content ::

Deși Expo uniformizează multe aspecte, sistemele de permisiuni ale iOS și Android au diferențe fundamentale pe care trebuie să le cunoaștem.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Android</h3>
    <div class="mt-4">
    
Oferă permisiuni mai granulare. De exemplu, pentru media, există permisiuni separate pentru imagini (`READ_MEDIA_IMAGES`), video (`READ_MEDIA_VIDEO`), etc. Refuzul permanent ("Don't ask again") este o opțiune explicită pentru utilizator.

</div>
    <p class="mt-4 text-sm"><strong>Cheie:</strong> Flexibilitate, dar necesită gestionarea mai multor cazuri specifice.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">iOS</h3>
    <div class="mt-4">
    
Grupează permisiunile mai larg (ex: o singură permisiune pentru `Photo Library`). Sistemul decide când o permisiune este refuzată permanent (de obicei, după al doilea refuz). Nu există o opțiune vizibilă "Nu mai întreba niciodată".

</div>
    <p class="mt-4 text-sm"><strong>Cheie:</strong> Simplitate pentru utilizator, dar mai puține oportunități de a re-solicita permisiunea.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Hook-uri Customizate pentru Permisiuni

:: content ::

Pentru a menține codul curat și reutilizabil, este o bună practică să încapsulăm întreaga logică de gestionare a unei permisiuni într-un **hook customizat**. Acest hook poate gestiona verificarea, solicitarea și tratarea refuzului, expunând o interfață simplă componentei care îl folosește.

**Avantajele unui Hook Customizat:**
<div class="ns-c-tight">

- **Reutilizabilitate**: Poate fi folosit în orice componentă care necesită acces la acea funcționalitate.
- **Separarea Responsabilităților**: Logica permisiunilor este separată de logica de UI a componentei.
- **Cod Mai Simplu**: Componenta finală devine mult mai lizibilă, având de gestionat doar stările expuse de hook (ex: `isGranted`, `isLoading`).

</div>
<br/>

Un hook customizat `useLocationPermission` ar putea expune: `permissionStatus`, `isGranted`, `isLoading` și `request`.

---
layout: cover
---

<script setup>
const code = `
import { useCallback, useState } from 'react';
import { Linking, Alert, View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

// 1. Hook-ul customizat care încapsulează logica
const useLocationPermission = () => {
  const [permissionInfo, requestPermission] = Location.useForegroundPermissions();

  const handleRequest = useCallback(async () => {
    if (!permissionInfo) return false;

    if (permissionInfo.granted) {
      Alert.alert('Info', 'Permisiunea este deja acordată.');
      return true;
    }
    
    if (permissionInfo.canAskAgain) {
      const { granted } = await requestPermission();
      return granted;
    } else {
      // A fost refuzată permanent, ghidăm utilizatorul spre setări
      Alert.alert(
        'Permisiune Necesară',
        'Pentru a continua, trebuie să activezi manual permisiunea din setările aplicației.',
        [
          { text: 'Anulează', style: 'cancel' },
          { text: 'Mergi la Setări', onPress: () => Linking.openSettings() }
        ]
      );
      return false;
    }
  }, [permissionInfo, requestPermission]);

  return { 
    isGranted: permissionInfo?.granted, 
    status: permissionInfo?.status,
    request: handleRequest 
  };
};

// 2. Componenta care folosește hook-ul
export default function CustomHookExample() {
  const { isGranted, status, request } = useLocationPermission();
  const [location, setLocation] = useState(null);

  const fetchLocation = async () => {
    const granted = await request(); // Solicită permisiunea dacă e necesar
    if (granted) {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Status Permisiune: {status}</Text>
      <Button title="Obține Locația" onPress={fetchLocation} />
      {isGranted && location && (
        <Text style={styles.locationText}>
          Lat: {location.latitude}, Lon: {location.longitude}
        </Text>
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
    fontSize: 16, 
    textAlign: 'center' 
  },
  locationText: { 
    fontSize: 14, 
    color: 'green', 
    marginTop: 10 
  }
});
`
const dependencies = 'expo-location'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Hook Customizat" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Combinarea API-urilor: Workshop

:: content ::

Un caz de utilizare real implică adesea combinarea mai multor API-uri și, implicit, a mai multor permisiuni. Să construim un mic flux de "geo-tagging" pentru o fotografie.

**Fluxul de Lucru:**
<div class="ns-c-tight">

1.  **Solicităm Permisiuni**: La început, cerem acces atât la **Galerie** (`expo-image-picker`), cât și la **Locație** (`expo-location`).
2.  **Selectarea Imaginii**: Utilizatorul alege o imagine din galerie folosind `ImagePicker`.
3.  **Obținerea Locației**: Imediat după selectare, obținem coordonatele GPS curente.
4.  **Afișarea Rezultatului**: Afișăm imaginea selectată împreună cu coordonatele obținute.
5.  **Salvare (conceptual)**: Într-o aplicație completă, am putea folosi `expo-media-library` pentru a salva o copie a imaginii cu noile metadate de locație.

</div>
<br/>
Acest exemplu demonstrează cum permisiunile multiple pot fi gestionate într-un singur ecran pentru a crea o funcționalitate complexă.

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function CombinedApiExample() {
  const [pickedImage, setPickedImage] = useState(null);
  const [location, setLocation] = useState(null);
  
  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();

  const handlePickAndLocate = async () => {
    // 1. Verificăm și cerem permisiunile necesare
    if (mediaPermission.status !== 'granted') {
      const { status } = await requestMediaPermission();
      if (status !== 'granted') {
        Alert.alert('Eroare', 'Permisiunea pentru galerie este necesară!');
        return;
      }
    }
    if (locationPermission.status !== 'granted') {
      const { status } = await requestLocationPermission();
      if (status !== 'granted') {
        Alert.alert('Eroare', 'Permisiunea pentru locație este necesară!');
        return;
      }
    }
    
    // 2. Selectăm imaginea
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.canceled) return;
    setPickedImage(result.assets[0].uri);

    // 3. Obținem locația
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geo-Tag Fotografie</Text>
      <Button title="Selectează Imagine și Adaugă Locația" onPress={handlePickAndLocate} />
      {pickedImage && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: pickedImage }} style={styles.image} />
          {location && (
            <Text style={styles.locationText}>
              Locație: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    gap: 10
  },
  image: { 
    width: 250, 
    height: 250, 
    borderRadius: 10
  },
  locationText: {
      fontSize: 16,
      color: 'blue'
  }
});
`
const dependencies = 'expo-image-picker,expo-location'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Combinare API-uri" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Sumar și Concluzii

:: content ::

<div class="ns-c-tight">

- **Permisiunile sunt Non-Negociabile**: Sunt un aspect fundamental al dezvoltării mobile moderne, esențiale pentru respectul față de utilizator și funcționarea corectă a aplicației.

- **Expo Simplifică Procesul**: Prin hook-uri specifice (`use...Permissions`), Expo oferă un model standardizat și ușor de utilizat pentru a gestiona întregul ciclu de viață al permisiunilor.

- **Contextul este Rege**: Solicitați permisiunile doar atunci când sunt necesare pentru o funcționalitate pe care utilizatorul dorește să o acceseze. Creșteți rata de acceptare folosind dialoguri de pregătire ("priming prompts").

- **Gestionați Refuzul cu Grație**: Fiți pregătiți pentru cazul în care un utilizator refuză permanent o permisiune. Oferiți o explicație clară și o scurtătură către setările aplicației.

- **Configurarea este Obligatorie**: Nu uitați să adăugați justificările necesare în `app.json` pentru a asigura că dialogurile de sistem sunt afișate corect.

</div>