<template>
  <q-page padding class="bg-grey-2">
    <div class="row q-mb-md items-center">
      <div class="text-h5 text-weight-bold text-primary">
        <q-icon name="people" class="q-mr-sm" />
        Upravljanje korisnicima
      </div>
      <q-space />
      <q-btn 
        color="primary" 
        icon="person_add" 
        label="Novi Korisnik" 
        @click="prikaziDodajKorisnika = true" 
        unelevated
      />
    </div>

    <q-table
      :rows="korisnici"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      class="shadow-2"
    />

    <div class="q-pa-md flex flex-center">
      <q-fab
        v-model="fab"
        label="Opcije admina"
        color="dark brown"
        icon="menu"
        direction="up"
        vertical-actions-align="center"
      >
        <q-fab-action 
          color="negative" 
          @click="prikaziUkloniKorisnika = true" 
          icon="delete" 
          label="Ukloni korisnika" 
        />
      </q-fab>
    </div>

    <q-dialog v-model="prikaziDodajKorisnika" persistent>
      <q-card style="min-width: 400px; border-radius: 10px;">
        <q-card-section class="bg-primary text-white row items-center">
          <div class="text-h6">Novi Korisnik</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-gutter-md q-pt-lg">
          <q-input v-model="noviKorisnik.ime" label="Ime" filled dense />
          <q-input v-model="noviKorisnik.prezime" label="Prezime" filled dense />
          <q-input v-model="noviKorisnik.korisnicko_ime" label="Korisničko ime" filled dense />
          <q-input v-model="noviKorisnik.email" label="Email" filled dense />
          <q-input v-model="noviKorisnik.lozinka" label="Lozinka" type="password" filled dense />
        </q-card-section>

        <q-card-actions align="right" class="q-pb-md q-pr-md">
          <q-btn flat label="Odustani" color="grey" v-close-popup />
          <q-btn unelevated label="Spremi" color="primary" @click="dodajKorisnika" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="prikaziUkloniKorisnika">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Uklanjanje korisnika</div>
        </q-card-section>

        <q-card-section>
          <q-input 
            v-model="korisnikZaUklanjanje" 
            label="Unesite ID korisnika" 
            type="number"
            filled 
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" v-close-popup />
          <q-btn flat label="Ukloni" color="negative" @click="ukloniKorisnika" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "UpravljanjeKorisnicima",
  setup() {
    const korisnici = ref([]);
    const loading = ref(false);
    const fab = ref(false);
    const prikaziDodajKorisnika = ref(false);
    const prikaziUkloniKorisnika = ref(false);
    
    const noviKorisnik = ref({ 
      ime: "", 
      prezime: "", 
      korisnicko_ime: "", 
      email: "", 
      lozinka: "" 
    });
    
    const korisnikZaUklanjanje = ref("");

    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'ime', align: 'left', label: 'Ime', field: 'ime', sortable: true },
      { name: 'prezime', align: 'left', label: 'Prezime', field: 'prezime', sortable: true },
      { name: 'korisnicko_ime', align: 'left', label: 'Korisničko ime', field: 'korisnicko_ime' },
      { name: 'email', align: 'left', label: 'Email', field: 'email' },
    ];

    const fetchKorisnici = async () => {
      loading.value = true;
      try {
        const response = await axios.get("http://localhost:3000/api/korisnici");
        korisnici.value = response.data;
      } catch (error) {
        console.error("Greška pri dohvatu:", error);
      } finally {
        loading.value = false;
      }
    };

    // Provjera funkcije - mora poceti sa 'const'
    const dodajKorisnika = async () => {
      try {
        await axios.post("http://localhost:3000/api/Korisnik", noviKorisnik.value);
        alert("Korisnik uspješno dodan!");
        prikaziDodajKorisnika.value = false;
        noviKorisnik.value = { ime: "", prezime: "", korisnicko_ime: "", email: "", lozinka: "" };
        fetchKorisnici();
      } catch {
        alert("Greška prilikom dodavanja!");
      }
    };

    const ukloniKorisnika = async () => {
       const id = korisnikZaUklanjanje.value;
       if (!id || id <= 0) {
          alert("Molimo unesite ispravan ID korisnika (pozitivan broj)!");
          return;
       }
       try {
          await axios.delete(`http://localhost:3000/api/Korisnik/${id}`);
          alert("Korisnik uspješno uklonjen!");
          korisnikZaUklanjanje.value = "";
          prikaziUkloniKorisnika.value = false;
          fetchKorisnici();
       } catch {
          alert("ID nije pronađen u bazi ili je korisnik povezan s rezervacijom.");
       }
    };

    onMounted(fetchKorisnici);

    // Sve sto ide u return mora biti definirano IZNAD sa 'const'
    return {
      korisnici, 
      columns, 
      loading, 
      fab,
      prikaziDodajKorisnika, 
      prikaziUkloniKorisnika,
      noviKorisnik, 
      korisnikZaUklanjanje,
      dodajKorisnika, 
      ukloniKorisnika
    };
  }
};
</script>