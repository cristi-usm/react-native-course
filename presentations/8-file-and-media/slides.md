---
transition: slide-left
layout: cover
color: indigo-light
---

# Fișiere și Media pe Dispozitiv

Gestionarea Sistemului de Fișiere, a Galeriei Media și Manipularea Imaginilor

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Sistemul de Fișiere al Dispozitivului

:: content ::

Fiecare aplicație React Native rulează într-un **"sandbox"** (mediu izolat), având propriul său spațiu de stocare privat pe dispozitiv. Interacțiunea cu acest spațiu se realizează prin API-ul oferit de **`expo-file-system`**, o librărie puternică care oferă unelte pentru a citi, scrie și gestiona fișiere și directoare.

**Instalare:**
```bash
npx expo install expo-file-system
```

**Concepte Cheie:**

<div class="ns-c-tight">

- **Izolare (Sandbox)**: Aplicația ta poate accesa direct doar propriul său director. Accesul la alte părți ale sistemului de fișiere necesită permisiuni speciale.
- **Directoare Principale**: `expo-file-system` oferă URI-uri (Uniform Resource Identifier) pentru directoare importante, unde poți stoca date.
- **Operațiuni Asincrone**: Majoritatea operațiunilor cu fișiere sunt asincrone (returnează `Promise`-uri) pentru a nu bloca interfața utilizator.

</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Directoare Esențiale

:: content ::

`expo-file-system` expune două locații principale în care poți opera, fiecare cu un scop specific.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">
    
`FileSystem.documentDirectory`
</h3>
    <p class="mt-4">Un director persistent pentru stocarea fișierelor care trebuie să rămână între sesiunile aplicației. Datele din acest director <strong>nu sunt șterse</strong> de sistemul de operare, cu excepția cazului în care aplicația este dezinstalată.</p>
    <p class="mt-4 text-sm"><strong>Caz de utilizare:</strong> Documente create de utilizator, setări, baze de date locale.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">
    
`FileSystem.cacheDirectory`
</h3>
    <p class="mt-4">Un director pentru fișiere temporare, care nu sunt esențiale. Sistemul de operare <strong>poate șterge</strong> conținutul acestui director oricând, pentru a elibera spațiu, de obicei când memoria dispozitivului este redusă.</p>
    <p class="mt-4 text-sm"><strong>Caz de utilizare:</strong> Imagini descărcate de pe internet, răspunsuri API salvate temporar.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Citirea și Scrierea Fișierelor

:: content ::

Funcțiile de bază pentru a manipula conținutul fișierelor sunt `readAsStringAsync` și `writeAsStringAsync`.

<div class="ns-c-tight">

- **`writeAsStringAsync(fileUri, contents, [options])`**: Scrie un string într-un fișier la o anumită locație (`fileUri`). Dacă fișierul nu există, este creat. Dacă există, conținutul său este suprascris.

- **`readAsStringAsync(fileUri, [options])`**: Citește conținutul unui fișier ca un string. Dacă fișierul nu există, promisiunea va fi respinsă (va arunca o eroare).

</div>

```js
import * as FileSystem from 'expo-file-system';

const fileUri = FileSystem.documentDirectory + 'exemplu.txt';
async function scrieSiCiteste() {
  try {
    // Scrierea fișierului
    await FileSystem.writeAsStringAsync(fileUri, 'Salut, Lume!');
    console.log('Fișier scris cu succes!');

    // Citirea fișierului
    const continut = await FileSystem.readAsStringAsync(fileUri);
    console.log('Conținut citit:', continut); // 'Salut, Lume!'
  } catch (error) {
    console.error('A apărut o eroare:', error);
  }
}
```

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Gestionarea Fișierelor și Directoarelor

:: content ::

Pe lângă citire și scriere, `expo-file-system` oferă funcții pentru a organiza structura de fișiere.

<div class="ns-c-tight">

