<template>
  <q-page class="q-pa-none" style="background-color: #211c1c;">
    <q-img
      src="/slike/mob.png"
      style="height: 100%; width: 100%;"
      fit="cover"
    />
    <div class="q-pa-md" style="color: white;">
      <h2 style="margin-top: 100px; margin-bottom: 0px;">NAŠA FLOTA</h2>
    </div>
    <div class="q-pa-sm row items-start q-gutter-sm">
      <q-card class="my-card" @click="idiNaKategoriju('SUV')">
        <img src="/slike/BMWX5.jpg">
        <div class="absolute-bottom text-white text-center q-pa-sm overlay-title" style="font-size: 2.25rem; font-weight: bold;"> SUV / Terenci </div>
      </q-card>
      <q-card class="my-card" @click="idiNaKategoriju('Limuzina')">
        <img src="/slike/A4.jpg">
        <div class="absolute-bottom text-white text-center q-pa-sm overlay-title" style="font-size: 2.25rem; font-weight: bold;"> Sedan / Limuzina </div>
      </q-card>
      <q-card class="my-card" @click="idiNaKategoriju('Sportski')">
        <img src="/slike/911.jpg">
        <div class="absolute-bottom text-white text-center q-pa-sm overlay-title" style="font-size: 2.25rem; font-weight: bold; color: black;"> Sportska vozila </div>
      </q-card>
      <q-card class="my-card" @click="idiNaKategoriju('Kompakt')">
        <img src="/slike/i30N.jpg">
        <div class="absolute-bottom text-white text-center q-pa-sm overlay-title" style="font-size: 2.25rem; font-weight: bold;"> Kompaktna vozila </div>
      </q-card>
      <q-card class="my-card" @click="idiNaKategoriju('Ostalo')">
        <img src="/slike/drugo.jpg">
      </q-card>
    </div>
    <h2 class="q-pa-md" style="color:white; margin-top: 6rem">Kako to funkcionira?</h2>
    <div class="row items-stretch q-pa-md">
      <div class="col-9" style="color: white;" >
        <h3 style="margin-top: 0;" >1. Odaberi svoj automobil</h3>
        <p style="margin-right: 1rem;"> Pregledaj našu flotu i pronađi savršeni automobil za svoje potrebe – od ekonomičnih gradskih vozila do luksuznih sportskih modela. </p>
        <p> ─────────────────────── </p>
        <h3>2. Rezerviraj odmah</h3>
        <p style="margin-right: 1rem;"> Brzo i jednostavno: rezervaciju možeš napraviti online ili putem našeg tima, bez skrivenih uvjeta i komplikacija. </p>
        <p> ─────────────────────── </p>
        <h3>3. Vozi i uživaj</h3>
        <p style="margin-right: 1rem;"> Pregledaj našu flotu i pronađi savršeni automobil za svoje potrebe – od ekonomičnih gradskih vozila do luksuznih sportskih modela. </p>
        <p> ─────────────────────── </p>
        <h3>4. Vrati bez brige</h3> 
        <p style="margin-right: 1rem;"> Vraćanje vozila je jednostavno i fleksibilno – mi se brinemo da sve prođe glatko i bez stresa. </p>
        <p> ─────────────────────── </p>
      </div>

      <div class="col-3">
        <q-img src="/slike/auti.jpg" class="full-height-img" fit="cover"/>
      </div>
    </div>
  </q-page>
</template>


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const idiNaKategoriju = (kategorija) => {
  router.push(`/pregled-vozila/${encodeURIComponent(kategorija)}`)
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%

.full-height-img
  height: 100%
  min-height: 100%
  border-radius: 1rem;
</style>