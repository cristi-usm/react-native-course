---
transition: slide-left
layout: cover
color: indigo-light
---

## Formulare "Controlate"

Formulare și Validări - Gestionarea input-ului utilizatorului

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Formulare "Controlate" (Controlled Components)

:: content ::

Într-un formular "controlat", starea (`state`) componentei React este **"unica sursă de adevăr"** (`single source of truth`) pentru elementele de input. Fluxul de date este unidirecțional: starea controlează valoarea input-ului, iar orice modificare a input-ului este gestionată de o funcție care actualizează starea.

**Caracteristici Cheie:**

<div class="ns-c-tight">

- Valoarea input-ului este legată direct de o variabilă de stare (ex: `useState`).
- Proprietatea `onChangeText` este folosită pentru a actualiza starea la fiecare apăsare de tastă.
- Componenta are control total și instantaneu asupra datelor din formular.

</div>

Această abordare este considerată standardul în React, deoarece se aliniază perfect cu modelul declarativ: **UI-ul este o funcție a stării**.

---
layout: cover
---

<script setup>
const code = `
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function ControlledForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    Alert.alert('Date Trimise', \`Email: \${email}\\nParolă: \${password}\`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Controlat</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email} // Valoarea este legată de state
        onChangeText={setEmail} // Starea se actualizează la fiecare modificare
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Parolă"
        value={password} // Valoarea este legată de state
        onChangeText={setPassword} // Starea se actualizează la fiecare modificare
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Formular Controlat" />

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Avantaje și Dezavantaje (Controlat)

:: content ::

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Avantaje </h3>
    <div class="ns-c-tight text-left mt-4">
    
- **Validare în Timp Real**: Poți valida input-ul la fiecare modificare, oferind feedback instant utilizatorului.
- **Logică Condiționată**: Este ușor să implementezi funcționalități precum dezactivarea butonului de submit până când formularul este valid.
- **Control Total**: Ai control complet pentru a formata sau manipula valoarea input-ului (ex: formatarea numerelor de telefon).
- **Stare Unificată**: Starea formularului este centralizată și ușor de accesat în orice moment.

</div>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Dezavantaje </h3>
    <div class="ns-c-tight text-left mt-4">
    
- **Performanță**: Poate duce la re-randări la fiecare apăsare de tastă, ceea ce ar putea fi o problemă pentru formulare extrem de complexe sau pe dispozitive mai lente.
- **Cod Repetitiv (Boilerplate)**: Necesită mai mult cod pentru a configura formulare simple (o stare și un handler pentru fiecare input).
</div>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Formulare "Necunoscute" (Uncontrolled Components)

:: content ::

Într-un formular "necontrolat", datele din formular sunt gestionate direct de **DOM-ul nativ**, nu de starea componentei React. Pentru a accesa valorile, folosim o **referință (`ref`)** atașată elementului de input, de obicei atunci când formularul este trimis.

**Caracteristici Cheie:**

<div class="ns-c-tight">

- Componenta nu gestionează valoarea input-ului.
- O referință (`useRef`) este atașată elementului pentru a accesa direct valoarea sa.
- Este o abordare mai apropiată de modul în care funcționează formularele HTML tradiționale.

</div>

Această metodă este mai puțin "React-ish", deoarece ocolim modelul declarativ și interacționăm imperativ cu elementul nativ.

---
layout: cover
---

<script setup>
const code = `
import { useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function UncontrolledForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    Alert.alert('Date Citite din Ref', \`Email: \${email}\\nParolă: \${password}\`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Necunoscut</Text>
      <TextInput
        ref={emailRef}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        ref={passwordRef}
        style={styles.input}
        placeholder="Parolă"
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
`
</script>

<ExpoPreview :code="code" name="Exemplu Formular Necunoscut" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Avantaje și Dezavantaje (Necunoscut)

:: content ::

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Avantaje </h3>
        <div class="ns-c-tight text-left mt-4">

- **Simplitate**: Necesită mai puțin cod pentru formulare de bază, fără stări sau funcții `onChange`.
- **Performanță**: Evită re-randările la fiecare apăsare de tastă, fiind teoretic mai performant.
- **Integrare Ușoară**: Poate fi util la integrarea cu librării non-React care se bazează pe manipularea directă a DOM-ului.
</div>

  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Dezavantaje </h3>
    <div class="ns-c-tight text-left mt-4">

- **Control Limitat**: Este dificil sau imposibil să implementezi validare în timp real, formatare dinamică sau butoane de submit condiționale.
- **Abordare Imperativă**: Nu urmează stilul declarativ tipic al React. Codul devine mai greu de urmărit pe măsură ce complexitatea crește.
- **Ocolirea React**: Managementul stării este lăsat pe seama DOM-ului nativ, ceea ce poate duce la inconsecvențe.
</div>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---
:: title ::

# Librării pentru Formulare & Validare

:: content ::

Deși putem construi formulare de la zero, pentru scenarii mai complexe, este recomandat să folosim o librărie specializată. Acestea gestionează starea, validarea și trimiterea datelor, economisind timp și reducând codul repetitiv.

Cele mai populare librării sunt adesea folosite împreună cu unelte de validare a schemelor, precum **Yup** sau **Zod**, pentru a defini regulile de validare într-un mod declarativ.

<div class="grid grid-cols-2 gap-8 mt-8 text-center">
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">Formik</h3>
    <p class="mt-4">O librărie completă și matură. Gestionează valorile, erorile și starea de trimitere a formularului, fiind foarte populară în ecosistemul React.</p>
  </div>
  <div class="neversink-indigo-light-scheme bg-[var(--neversink-admon-bg-color)] p-6 rounded-lg border border-[var(--neversink-admon-border-color)]">
    <h3 class="text-xl font-bold text-[var(--neversink-text-color)]">React Hook Form</h3>
    <p class="mt-4">O librărie modernă, ușoară și performantă, care utilizează hook-uri. Este cunoscută pentru ușurința în utilizare și pentru re-randările minime.</p>
  </div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Formik

:: content ::

**Formik** este o librărie populară și completă pentru construirea de formulare în React și React Native. A fost creată pentru a gestiona complexitatea și starea formularelor, reducând codul repetitiv și oferind o structură clară.

**De ce să folosim Formik?**

<div class="ns-c-tight">

- **Gestionarea Stării**: Formik se ocupă de starea formularului (valori, erori, starea de "touched", trimitere) în locul tău.
- **Gestionarea Trimiterii**: Oferă un handler `onSubmit` care primește valorile formularului doar dacă validarea a trecut cu succes.
- **Validare și Mesaje de Eroare**: Se integrează perfect cu librării de validare precum **Yup** sau **Zod** pentru a defini reguli complexe și a afișa mesaje de eroare.
- **Reducerea Boilerplate-ului**: Folosind componente precum `<Formik>`, `<Field>` sau hook-ul `useFormik`, codul devine mult mai curat și organizat.

</div>

**Instalare:**
```bash
npm install formik
```

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Formik cu Validare Yup

:: content ::

**Yup** este o librărie de validare a schemelor, inspirată de Joi, care permite definirea unui obiect-schemă pentru a valida datele dintr-un formular. Este partenerul tradițional pentru Formik.

**Instalare:**
```bash
npm install yup
```

**Pașii Esențiali:**

<div class="ns-c-tight">

1.  **Definirea Schemei de Validare**: Se creează un obiect Yup care definește forma datelor și regulile de validare pentru fiecare câmp (ex: `required`, `email`, `minLength`).
2.  **Integrarea în Formik**: Se pasează schema creată la prop-ul `validationSchema` al componentei `<Formik>` sau al hook-ului `useFormik`.
3.  **Afișarea Erorilor**: Formik pune la dispoziție un obiect `errors` și un obiect `touched` (care urmărește ce câmpuri au fost atinse de utilizator) pentru a afișa erorile condiționat.

</div>

---
layout: cover
---

<script setup>
const code = `
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// 1. Definirea schemei de validare cu Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalid').required('Câmp obligatoriu'),
  password: Yup.string()
    .min(6, 'Parola trebuie să aibă cel puțin 6 caractere')
    .required('Câmp obligatoriu'),
});

export default function FormikYupExample() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={values => alert(\`Login reușit pentru: \${values.email}\`)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          
          <TextInput
            style={styles.input}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Parolă"
            secureTextEntry
          />
          {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  }
});
`
const dependencies = 'formik,yup'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu Formik + Yup" />

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# Zod: O Alternativă Modernă

:: content ::

**Zod** este o librărie de validare a schemelor, modernă, "TypeScript-first". Oferă o inferență de tipuri superioară, ceea ce înseamnă că tipul datelor tale este derivat automat din schema de validare.

**De ce Zod?**

<div class="ns-c-tight">

- **Siguranța Tipurilor (Type Safety)**: Schema de validare și tipul TypeScript sunt definite într-un singur loc. Dacă schimbi schema, tipul se actualizează automat.
- **Sintaxă Intuitivă**: Mulți dezvoltatori consideră sintaxa Zod mai lizibilă și mai ușor de compus.
- **Fără Dependințe**: Este o librărie mică și independentă.
- **Mesaje de Eroare Detaliate**: Oferă un control mai granular asupra mesajelor de eroare.

</div>

**Instalare:**
```bash
npm install zod
```

---
layout: center
---

### Comparație Sintaxă: Yup vs. Zod

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

#### Yup

```js
import * as yup from 'yup';

const schema = yup.object({
  nume: yup.string().required(),
  varsta: yup.number().positive().integer(),
});
```

</div>
<div>

#### Zod

```js
import { z } from 'zod';

const schema = z.object({
  nume: z.string().min(1), // Echivalent cu required
  varsta: z.number().positive().int(),
});

type User = z.infer<typeof schema>;
// User este { nume: string, varsta: number }
```

</div>
</div>

---
layout: top-title
align: c
color: indigo-light
---

:: title ::

# React Hook Form

:: content ::

**React Hook Form** este o librărie de formulare minimalistă, rapidă și flexibilă, care se bazează pe hook-uri și pe componente necontrolate.

**De ce React Hook Form?**

<div class="ns-c-tight">

- **Performanță Excepțională**: Minimizează numărul de re-randări. Componentele de input nu se re-randează la fiecare modificare, ci doar la evenimente specifice (cum ar fi blur sau submit), ceea ce face librăria extrem de rapidă.
- **Mai Puțin Cod**: Necesită semnificativ mai puțin cod pentru a integra un input în formular.
- **Ușor de Utilizat**: API-ul bazat pe hook-uri este simplu și se integrează natural în componentele funcționale.
- **Integrare Simplă cu Validarea**: Funcționează excelent cu librării precum Yup sau Zod printr-un "resolver".

</div>

**Instalare:**
```bash
npm install react-hook-form
```

---
layout: cover
---

<script setup>
const code = `
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Schema de validare Yup
const schema = yup.object().shape({
  email: yup.string().email('Email invalid').required('Emailul este obligatoriu'),
  password: yup.string().min(6, 'Minim 6 caractere').required('Parola este obligatorie'),
});

export default function ReactHookFormYup() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = data => alert(\`Submit: \${JSON.stringify(data)}\`);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Parolă"
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
`
const dependencies = 'react-hook-form,yup,@hookform/resolvers,@hookform/resolvers/yup'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu React Hook Form - Yup" />

---
layout: cover
---

<script setup>
const code = `
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema de validare Zod
const schema = z.object({
  fullName: z.string().min(3, { message: 'Numele trebuie să aibă cel puțin 3 caractere' }),
  age: z.coerce.number().min(18, { message: 'Trebuie să ai cel puțin 18 ani' }),
});

export default function ReactHookFormZod() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      age: ''
    }
  });

  const onSubmit = data => alert(\`Date valide: \${JSON.stringify(data)}\`);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nume Complet"
          />
        )}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName.message}</Text>}

      <Controller
        control={control}
        name="age"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Vârstă"
            keyboardType="numeric"
          />
        )}
      />
      {errors.age && <Text style={styles.error}>{errors.age.message}</Text>}

      <Button title="Înregistrează-te" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
`
const dependencies = 'react-hook-form,zod,@hookform/resolvers,@hookform/resolvers/zod'
</script>

<ExpoPreview :code="code" :dependencies="dependencies" name="Exemplu React Hook Form - Zod" />
