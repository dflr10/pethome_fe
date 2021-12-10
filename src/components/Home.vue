<template>
        <div class="hero ">
            <div class="hero_home container">
                <h2 class="information--title"> Welcome <span> {{name}} </span> !</h2>
                <p class="information">Track your foundation's pets with our secure and reliable system. Never be worried about letting them down!</p>
            </div>
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
        min-height: 90vh;
    }

    .hero_home{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .hero img {
        width: 100%;
        height: auto;
    }
     .information {
         color: #4776E6;
        font-size: 1.8rem;
        text-align: center;
    }
    .information--title {
        margin-top: 1.4rem;
        font-size: 2rem;
        font-weight: bold;
        color: #8E54E9;
    }

    @media screen and (max-width: 680px){
        .hero_home{
            background-color:rgba(246, 245, 248, 0.8);
            padding: 3.4rem 0;
            border-radius: 4px;
            -webkit-backdrop-filter: blur(3px);
            backdrop-filter: blur(3px);
        }

        .hero .information, .information--title{
            color:rgba(54, 45, 66);
        }

        .hero .information--title{
            font-weight: bold;
        }

        .hero .information{
            font-size: 1.2em;
            padding: 1.7vw 5vw;
            text-align: center;
        }
    }
</style>
