import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useListStore = defineStore('listStore', () => {
  const list = reactive([
    {
      id: 220812022,
      userName: '刘淑文',
      age: 18
    },
    {
      id: 220812008,
      userName: '蔡欣怡',
      age: 18
    },
    {
      id: 220812030,
      userName: '龙依',
      age: 18
    }
  ]);

  const addUser = (user) => {
    list.unshift(user);
  };

  const deleteUser = (index) => {
    list.splice(index, 1);
  };

  const editUser = (index, updatedUser) => {
    list.splice(index, 1);
    list.unshift(updatedUser);
  };

  return { list, addUser, deleteUser, editUser };
});
