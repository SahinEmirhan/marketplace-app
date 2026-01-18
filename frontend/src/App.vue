<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <!-- Bootstrap Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">Marketplace</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Ana Sayfa</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/my-products">Ürünlerim</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/create-product">Ürün Ekle</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/chat">Mesajlarım</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link btn btn-outline-light ms-2 px-3" to="/login">Giriş Yap</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sayfa İçeriği -->
    <main class="container py-4 flex-grow-1">
      <router-view />
    </main>
    
    <footer class="bg-white text-center py-3 text-muted border-top mt-auto">
      <small>&copy; 2024 Marketplace App</small>
    </footer>
  </div>
</template>

<script setup>
// Global mantık buraya eklenebilir (örneğin kullanıcı oturum kontrolü)
</script>

<style>
/* Bootstrap varsayılanlarını ezmek istersen buraya ekleyebilirsin */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
