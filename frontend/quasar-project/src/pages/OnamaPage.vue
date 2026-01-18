<template>

  <q-page class="q-pa-none" style="background-color: #211c1c;">
    <q-img
      src="/slike/main.png"
      style="height: 100vh; width: 100%;"
      fit="cover"
    />
    <div class="q-pa-md" style="color: white;">
      <h1 style="font-weight: bold;">O nama </h1>
    </div>
   
    <div class="row items-center q-pa-xl">
      <div class="col-6" style="color: white;" >
        <h1 style="font-weight: bold;">Kontakt i poslovnice</h1>
          <h3>1. Naše poslovnice</h3>
          <p>
            Trenutno nas možete pronaći u gradovima Rijeka, Zagreb, Split, Osijek, Zadar, Dubrovnik, Novi Vinodolski, Pula, Šibenik, Hvar, Rovinj. Bez obzira gdje ste ga pokupili, automobil možete ostaviti u bilo kojoj našoj poslovnici.
          </p>

          <q-separator color="grey"/>

          <h3>2. Kontakt</h3>
          <p>
            <strong>Poslovnica Rijeka:</strong> rijeka@autonajam.hr <br>
            <strong>Poslovnica Zagreb: </strong> zagreb@autonajam.hr <br>
            <strong>Poslovnica Split: </strong> split@autonajam.hr <br>
            <strong>Poslovnica Osijek: </strong> osijek@autonajam.hr <br>
            <strong>Poslovnica Zadar: </strong> zadar@autonajam.hr <br>
            <strong>Poslovnica Dubrovnik: </strong> dubrovnik@autonajam.hr <br>
            <strong>Poslovnica Novi Vinodolski: </strong> novivinodolski@autonajam.hr <br>
            <strong>Poslovnica Pula: </strong> pula@autonajam.hr <br>
            <strong>Poslovnica Šibenik: </strong> sibenik@autonajam.hr <br>
            <strong>Poslovnica Hvar: </strong> hvar@autonajam.hr <br>
            <strong>Poslovnica Rovinj: </strong> rovinj@autonajam.hr <br>
          </p>

          <q-separator color="grey" />
        
          <h3>3. Dodatna pitanja</h3>
          <p>
           Ukoliko imate dodatna pitanja, slobodno nam se javite. Naš tim odgovoriti će vam u najkraćem mogućem roku.
          </p>
          
      </div>
  
      <div class="col-6" align="right">
        <q-img src="/slike/kljucevi(1).jpg" :ratio="5/7" style="max-width: 700px" />
      </div>
    </div>
   </q-page>
</template>
