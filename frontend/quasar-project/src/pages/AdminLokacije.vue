<template>
  <q-page class="q-pa-md">
    <h2>Lokacije</h2>

    <q-input v-model="novaLokacija.grad" label="Grad" />
    <q-input v-model="novaLokacija.adresa" label="Adresa" />
    <q-input v-model="novaLokacija.longitude" label="Longituda" type="number" />
    <q-input v-model="novaLokacija.latitude" label="Latituda" type="number"/>
    <q-input v-model="novaLokacija.telefon" label="Broj telefona" />
    <q-input v-model="novaLokacija.email" label="Email" />
    <q-btn label="Dodaj lokaciju" @click="dodajLokaciju" color="primary" />

    <q-separator class="q-my-md" />

    <q-list bordered>
      <q-item v-for="l in lokacija" :key="l.id">
        <q-item-section>
          {{ l.grad }} ({{ l.adresa }})
        </q-item-section>
        <q-item-section side>
          <q-btn icon="delete" color="red" flat @click="obrisiLokaciju(l.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const lokacija = ref([]);
const novaLokacija = ref({
  grad: "", 
  adresa: "", 
  longitude: "", 
  latitude: "",
  telefon: "",
  email: ""
});

const ucitaj = () =>
  axios.get("http://localhost:3000/api/admin/lokacije")
    .then(r => lokacija.value = r.data);

const dodajLokaciju = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/admin/lokacije",
      novaLokacija.value
    )
    await ucitaj()
    alert('Lokacija dodana')
  } catch (err) {
    alert('Greška pri dodavanju lokacije')
    console.error(err)
  }
}

const obrisiLokaciju = id =>
  axios.delete(`http://localhost:3000/api/admin/lokacije/${id}`)
    .then(() => ucitaj());

onMounted(ucitaj);
</script>