- **`getInfoAsync(fileUri)`**: Obține metadate despre un fișier sau director, cum ar fi dacă există (`exists`), dacă este un director (`isDirectory`) și dimensiunea sa (`size`).

- **`makeDirectoryAsync(fileUri, [options])`**: Creează un nou director la locația specificată.

- **`readDirectoryAsync(fileUri)`**: Returnează un array de string-uri cu numele tuturor fișierelor și subdirectoarelor dintr-un director.

- **`deleteAsync(fileUri)`**: Șterge un fișier sau un director.

</div>

<AdmonitionType type="info">

Majoritatea funcțiilor aruncă o eroare dacă locația părinte nu există. Folosiți opțiunea `intermediates: true` la `makeDirectoryAsync` pentru a crea toate directoarele necesare din cale.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const journalFileUri = FileSystem.documentDirectory + 'journal.txt';

export default function JournalApp() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Încărcare jurnal...');

  // Funcție pentru a salva intrarea
  const saveEntry = async () => {
    try {
      await FileSystem.writeAsStringAsync(journalFileUri, text);
      setStatus('Jurnal salvat cu succes!');
    } catch (error) {
      Alert.alert('Eroare', 'Nu s-a putut salva jurnalul.');
    }
  };

  // Funcție pentru a încărca intrarea la pornire
  const loadEntry = async () => {
    try {
      const { exists } = await FileSystem.getInfoAsync(journalFileUri);
      if (exists) {
        const content = await FileSystem.readAsStringAsync(journalFileUri);
        setText(content);
        setStatus('Jurnal încărcat.');
      } else {
        setStatus('Scrie prima ta intrare în jurnal!');
      }
    } catch (error) {
      Alert.alert('Eroare', 'Nu s-a putut încărca jurnalul.');
    }
  };

  useEffect(() => {
    loadEntry();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jurnalul Meu Simplu</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Scrie ceva..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Salvează Intrarea" onPress={saveEntry} />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 40,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15,
    backgroundColor: 'white'
  },
  status: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray'
  }
});
`
const dependencies = 'expo-file-system'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Jurnal Simplu" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Interacțiunea cu Media Library

:: content ::

Pentru a interacționa cu galeria principală de fotografii și videoclipuri a dispozitivului, folosim librăria **`expo-media-library`**. Aceasta oferă funcționalități pentru a citi media existentă și pentru a salva fișiere noi.

**Instalare:**
```bash
npx expo install expo-media-library
```

<AdmonitionType type="warning">

Orice interacțiune cu galeria media necesită **permisiuni** explicite din partea utilizatorului. `expo-media-library` oferă funcții precum `requestPermissionsAsync()` și `getPermissionsAsync()` pentru a gestiona acest flux. Fără permisiune, orice operațiune va eșua.

</AdmonitionType>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Preluarea Media din Galerie

:: content ::

Funcția principală pentru a citi din galerie este **`getAssetsAsync(options)`**. Aceasta returnează o listă paginată de obiecte "Asset", fiecare reprezentând o fotografie sau un videoclip.

**Opțiuni de Filtrare și Paginare:**

<div class="ns-c-tight">

- **`first`**: Numărul de elemente de preluat (ex: `25`).
- **`after`**: ID-ul unui asset după care să înceapă preluarea (pentru paginare).
- **`mediaType`**: Filtrează după tip: `['photo', 'video']`.
- **`sortBy`**: Sortează rezultatele, de obicei după data creării: `[[MediaLibrary.SortBy.creationTime, false]]` (false pentru descrescător).

</div>

**Obiectul Asset:**

<div class="ns-c-tight">

Un asset conține informații esențiale:
- **`id`**: Un identificator unic.
- **`uri`**: URI-ul local al fișierului, care poate fi folosit într-o componentă `<Image>`.
- **`mediaType`**: `'photo'` sau `'video'`.
- **`width`** și **`height`**: Dimensiunile media.
- **`creationTime`**: Data la care a fost creat.
</div>


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Salvarea Media și Organizarea în Albume

:: content ::

Pe lângă citire, putem adăuga fișiere noi în galeria utilizatorului.

<div class="ns-c-tight">

- **`createAssetAsync(localUri)`**: Salvează un fișier de la o locație locală (ex: din `FileSystem.cacheDirectory`) în galeria media. Returnează un obiect Asset nou creat.

- **`createAlbumAsync(albumName, asset, copyAsset)`**: Creează un album nou. Dacă `asset` este furnizat, acesta va fi primul element din album.

- **`addAssetsToAlbumAsync(assets, albumId, copyAssets)`**: Adaugă unul sau mai multe asset-uri într-un album existent.

</div>

<AdmonitionType type="info">

Un flux comun este: descarci o imagine de pe internet în `cacheDirectory` folosind `expo-file-system`, apoi folosești `createAssetAsync` cu URI-ul din cache pentru a o salva în galeria utilizatorului.

</AdmonitionType>

---
layout: cover
---

<script setup>
const code = `
import { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Text, Button, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function GalleryApp() {
  const [photos, setPhotos] = useState([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const getPhotos = async () => {
    if (permissionResponse.status !== 'granted') {
      const response = await requestPermission();
      if (response.status !== 'granted') {
        Alert.alert('Permisiune necesară', 'Avem nevoie de permisiune pentru a accesa galeria.');
        return;
      }
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: 'photo',
      sortBy: ['creationTime'],
      first: 20,
    });
    setPhotos(media.assets);
  };

  useEffect(() => {
    getPhotos();
  }, [permissionResponse]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ultimele 20 de Fotografii</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.image} />
        )}
        ListEmptyComponent={<Text>Nu s-au găsit fotografii sau permisiunea a fost refuzată.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    margin: 2,
  },
});
`
const dependencies = 'expo-media-library'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Galerie Foto" />


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Manipularea Imaginilor

:: content ::

Librăria **`expo-image-manipulator`** oferă un API simplu pentru a efectua operațiuni de bază pe imagini, cum ar fi redimensionarea, decuparea (crop) sau rotirea. Este o unealtă excelentă pentru a pregăti imaginile înainte de a le afișa, încărca pe un server sau salva.

**Instalare:**
```bash
npx expo install expo-image-manipulator
```

Funcția principală, **`manipulateAsync(uri, actions, saveOptions)`**, ia URI-ul unei imagini (local sau de pe internet), un array de acțiuni de efectuat și opțiuni de salvare, apoi returnează un obiect cu noua imagine manipulată.

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Acțiuni de Manipulare

:: content ::

Parametrul `actions` este un array de obiecte, fiecare definind o transformare.

<div class="ns-c-tight">

- **Redimensionare (`resize`)**:
  `{ resize: { width: 300 } }` sau `{ resize: { height: 300 } }`. Menține proporțiile.

- **Decupare (`crop`)**:
  `{ crop: { originX: 20, originY: 20, width: 100, height: 100 } }`. Decupează o regiune specifică.

- **Rotire (`rotate`)**:
  `{ rotate: 90 }`. Rotește imaginea cu numărul de grade specificat.

- **Răsturnare (`flip`)**:
  `{ flip: ImageManipulator.FlipType.Horizontal }` sau `Vertical`.

</div>

**Opțiuni de Salvare:**
- **`format`**: `ImageManipulator.SaveFormat.JPEG` sau `PNG`.
- **`compress`**: O valoare între `0` (calitate minimă) și `1` (calitate maximă).
- **`base64`**: Dacă `true`, include datele imaginii în format base64 în rezultat.

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Image, Button, StyleSheet, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ImageManipulatorApp() {
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setEditedImage(null); // Resetează imaginea editată
    }
  };

  const cropToSquare = async () => {
    if (!image) return;
    
    const shorterSide = Math.min(image.width, image.height);
    
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [
        {
          crop: {
            originX: (image.width - shorterSide) / 2,
            originY: (image.height - shorterSide) / 2,
            width: shorterSide,
            height: shorterSide,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setEditedImage(manipResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editor Poză Profil</Text>
      <Button title="Alege o Imagine" onPress={pickImage} />
      
      {image && !editedImage && (
        <Image source={{ uri: image.uri }} style={styles.image} />
      )}
      {editedImage && (
         <Image source={{ uri: editedImage.uri }} style={styles.image} />
      )}

      {image && (
        <Button title="Decupează Pătrat" onPress={cropToSquare} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  image: { width: 250, height: 250, resizeMode: 'contain' },
});
`
const dependencies = 'expo-image-picker,expo-image-manipulator'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Editor Profil" />


