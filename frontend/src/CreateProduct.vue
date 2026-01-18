<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card shadow-sm">
        <div class="card-header bg-white">
          <h3 class="mb-0">{{ isEditMode ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle' }}</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="createProduct">
            <div class="mb-3">
              <label class="form-label">Ürün Adı</label>
              <input v-model="product.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Açıklama</label>
              <textarea v-model="product.description" class="form-control" rows="4" required></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Fiyat (TL)</label>
              <input v-model="product.price" type="number" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Görsel Yükle</label>
              <input type="file" class="form-control" @change="handleFileUpload" accept="image/*" />
              <small class="text-muted">{{ isEditMode ? 'Yeni görsel seçiniz (zorunlu)' : 'Görsel seçiniz (zorunlu)' }}</small>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-success btn-lg">{{ isEditMode ? 'Güncelle' : 'Yayınla' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const productId = route.query.id;

const product = reactive({
  name: '',
  description: '',
  price: null,
  image: null
});

// Eğer düzenleme modundaysa, ürün bilgilerini yükle
onMounted(async () => {
  if (productId && productId) {
    try {
      const response = await axios.get(`http://localhost:3000/product/${productId}`, {
        withCredentials: true
      });
      if (response.status === 200 && response.data.data) {
        const productData = response.data.data;
        product.name = productData.name;
        product.description = productData.description;
        product.price = productData.price;
        // Görsel backend'den geliyor ama update için yeni görsel zorunlu
      }
    } catch (error) {
      console.error("Ürün bilgileri yüklenirken hata:", error.response ? error.response.data : error.message);
      alert("Ürün bilgileri yüklenirken hata oluştu.");
      router.push('/my-products');
    }
  }
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) {
    product.image = null;
    return;
  }
  
  // Dosya boyutu kontrolü (10MB limit - backend ile eşleşmeli)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    alert("Dosya boyutu 10MB'dan küçük olmalıdır.");
    event.target.value = '';
    product.image = null;
    return;
  }
  
  product.image = file;
};

const createProduct = async () => {
  // Dosya seçilmediyse uyarı ver
  if (!product.image) {
    alert("Lütfen bir görsel seçiniz.");
    return;
  }

  // FormData oluştur - multer "image" field'ını bekliyor
  const formData = new FormData();
  formData.append('image', product.image); // Backend'deki upload.single("image") ile eşleşmeli
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price.toString());

  try {
    let response;
    if (productId) {
      // Update işlemi
      response = await axios.post(`http://localhost:3000/product/update/${productId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } else {
      // Create işlemi
      response = await axios.post(`http://localhost:3000/product/create`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }
    
    if(response.status === 200){
      alert(productId ? "Ürün başarıyla güncellendi." : "Ürün başarıyla oluşturuldu.");
      router.push('/my-products');
    } else {
      alert(productId ? "Ürün güncellenirken hata oluştu." : "Ürün oluşturulurken hata oluştu.");
    }
  } catch (error) {
    console.error("İşlem sırasında hata:", error.response ? error.response.data : error.message);
    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Lütfen giriş yapınız.");
      router.push('/login');
    } else {
      const errorMessage = error.response?.data?.message || (productId ? "Ürün güncellenirken hata oluştu." : "Ürün oluşturulurken hata oluştu.");
      alert(errorMessage);
    }
  }
};
</script>