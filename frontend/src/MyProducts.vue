<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Ürünlerim</h1>
      <router-link to="/create-product" class="btn btn-success">
        <i class="bi bi-plus-lg"></i> Yeni Ürün Ekle
      </router-link>
    </div>
    
    <div v-if="myProducts.length === 0" class="alert alert-info">
      Henüz bir ürün eklemediniz.
    </div>

    <div class="list-group shadow-sm">
      <div v-for="product in myProducts" :key="product.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3">
        <div>
          <h5 class="mb-1">{{ product.name }}</h5>
          <span class="text-success fw-bold">{{ product.price }} TL</span>
        </div>
        <div>
          <button @click="editProduct(product.id)" class="btn btn-sm btn-outline-primary me-2">Düzenle</button>
          <button @click="deleteProduct(product.id, product.name)" class="btn btn-sm btn-outline-danger">Sil</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const myProducts = ref([]);

// Ürünleri yükle
const loadProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/product/list/my`, { 
      withCredentials: true 
    });
    if(response.status === 200){
      myProducts.value = response.data.data;
    }
  } catch (error) {
    console.error("Ürünler getirilirken hata oluştu:", error.response ? error.response.data : error.message);
    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Lütfen giriş yapınız.");
      router.push('/login');
    } else {
      alert("Ürünler getirilirken hata oluştu.");
    }
  }
};

onMounted(() => {
  loadProducts();
});

// Ürün düzenleme - CreateProduct sayfasına yönlendir
const editProduct = (productId) => {
  router.push(`/create-product?id=${productId}`);
};

// Ürün silme
const deleteProduct = async (productId, productName) => {
  if (!confirm(`${productName} adlı ürünü silmek istediğinize emin misiniz?`)) {
    return;
  }

  try {
    const response = await axios.post(`http://localhost:3000/product/delete/${productId}`, {}, {
      withCredentials: true
    });
    
    if(response.status === 200){
      alert("Ürün başarıyla silindi.");
      // Listeyi yenile
      loadProducts();
    }
  } catch (error) {
    console.error("Ürün silinirken hata oluştu:", error.response ? error.response.data : error.message);
    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Lütfen giriş yapınız.");
      router.push('/login');
    } else {
      const errorMessage = error.response?.data?.message || "Ürün silinirken hata oluştu.";
      alert(errorMessage);
    }
  }
};

</script>