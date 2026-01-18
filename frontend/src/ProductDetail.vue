<template>
  <div class="card shadow-sm">
    <div class="row g-0">
      <div class="col-md-6 bg-light d-flex align-items-center justify-content-center" style="min-height: 400px;">
        <!-- Ürün Resmi -->
        <img :src="product.imageUrl" alt="Ürün Resmi" style="width: 100%; height: 100%; object-fit: cover;" class="img-fluid">
      </div>
      <div class="col-md-6">
        <div class="card-body d-flex flex-column h-100">
          <h1 class="card-title">{{ product.name }}</h1>
          <h2 class="text-success mb-4">{{ product.price }} TL</h2>
          <p class="card-text flex-grow-1">{{ product.description }}</p>
          
          <div class="mt-auto border-top pt-3">
            <!-- Kendi ürünümüz değilse butonları göster -->
            <div v-if="!isOwner">
              <button v-if="!isLiked" @click="toggleLike" class="btn btn-outline-danger btn-lg w-100 rounded-pill">
                ❤️ Beğen
              </button>
              
              <div v-else class="d-grid gap-2">
                <button @click="toggleLike" class="btn btn-light text-danger">Beğeniyi Kaldır</button>
                <button @click="startChat" class="btn btn-success btn-lg rounded-pill">💬 Mesajlaş</button>
              </div>
            </div>
            
            <div v-else class="alert alert-secondary text-center mb-0">
              Bu sizin kendi ürününüz.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";
const route = useRoute();
const router = useRouter();

// TODO: Backend'den ürün detayını ve kullanıcının like durumunu çek (GET /product/:id)
// Şimdilik mock data:
const isOwner = ref(false); // Test için true yapabilirsin
const isLiked = ref(false);

const product = ref([]);

const id = route.params.id;

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/product/${id}`, {
      withCredentials: true
    });
    product.value = response.data.data;
    isLiked.value = product.value.isLiked;
  } catch (error) {
    console.error("Ürün detayı getirilirken hata oluştu:", error.response ? error.response.data : error.message);
    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Lütfen giriş yapınız.");
      router.push('/login');
    }
  }
});

const toggleLike = async () => {
  console.log("toggleLike");
  const response = await axios.post(`http://localhost:3000/product/like/${id}`, {}, {
    withCredentials: true
  });
  console.log(response);
  if(response.status == 200){
    isLiked.value = !isLiked.value;
  }else{
    alert("Beğenme işlemi başarısız oldu.");
  }
};

const startChat = () => {
  // TODO: Chat odası oluşturma isteği atılacak ve dönen ID ile yönlendirme yapılacak
  router.push(`/chat/${product.value.id}`);
};
</script>