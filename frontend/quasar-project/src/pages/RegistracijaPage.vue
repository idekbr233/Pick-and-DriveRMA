<template>
  <q-page>
    <div style="max-width: 600px; margin-top: 50px; padding: 20px;">
      <h2 class="text-center">Registracija</h2>

      <q-input filled v-model="ime" label="Ime" class="q-mb-md" />
      <q-input filled v-model="prezime" label="Prezime" class="q-mb-md" />
      <q-input filled v-model="email" label="Email" class="q-mb-md" />
      <q-input filled v-model="korisnicko_ime" label="Korisničko ime" class="q-mb-md" />
      <q-input filled v-model="lozinka" label="Lozinka" type="password" class="q-mb-md" />

      <q-btn label="Potvrdi" color="primary" @click="registracija" class="full-width" />
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { api } from 'boot/axios'


export default {
  setup() {
    const ime = ref('')
    const prezime = ref('')
    const email = ref('')
    const korisnicko_ime = ref('')
    const lozinka = ref('')
    const router= useRouter()

    const registracija = async () => {
      // Validacija svih polja
      if 
      (!ime.value || !prezime.value || !email.value || !korisnicko_ime.value || !lozinka.value) {
        alert('Molimo ispunite sva polja.')
        return
      }

      // Priprema payloada prema bazi
      const payload = {
        ime: ime.value.trim(),
        prezime: prezime.value.trim(),
        email: email.value.trim(),
        korisnicko_ime: korisnicko_ime.value.trim(),
        lozinka: lozinka.value.trim()
      }

      try {
        const res = await api.post('/korisnik', payload)
        alert(res.data.message)

        router.push('/prijava')
      } catch (error) {
        console.error(error)
        alert('Došlo je do greške pri registraciji.')
      }
    }
    return {
      ime,
      prezime,
      email,
      korisnicko_ime,
      lozinka,
      registracija
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
