<template>
    <h1 class="text-xl">Edit User</h1>
    <form @submit.prevent="handleSubmit" v-for="detail in form" :key="detail.id">
        <br>
        <div class="mb-3">
            <label for="name">Name : </label>
            <input type="text" v-model="detail.name" id="name" class="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-3">
            <label for="email">Email : </label>
            <input type="email" id="email" v-model="detail.email" class="peer shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
            <p class="invisible peer-invalid:visible text-pink-600 text-sm">Please provide a valid email address.</p>
        </div>
        <button class="bg-blue-300 p-2 rounded-full peer-invalid:invisible px-8">Edit</button>
    </form>
    <br><br>

    <!-- upload Image -->
    <img :src="imgPriview" width="200">
    <br>
    <input type="file" @change="inputFile">
    <button @click="formImg" class="border bg-slate-500">Upload Foto</button>
</template>

<script>
import axios from 'axios';
export default {
    props: ['id'],
    mounted() {
        axios.get('/api/users/' + this.id).then((response) => {
                this.form = response.data
            })
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
            },
            imgPriview : '',
            photo : ''
        }
    },
    methods: {
        inputFile(e) {
            let files = e.target.files[0]
            if (files.type == 'image/png' || files.type == 'image/jpg' || files.type == 'image/jpeg') {
                console.log(files)
                this.imgPriview = URL.createObjectURL(files)
                this.photo = files
            } else {
                console.log(`this file Not Image`)
                this.imgPriview = ''
            }
        },
        formImg() {
            let form = new FormData()
            form.append('photo', this.photo)

            axios.post('/api/user/' + this.id, form).then(response => {
                console.log(response)
                this.$router.push({ path: '/user/' + this.id })
            })
        },
        handleSubmit() {
            axios.put('/api/users/' + this.id, this.form[0]).then((response) => {
                this.$toast.info(response.data.messages, {
                    position: "top-right",
                });
                this.$router.go(-1)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
}
</script>