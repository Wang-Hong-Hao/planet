import { defineStore } from 'pinia'

interface user {
  name: string
  age: number
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): user => {
    return {
      name: '访客1',
      age: 18,
    }
  },
  actions: {
    updateName(name: string): void {
      this.name = name
    },
    updateAge(age: number): void {
      this.age = age
    },
  },
})
