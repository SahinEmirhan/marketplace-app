<template>
  <div class="container-fluid" style="height: 80vh;">
    <div class="row h-100">
      <!-- Sol Taraf: Chat Odaları Listesi -->
      <div class="col-4 bg-light border-end p-0">
        <div class="p-3 bg-white border-bottom">
          <h5 class="mb-0">Sohbetler</h5>
        </div>
        <div class="overflow-auto" style="height: calc(100% - 60px);">
          <template v-for="chat in chatRooms" :key="chat.chatId">
          <div
            @click="selectChat(chat)"
            class="d-flex align-items-center p-3 border-bottom cursor-pointer"
            :class= "selectedChatId === chat.chatId ? 'bg-primary bg-opacity-10' : ''"
          >
            <div class="bg-secondary rounded me-3 d-flex align-items-center justify-content-center text-white" style="width: 50px; height: 50px;">
              <img :src="chat.productImage" alt="Ürün Resmi" style="width: 100%; height: 100%; object-fit: cover;" class="img-fluid">
            </div>
            <div class="flex-grow-1">
              <h6 class="mb-1">{{ chat.productName }}</h6>
            </div>
          </div>
          </template>
        </div>
      </div>

      <!-- Sağ Taraf: Mevcut Chat -->
      <div class="col-8 p-0">
        <div v-if="selectedChat" class="card shadow-sm h-100 border-0">
          <!-- Ürün Header (Letgo Tarzı) -->
          <div class="card-header bg-white d-flex align-items-center py-3">
            <div class="bg-secondary rounded me-3 d-flex align-items-center justify-content-center text-white" style="width: 50px; height: 50px;">
              <img :src="selectedChat.productImage" alt="Ürün Resmi" style="width: 100%; height: 100%; object-fit: cover;" class="img-fluid">
            </div>
            <div>
              <h5 class="mb-0">{{ selectedChat.productName }}</h5>
              <small class="text-success fw-bold">{{ selectedChat.productPrice }} TL</small>
            </div>
          </div>

          <!-- Mesaj Alanı -->
          <div class="card-body overflow-auto bg-light messages-area" id="messageContainer">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              class="d-flex mb-3"
              :class="msg.senderType === userType ? 'justify-content-end' : 'justify-content-start'"
            >
              <div
                class="p-3 rounded-3"
                :class="msg.senderType === userType ? 'bg-success text-white' : 'bg-white text-dark border'"
                style="max-width: 75%;"
              >
                {{ msg.content }}
              </div>
            </div>
          </div>

          <!-- Input Alanı -->
          <div class="card-footer bg-white p-3">
            <div class="input-group">
              <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                type="text"
                class="form-control rounded-pill"
                placeholder="Bir mesaj yaz..."
              />
              <button @click="sendMessage" class="btn btn-success rounded-pill ms-2 px-4">Gönder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import axios from "axios";
import { io } from 'socket.io-client';

const route = useRoute();
const router = useRouter();
const productId = route.params.productId;
const newMessage = ref('');
const messages = ref([]);
const socket = ref(null);
const chatId = ref(null);
let userType = ref(null);
const chatRooms = ref([]);
const selectedChat = ref(null);
const selectedChatId = ref(null);

onMounted(() => {
  loadChatRooms();
  if (productId) {
    createOrGetChat();
  } else {
    selectedChat.value = null;
  }
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
});

const loadChatRooms = async () => {
  const response = await axios.get("http://localhost:3000/chat/my" , {withCredentials : true});
  if(response.status == 200){
    chatRooms.value = response.data.data;
  }
};

const selectChat = (chat) => {
  selectedChat.value = chat;
  selectedChatId.value = chat.chatId;
  chatId.value = chat.chatId;
  messages.value = [];
  loadMessages();
  initSocket();
};

const loadMessages = async () => {
  const response = await axios.get(`http://localhost:3000/chat/messages/${chatId.value}` , {withCredentials : true});
  if(response.status == 200){
    messages.value = response.data.data
    console.log(messages.value);
  }
}

const initSocket = () =>{
  socket.value = io('http://localhost:3000', {withCredentials: true} );

  socket.value.on('connect', () => {
    if (chatId.value) {
      socket.value.emit('join_chat', chatId.value);
      socket.value.on('chat_joined' , (data) => {
        userType.value = data.senderType;
        socket.value.off("chat_joined");
      })
      
    }
  });

  socket.value.on('connect_error', (error) => {
    console.error('Socket bağlantı hatası:', error);
    alert('Bağlantı hatası. Lütfen tekrar deneyin.');
  });

  socket.value.off("receive_message");
  socket.value.on('receive_message', (data) => {
    console.log("senderType : " + data.senderType);
    messages.value.push({
      content : data.content,
      senderType : data.senderType
    });

    // Scroll to bottom
    nextTick(() => {
      const container = document.getElementById('messageContainer');
      if(container) container.scrollTop = container.scrollHeight;
    });
  });
}

const createOrGetChat = async () => {
  try {
      try {
        let dbChat;
        const chatResponse = await axios.post(`http://localhost:3000/chat/create/${productId}`, {}, {
          withCredentials: true
        });
        console.log("chatResponse.data : " + chatResponse.data)
        if (chatResponse.status === 200) {
          dbChat = chatResponse.data.data;
          const findedChat = chatRooms.value.find(c => c.chatId == dbChat.chatId )
          if(findedChat){ 
            selectChat(findedChat);
            return;
          }
          
          const newChat = {
            chatId: dbChat.chatId,
            productName: dbChat.productName,
            productImage: dbChat.productImage,
            productPrice: dbChat.productPrice,
          };
          chatRooms.value.unshift(newChat);
          selectChat(newChat);
        }
      } catch (chatError) {
        console.error("Chat oluşturma hatası:", chatError.response ? chatError.response.data : chatError.message);
        const errorMessage = chatError.response?.data?.message || "Chat oluşturulamadı";
        alert(errorMessage);
        router.push(`/product/${productId}`);
        return;
      }
  } catch (error) {
    console.error("Ürün detayı getirilirken hata:", error.response ? error.response.data : error.message);
    if (error.response && [401, 403].includes(error.response.status)) {
      alert("Lütfen giriş yapınız.");
      router.push('/login');
    } else {
      alert("Ürün detayı getirilirken hata oluştu.");
    }
  }
};

const sendMessage = async () => {
  if (newMessage.value.trim() === '' || !chatId.value || !socket.value) return;

  const messageText = newMessage.value.trim();

  // Scroll to bottom
  await nextTick();
  const container = document.getElementById('messageContainer');
  if(container) container.scrollTop = container.scrollHeight;

  try {
    socket.value.emit('send_message', chatId.value, messageText);
  } catch (error) {
    console.error("Mesaj gönderilirken hata:", error);
    messages.value.pop();
    alert("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
