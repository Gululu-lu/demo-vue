<template>
  <div class="list-comp bg-gray-100 min-h-screen p-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">同学列表</h1>
    <div class="tool-bar flex justify-end mb-4">
      <button class="add-btn bg-gray-800 text-white w-24 mr-6 rounded-lg" @click="showFlag = true">新增</button>
    </div>
    <ul class="px-4">
      <li class="flex justify-start items-center mb-4 h-16 border-b border-gray-300 text-gray-800 bg-gray-200">
        <span class="No w-1/6">序号</span>
        <span class="study-code w-1/6">学号</span>
        <span class="name w-1/6">姓名</span>
        <span class="year w-1/6">年龄</span>
        <div class="operation flex-grow flex justify-around">操作</div>
      </li>
      <li v-for="(item, index) in list" :key="item.id" class="flex justify-start items-center mb-4 h-16 border-b border-gray-300">
        <span class="No w-1/6">{{ index + 1 }}.</span>
        <span class="study-code w-1/6">{{ item.id }}</span>
        <span class="name w-1/6">{{ item.userName }}</span>
        <span class="year w-1/6">{{ item.age }}</span>
        <div class="operation flex-grow flex justify-around">
          <button class="bg-gray-600 text-white w-20 rounded-lg" @click="deleteUser(index)">删除</button>
          <button class="bg-gray-600 text-white w-20 rounded-lg" @click="editUser(index)">编辑</button>
          <button class="bg-gray-600 text-white w-20 rounded-lg" @click="askName(item.userName)">问名字</button>
        </div>
      </li>
    </ul>

    <div class="pop-blank fixed bg-white rounded-lg left-1/2 top-1/2 w-1/2 h-3/5 transform -translate-x-1/2 -translate-y-1/2 p-6 border border-gray-300 flex flex-col shadow-lg" v-if="showFlag">
      <h2 class="text-center text-2xl mb-4">{{ isEdit ? '编辑同学' : '新增同学' }}</h2>
      <div class="blank-body flex-grow flex flex-col justify-center">
        <div class="blank-item flex items-center h-16 text-lg mb-4">
          <span class="mr-3 w-16 text-gray-800">学号</span>
          <input type="text" v-model="studyNum" class="h-9 flex-grow text-base px-2 border border-gray-300 rounded-lg">
        </div>
        <div class="blank-item flex items-center h-16 text-lg mb-4">
          <span class="mr-3 w-16 text-gray-800">姓名</span>
          <input type="text" v-model="name" class="h-9 flex-grow text-base px-2 border border-gray-300 rounded-lg">
          <span v-if="nameExists(name)" class="ml-2 text-red-500">已存在</span>
        </div>
        <div class="blank-item flex items-center h-16 text-lg">
          <span class="mr-3 w-16 text-gray-800">年龄</span>
          <input type="text" v-model="year" class="h-9 flex-grow text-base px-2 border border-gray-300 rounded-lg">
        </div>
      </div>
      <div class="footer flex justify-end mt-6">
        <button class="bg-gray-300 text-gray-800 px-4 py-2 mr-3 rounded-lg" @click="showFlag = false">取消</button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" @click="submitFn">{{ isEdit ? '保存' : '确定' }}</button>
      </div>
    </div>

    <!-- Prompt dialog -->
    <div class="prompt-dialog fixed bg-white rounded-lg left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 border border-gray-300 shadow-lg"
         v-if="prompt.show">
      <p class="text-lg text-gray-800">{{ prompt.message }}</p>
      <div class="flex justify-end mt-4">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg" @click="prompt.show = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useListStore } from '@/store/listStore';

const showFlag = ref(false);
const isEdit = ref(false);
const curIdx = ref(0);

const studyNum = ref();
const name = ref('');
const year = ref();

const listStore = useListStore();
const list = listStore.list;

const deleteUser = (index) => {
  listStore.deleteUser(index);
};

const editUser = (index) => {
  isEdit.value = true;
  curIdx.value = index;
  const item = list[index];
  studyNum.value = item.id;
  name.value = item.userName;
  year.value = item.age;
  showFlag.value = true;
};

const submitFn = () => {
  const newUser = {
    id: studyNum.value,
    userName: name.value,
    age: year.value
  };
  
  if (isEdit.value) { // Edit existing user
    listStore.editUser(curIdx.value, newUser);
  } else { // Add new user
    let newName = name.value;
    let count = 1;
    
    // Check if the name already exists
    while (nameExists(newName)) {
      newName = `${name.value}${count}`;
      count++;
    }
    
    newUser.userName = newName;
    listStore.addUser(newUser);
  }
  
  showFlag.value = false;
}

const nameExists = (newName) => {
  return list.some(item => item.userName === newName);
}

// Prompt state
const prompt = ref({
  show: false,
  message: ''
});

const askName = (userName) => {
  prompt.value.message = `${userName}同学，请你回答我的问题`;
  prompt.value.show = true;
}
</script>

<style scoped>
.prompt-dialog {
  background-color: rgba(255, 255, 255, 0.9);
  width: 300px;
  max-width: 80%;
  padding: 20px;
}
</style>
