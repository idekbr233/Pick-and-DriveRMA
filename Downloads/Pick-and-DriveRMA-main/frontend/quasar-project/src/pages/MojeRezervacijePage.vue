<template>
  <q-page padding class="bg-grey-2">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="rez in rezervacije" :key="rez.id" class="my-card" flat bordered>

        <q-card-section>
          <div class="text-h6 q-mb-sm">{{ rez.naziv }}</div>
          <div class="text-caption text-grey">
            <strong>Datum od:</strong> {{ formatDatum(rez.datum_od) }}<br />
            <strong>Datum do:</strong> {{ formatDatum(rez.datum_do) }}<br />
            <strong>Cijena:</strong> {{ rez.ukupna_cijena }} €<br />
            <strong>Status:</strong> {{ rez.status }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            v-if="rez.status === 'Potvrđeno'"
            flat
            color="red"
            label="Otkaži"
            @click="otkaziRezervaciju(rez.id)"
          />
          <div v-else class="text-caption text-grey">
            {{ rez.status === 'Otkazano' ? 'Ova rezervacija je otkazana' : 'Ne može se otkazati' }}
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'

export default {

  name: 'MojeRezervacije',

  data() {
    return {
      rezervacije: [],
    }
  },

  mounted() {
    this.loadRezervacije()
  },

  methods: {
    async loadRezervacije() {
      const userId = localStorage.getItem('ID_korisnika')
      if (!userId) {
          this.$router.push('/prijava'); // Promjenjeno iz alerta da prebaci na prijavu
        return
      }
      try {
        const res = await api.get('/api/rezervacije/moje', {
          headers: {
            'X-User-ID': userId,
          },
        })

        this.rezervacije = res.data
      } catch (err) {
        console.error('Greška pri dohvaćanju rezervacija:', err)
      }
    },
    formatDatum(datum) {
      if (!datum) return ''
      const date = new Date(datum)
      return date.toLocaleString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
    async otkaziRezervaciju(id) {
      const userId = localStorage.getItem('ID_korisnika')

      if (!userId) {
        alert('Morate biti prijavljeni')
        return
      }

      if (!confirm('Jeste li sigurni da želite otkazati ovu rezervaciju?')) return 

      try {
        await api.patch(`/api/rezervacije/${id}/otkazi`, null, {
          headers: {
            'X-User-ID': userId,
          },
        })
          
        this.loadRezervacije()
        alert('Rezervacija otkazana!')
      } catch {
        console.error('Greška pri otkazivanju')
        alert('Greška pri otkazivanju rezervacije')
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