---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Descărcarea și Salvarea Fișierelor

:: content ::

Pentru a gestiona fișiere de pe internet, revenim la **`expo-file-system`**. Funcția **`downloadAsync(uri, fileUri, [options])`** este special concepută pentru acest scop.

<div class="ns-c-tight">

- **`uri`**: URL-ul resursei de descărcat.
- **`fileUri`**: Locația de pe dispozitiv unde va fi salvat fișierul (ex: în `cacheDirectory`).
- **`options`**: Opțiuni suplimentare, cum ar fi `headers` pentru cerere.

</div>

**Urmărirea Progresului:**
Pentru a oferi feedback utilizatorului în timpul descărcărilor lungi, putem folosi `FileSystem.createDownloadResumable`. Aceasta returnează un obiect care are o funcție `downloadAsync()` și un `callback` pentru a urmări progresul.

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const imageUrl = 'https://picsum.photos/seed/picsum/400/400';

export default function DownloadApp() {
  const [status, setStatus] = useState('În așteptare...');
  const [downloadedUri, setDownloadedUri] = useState(null);

  const downloadAndSave = async () => {
    setStatus('Se descarcă...');
    setDownloadedUri(null);
    const fileUri = FileSystem.cacheDirectory + 'downloaded_image.jpg';

    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      setStatus('Descărcare finalizată! Se salvează în galerie...');
      setDownloadedUri(uri);
      
      await MediaLibrary.requestPermissionsAsync();
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Imagini Descărcate', asset, false);

      setStatus('Imagine salvată cu succes în galerie!');
    } catch (error) {
      console.error(error);
      Alert.alert('Eroare', 'Nu s-a putut descărca sau salva imaginea.');
      setStatus('Eroare.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descărcător de Imagini</Text>
      <Button title="Descarcă și Salvează Imagine" onPress={downloadAndSave} />
      {downloadedUri && (
          <Image source={{ uri: downloadedUri }} style={styles.image} />
      )}
      <Text style={styles.status}>{status}</Text>
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
  status: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center'
  },
  image: {
      width: 200,
      height: 200,
      borderRadius: 10
  }
});
`
const dependencies = 'expo-file-system,expo-media-library'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Descărcare" />

---
layout: center
---

# Atelier Practic: Mini-Proiect "Meme Generator"

**Obiectiv**: Combinarea tuturor conceptelor învățate într-o singură aplicație funcțională.

**Structura Aplicației**:
<div class="ns-c-tight">

- **Pasul 1: Selectarea Imaginii**
  - Utilizatorul alege o fotografie din galeria sa media (`expo-media-library`).
- **Pasul 2: Crearea Meme-ului**
  - Aplicația afișează fotografia selectată.
  - Două câmpuri `TextInput` permit utilizatorului să introducă text pentru partea de sus și de jos.
- **Pasul 3: Salvarea**
  - La apăsarea unui buton "Salvează", aplicația va:
    1.  Crea o "captură de ecran" a vederii care conține imaginea și textul suprapus (folosind librăria `react-native-view-shot`).
    2.  Salva imaginea finală (meme-ul) într-un album nou numit "Memes" în galeria utilizatorului (`expo-media-library`).

</div>

```bash
npx expo install react-native-view-shot
```