import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      employees: []
    }
  },
  mutations: {
    addEmployee(state, employee) {
      state.employees.push(employee);
    }
  },
  getters: {
    getEmployees(state) {
      return state.employees;
    }
  }
})

import App from './App.vue'

createApp(App).use(store).mount('#app')
