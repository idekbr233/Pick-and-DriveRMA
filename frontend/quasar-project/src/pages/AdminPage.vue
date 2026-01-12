<template>
  <q-page class="flex flex-center column">
    <div class="admin-container">
      <h1 class="title">Admin panel</h1>
      <p class="description">
        Dobrodošli u administracijsko sučelje. Ovdje možete upravljati aplikacijom.
      </p>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "AdminPage",
});
</script>

<style scoped>
.admin-container {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.description {
  font-size: 1.2rem;
  color: #555;
}

.actions {
  margin-top: 20px;
}
</style>
