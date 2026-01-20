<template>
  <q-page class="flex flex-center" style="background: #eee;">
    <div class="q-pa-md shadow-2 bg-white" style="border-radius: 10px; max-width: 400px; width: 100%;">
      <h2 class="text-center" style="font-size: 2.5rem; margin-bottom: 20px;">Prijava</h2>

      <q-input v-model="user.korisnicko_ime" label="Korisničko ime" filled class="q-mb-md" />
      <q-input v-model="user.lozinka" label="Lozinka" type="password" filled class="q-mb-md" />
      <q-btn label="Prijava" color="primary" @click="submitForm" class="full-width q-mb-md" />
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const API = 'http://192.168.0.103:3000'

export default {
  setup() {
    const router = useRouter()

    const user = ref({
      korisnicko_ime: '',
      lozinka: ''
    })

    const submitForm = async () => {
      if (!user.value.korisnicko_ime || !user.value.lozinka) {
        alert('Sva polja su obavezna.')
        return
      }

      try {
        const res = await axios.post(`${API}/api/prijava`, {
          korisnicko_ime: user.value.korisnicko_ime,
          lozinka: user.value.lozinka
        })

        const korisnik = res.data.korisnik

        localStorage.setItem('prijavljen', 'true')
        localStorage.setItem('korisnicko_ime', korisnik.korisnicko_ime)
        localStorage.setItem('ID_korisnika', korisnik.id) // dodan ID korisnika za MojeRezervacije.vue
        alert("Prijava uspješna!")

        router.push('/');

      } catch {
        alert('Neispravni podaci.')
      }
    }

    return {
      user,
      submitForm
    }
  }
}
</script>