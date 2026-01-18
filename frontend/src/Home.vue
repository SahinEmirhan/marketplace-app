<template>
  <div>
    <h1 class="mb-4">Keşfet</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm product-card" @click="goToDetail(product.id)">
          <!-- Ürün resmi için placeholder -->
          <div class="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px; font-size: 3rem;">
            <img :src="product.imageUrl" alt="Ürün Resmi" style="width: 100%; height: 100%; object-fit: cover;" class="img-fluid">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text text-success fw-bold">{{ product.price }} TL</p>
            <p class="card-text text-muted small">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios"; // Merkezi api istemcimizi import ediyoruz
const router = useRouter();

const products = ref([]);


onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/product/list', {
      withCredentials: true
    });
    console.log(response);
    products.value = response.data.data;
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error.response ? error.response.data : error.message);
    // Eğer token geçersizse veya yoksa (401, 403 hatası), kullanıcıyı login'e yönlendir.
    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Lütfen giriş yapınız.");
      router.push('/login');
    }
  }
});


const goToDetail = (id) => {
  // Ürün detay sayfasına yönlendirme
  router.push(`/product/${id}`);
};
</script>

<style scoped>
.product-card {
  cursor: pointer;
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-5px);
}
</style>