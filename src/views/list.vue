<template>
  <div class="list-comp">
    <h1 class="text-center">同学列表</h1>
    <div class="tool-bar flex justify-end">
      <button class="add-btn bg-gray-800 text-white w-24 mr-6" @click="showFlag = true">新增</button>
    </div>
    <ul class="px-6">
      <li class="flex justify-start items-center mb-6 h-16 border-b border-gray-400 text-white bg-gray-800">
        <span class="No w-1/6">序号</span>
        <span class="study-code w-1/6">学号</span>
        <span class="name w-1/6">姓名</span>
        <span class="year w-1/6">年龄</span>
        <div class="operation flex-grow flex justify-around">操作</div>
      </li>
      <li v-for="(item, index) in list" :key="item.id" class="flex justify-start items-center mb-6 h-16 border-b border-gray-400">
        <span class="No w-1/6">{{ index + 1 }}.</span>
        <span class="study-code w-1/6">{{ item.id }}</span>
        <span class="name w-1/6">{{ item.userName }}</span>
        <span class="year w-1/6">{{ item.age }}</span>
        <div class="operation flex-grow flex justify-around">
          <button class="bg-gray-700 text-white w-24" @click="deleteUser(index)">删除</button>
          <button class="bg-gray-700 text-white w-24" @click="editUser(index)">编辑</button>
          <button class="bg-gray-700 text-white w-24" @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>

    <div class="pop-blank fixed bg-white rounded-lg left-1/2 top-1/2 w-1/2 h-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 border border-gray-400 flex flex-col" v-if="showFlag">
      <h2 class="text-center">{{ isEdit ? '编辑同学' : '新增同学' }}</h2>
      <div class="blank-body flex-grow flex flex-col justify-center">
        <div class="blank-item flex items-center h-18 text-xl mb-4">
          <span class="mr-3 w-16">学号</span>
          <input type="text" v-model="studyNum" class="h-9 flex-grow text-lg">
        </div>
        <div class="blank-item flex items-center h-18 text-xl mb-4">
          <span class="mr-3 w-16">姓名</span>
          <input type="text" v-model="name" class="h-9 flex-grow text-lg">
        </div>
        <div class="blank-item flex items-center h-18 text-xl">
          <span class="mr-3 w-16">年龄</span>
          <input type="text" v-model="year" class="h-9 flex-grow text-lg">
        </div>
      </div>
      <div class="footer flex justify-end mt-6">
        <button class="bg-white border border-blue-600 text-blue-600 px-4 py-2 mr-3" @click="showFlag = false">取消</button>
        <button class="bg-blue-600 text-white px-4 py-2" @click="submitFn">确定</button>
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

const studyNum = ref(0);
const name = ref('');
const year = ref(0);

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
  if (isEdit.value) { // 编辑
    listStore.editUser(curIdx.value, newUser);
  } else { // 新增
    listStore.addUser(newUser);
  }
  showFlag.value = false;
}
</script>

<style scoped>

</style>
