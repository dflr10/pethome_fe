<template>
        <div class="hero container">
            <h2> Welcome <span> {{name}} </span> !</h2>
            <p>Keeping track of your foundation pets has never been easier and faster.</p>
        </div>
</template>

<script>
    import jwt_decode from "jwt-decode";
    import axios from 'axios';
    export default {
        name: "home",
        data: function () {
            return {
                deploy_route: "https://pethomemintic-be.herokuapp.com", // ruta heroku -> "https://pethomemintic-be.herokuapp.com" , ruta_local -> "http://127.0.0.1:8000"
                id_user:0,
                name: "",
                email: "",
                username: localStorage.getItem('username') || "",
                loaded: false,
            }
        },
        methods: {
            getData: async function () {
                if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit('logOut');
                    return;
                }
                await this.verifyToken();
                let token = localStorage.getItem("token_access");
                let userId = jwt_decode(token).user_id.toString();
                localStorage.setItem("idUser",userId);
                axios.get(`${this.deploy_route}/user/${userId}/`, { headers: { 'Authorization': `Bearer ${token}` } })
                    .then((result) => {
                        this.id_user = result.data.id_user;
                        this.name = result.data.name;
                        this.email = result.data.email;
                        this.loaded = true;
                    })
                    .catch(() => {
                        this.$emit('logOut');
                    });
            },
            verifyToken: function () {
                return axios.post(this.deploy_route + "/refresh/", { refresh: localStorage.getItem("token_refresh") }, { headers: {} }
                )
                    .then((result) => {
                        localStorage.setItem("token_access", result.data.access);
                    })
                    .catch(() => {
                        this.$emit('logOut');
                    });
            }
        },
        created: async function () {
            this.getData();
        },
    }
</script>

<style scoped>
    .hero{
        background-image: url("../assets/hero.jpg");
        background-size: cover;
        background-position: center;
        min-height: 80.8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .hero img {
        width: 100%;
        height: auto;
    }
     p {
         color: #4776E6;
        font-size: 1.8rem;
        text-align: center;
    }
    h2 {
        margin-top: 1.4rem;
        font-size: 2rem;
        font-weight: bold;
        color: #8E54E9;
    }
</style>