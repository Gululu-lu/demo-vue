<template>
  <div>
    <div v-if="showWelcome" class="welcome-page flex items-center justify-center h-screen">
      <h1 class="text-4xl text-blue-600">欢迎来到学生管理列表</h1>
    </div>
    <div v-else>
      <div class="nav-wrapper bg-gray-200 border-b border-gray-400 flex justify-center">
        <div
          class="px-4 py-2 text-gray-700 hover:text-pink-500 cursor-pointer"
          :class="{ 'text-pink-500': type === item }"
          v-for="(item, index) in ['base', 'list']"
          :key="`nav_${index}`"
          @click="type = item"
        >
          <RouterLink :to="`/${item}`">{{ item }}</RouterLink>
        </div>
      </div>

      <main class="p-6">
        <keep-alive>
          <router-view />
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/store/user';


const userStore = useUserStore();
const type = ref('base');
const showWelcome = ref(true);

onMounted(() => {
  setTimeout(() => {
    showWelcome.value = false;
  }, 3000);
});
</script>

<style scoped>

</style>
