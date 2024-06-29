<template>
  <div class="nav-wrapper">
    <div
      class="mr-10"
      :class="{active: type === item}"
      v-for="(item, index) in ['base', 'computed', 'list', 'hello', 'form', 'life', 'user', 'fa']"
      :key="`nav_${index}`"
      @click="type = item"
    >
      <RouterLink :to="`/${item}`">{{item}}</RouterLink>
    </div>
  </div>

  <main>
    <keep-alive>
      <router-view />
    </keep-alive>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useMouse } from "@/utils/hooks";

const userStore = useUserStore();
const { name } = storeToRefs(userStore);
const { updateName } = userStore;

const type = ref('base');
const message = ref('你好👋');

const {x, y} = useMouse();
watch(type, (newType) => {
  console.log(`type is ${newType}`)
}, {immediate: true})
const userPath = ref('/user/456');

function warn(message, event) {
  console.log('event', event);
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
</script>

<style scoped>
.active {
  color: #ff99cc;
}
.border-black {
  border: #000001 solid px;
}
.pd-20 {
  padding: 20px;
}
.mr-10 {
  display: inline-block;
  margin-right: 10px;
}
.nav-wrapper {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
</style>
