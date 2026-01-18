<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">Kayıt Ol</h2>
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" v-model="email" class="form-control" placeholder="ornek@email.com" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Şifre</label>
              <input type="password" v-model="password" class="form-control" placeholder="******" required />
            </div>
            <button type="submit" class="btn btn-primary w-100">Kayıt Ol</button>
            <div class="text-center mt-3">
              <small>Zaten hesabın var mı? <router-link to="/login">Giriş Yap</router-link></small>
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

const fullname = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post('http://localhost:3000/register', {
      email: email.value,
      password: password.value
    }, {
      withCredentials: true // Cookie'lerin gönderilmesi ve alınması için
    });

    alert('Kayıt başarılı! Giriş yapabilirsiniz.');
    router.push('/login');
  } catch (error) {
    console.error("Kayıt sırasında hata:", error.response ? error.response.data : error.message);
    const errorMessage = error.response?.data?.message || 'Kayıt işlemi başarısız oldu.';
    alert(errorMessage);
  }
};
</script>