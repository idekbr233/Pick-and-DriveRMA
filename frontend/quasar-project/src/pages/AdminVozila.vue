<template>
  <q-page class="q-pa-md">
    <h2>Vozila</h2>

    <q-input v-model="novoVozilo.naziv" label="Naziv" />
    <q-input v-model="novoVozilo.marka" label="Marka" />
    <q-input v-model="novoVozilo.godina" label="Godina" type="number" />
    <q-input v-model="novoVozilo.tip" label="Tip" />
    <q-input v-model="novoVozilo.gorivo" label="Gorivo" />
    <q-input v-model="novoVozilo.mjenjac" label="Mjenjač" />
    <q-input v-model="novoVozilo.slika" label="URL slike" />
    <q-input v-model="novoVozilo.opis" label="Opis" />
    <q-btn label="Dodaj vozilo" @click="dodajVozilo" color="primary" />

    <q-separator class="q-my-md" />

    <q-list bordered>
      <q-item v-for="v in vozila" :key="v.id">
        <q-item-section>
          {{ v.naziv }} ({{ v.marka }})
        </q-item-section>
        <q-item-section side>
          <q-btn icon="delete" color="red" flat @click="obrisiVozilo(v.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const vozila = ref([]);
const novoVozilo = ref({
  naziv: "", marka: "", godina: "", tip: "",
  gorivo: "", mjenjac: "", slika: "", opis: "",
  dostupno: 1, lokacija_id: 1
});

const ucitaj = () =>
  axios.get("http://localhost:3000/api/admin/vozila")
    .then(r => vozila.value = r.data);

const dodajVozilo = () =>
  axios.post("http://localhost:3000/api/admin/vozila", novoVozilo.value)
    .then(() => ucitaj());

const obrisiVozilo = id =>
  axios.delete(`http://localhost:3000/api/admin/vozila/${id}`)
    .then(() => ucitaj());

onMounted(ucitaj);
</script>
