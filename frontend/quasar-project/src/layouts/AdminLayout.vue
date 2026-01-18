<template>
  <q-layout view="lHh Lpr lFf" class="layout-background">
    <q-header elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Admin panel
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">
          
          <div class="text-subtitle2">{{ adminName }}</div>
          
          <q-btn 
            flat 
            round 
            dense 
            icon="logout" 
            @click="logout"
          >
            <q-tooltip>Odjavi se</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="drawer"
    >
      <q-list>
        <q-item-label header class="drawer-header">
          Upravljanje sustavom
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          :to="link.to"
          active-class="active-link"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-weight-bold">{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: "AdminLayout",
});

const router = useRouter();
const adminName = ref("Admin");

onMounted(() => {
  const savedName = localStorage.getItem("korisnicko_ime");
  if (savedName) {
    adminName.value = savedName;
  }
});

// Lista kartica kojima admin upravlja
const linksList = [
  {
    title: "Vozila",
    caption: "Upravljanje voznim parkom",
    icon: "directions_car",
    to: "/admin/vozila",
  },
  {
    title: "Rezervacije",
    caption: "Pregled svih rezervacija",
    icon: "book_online",
    to: "/admin/rezervacije",
  },
  {
    title: "Korisnici",
    caption: "Upravljanje korisnicima",
    icon: "people",
    to: "/admin/korisnici",
  },
  {
    title: "Lokacije",
    caption: "Upravljanje lokacijama",
    icon: "place",
    to: "/admin/lokacije",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  localStorage.removeItem("korisnicko_ime");
  localStorage.removeItem("ID_korisnika");
  localStorage.removeItem("userRole");
  
  alert("Odjava uspješna!");
  router.push("/prijava");
}
</script>

<style scoped>
.layout-background {
  background-color: #f4f6f8;
}
.drawer {
  background-color: #ffffff;
}
.drawer-header {
  font-weight: 700;
  color: #282828;
  text-transform: uppercase;
  padding: 20px 16px;
}
.active-link {
  color: #282828;
  background-color: #e3f2fd;
  border-right: 4px solid #282828;
}
</style>