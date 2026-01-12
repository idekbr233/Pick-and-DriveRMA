<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Pregled Rezervacija</div>

    <q-table
      :rows="rezervacije"
      :columns="columns"
      row-key="id"
      flat
      bordered
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="props.value === 'Potvrđeno' ? 'green' : 'orange'">
            {{ props.value }}
          </q-badge>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const rezervacije = ref([]);

    const columns = [
      { name: 'id', label: 'ID', field: 'id', align: 'left' },
      { name: 'korisnik', label: 'Korisnik', field: 'korisnicko_ime', align: 'left' },
      { name: 'auto', label: 'Vozilo', field: 'auto_naziv', align: 'left' },
      { name: 'od', label: 'Od', field: 'datum_od', align: 'center' },
      { name: 'do', label: 'Do', field: 'datum_do', align: 'center' },
      { name: 'cijena', label: 'Cijena', field: 'ukupna_cijena', align: 'right', format: val => `${val} €` },
      { name: 'status', label: 'Status', field: 'status', align: 'center' }
    ];

    const dohvatiRezervacije = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/rezervacije");
        rezervacije.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(dohvatiRezervacije);

    return { rezervacije, columns };
  }
};
</script>