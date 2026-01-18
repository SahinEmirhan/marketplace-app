<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">Giriş Yap</h2>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" v-model="email" class="form-control" placeholder="ornek@email.com" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Şifre</label>
              <input type="password" v-model="password" class="form-control" placeholder="******" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Giriş Yap</button>
            <div class="text-center mt-3">
              <small>Hesabın yok mu? <router-link to="/register">Kayıt Ol</router-link></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios"

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: email.value,
      password: password.value
    }, {
      withCredentials: true // Cookie'lerin gönderilmesi ve alınması için
    });
    
    if(response.status === 200){
      router.push('/');
    }
  } catch (error) {
    console.error("Giriş sırasında hata:", error.response ? error.response.data : error.message);
    alert('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
  }
};
</script>