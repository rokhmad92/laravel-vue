<template>
    <h1 class="text-xl">Register User</h1>
    <br>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="name">Name : </label>
            <input type="text" v-model="form.name" id="name" :class="{'border-red-500' : errmsg.name}" class="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <small class="text-red-500" v-if="errmsg.name">{{ errmsg.name[0] }}</small>
        </div>
        <div class="mb-3">
            <label for="email">Email : </label>
            <input type="email" id="email" v-model="form.email" class="peer shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
            <small class="text-red-500" v-if="errmsg.email">{{ errmsg.email[0] }}</small>
            <p class="invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid email address.</p>
        </div>
        <div class="mb-3">
            <label for="password">Password : </label>
            <input type="password" id="password" v-model="form.password" class="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <small class="text-red-500" v-if="errmsg.password">{{ errmsg.password[0] }}</small>
        </div>
        <button class="bg-blue-300 p-2 rounded-full">Register</button>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            },
            errmsg: {}
        }
    },
    methods: {
        handleSubmit() {
            axios.post('/api/users', this.form).then((response) => {
                    if(response.data.status == 400) {
                        console.log(response.data)
                        this.errmsg = response.data.messages
                    } else {
                        this.$toast.success(response.data.messages);
                        this.$router.push({ path: '/users' })
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }
    },
}
</script>