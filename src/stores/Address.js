import { defineStore } from 'pinia'

export const useAddressStore = defineStore('address', {
    state: () => ({
        addresses: []
    }),
    getters: {
        allAddresses: (state) => state.addresses
    },
    actions: {
        addAddress(newAddress) {
            this.addresses.push(newAddress)
        }
    },
    persist: true
})