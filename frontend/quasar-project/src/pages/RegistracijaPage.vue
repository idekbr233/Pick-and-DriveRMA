<template>
  <q-page>
    <div style="max-width: 400px; margin: auto; padding: 20px;">
      <h2 class="text-center">Registracija</h2>

      <q-input filled v-model="ime" label="Ime" class="q-mb-md" />
      <q-input filled v-model="prezime" label="Prezime" class="q-mb-md" />
      <q-input filled v-model="email" label="Email" class="q-mb-md" />
      <q-input filled v-model="korisnicko_ime" label="Korisničko ime" class="q-mb-md" />
      <q-input filled v-model="lozinka" label="Lozinka" type="password" class="q-mb-md" />

      <q-btn color="primary" label="Potvrdi" @click="registerUser" class="full-width" />
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ime: '',
      prezime: '',
      email: '',
      korisnicko_ime: '',
      lozinka: '',
    };
  },
  methods: {
    async registerUser() {
      // Validacija svih polja
      if (!this.ime || !this.prezime || !this.email || !this.korisnicko_ime || !this.lozinka) {
        alert('Molimo ispunite sva polja.');
        return;
      }

      // Priprema payloada prema bazi
      const payload = {
        ime: this.ime.trim(),
        prezime: this.prezime.trim(),
        email: this.email.trim(),
        korisnicko_ime: this.korisnicko_ime.trim(),
        lozinka: this.lozinka.trim()
      };

      try {
        const response = await axios.post('http://localhost:3000/api/Korisnik', payload);
        alert(response.data.message);

        // Resetiranje nakon uspjesne registracije
        this.ime = '';
        this.prezime = '';
        this.email = '';
        this.korisnicko_ime = '';
        this.lozinka = '';
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'Došlo je do greške pri registraciji.');
      }
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 30px;
}
</style>
