<template>
    <div id="app" class="app">
        <header class="header">
            <div class="logo">
                <img class="logo" src="../src/assets/pethome64.png" alt="pethome" >
                <h1>PETHOME</h1>
            </div>
            <nav>
                <button class="btn btn-primary btn-lg btn-block" v-if="is_auth" v-on:click="loadHome"> Home </button>
                <button class="btn btn-primary btn-lg btn-block" v-if="is_auth" v-on:click="loadPet"> Pets </button>
                <button class="btn btn-primary btn-lg btn-block" v-if="is_auth" v-on:click="logOut"> Log Out </button>
                <button class="btn btn-primary btn-lg btn-block" v-if="!is_auth" v-on:click="loadLogIn" > Log in </button>
                <button class="btn btn-primary btn-lg btn-block" v-if="!is_auth" v-on:click="loadSignUp" > Sign Up </button>
            </nav>
        </header>

        <main>
            <router-view
            v-on:completedLogIn="completedLogIn"
            v-on:completedSignUp="completedSignUp"
            v-on:logOut="logOut">
            </router-view>
        </main>

        <footer class="footer">
            <span>Developed by Group 1</span>
            <div class="media">
                <a href="https://twitter.com/dflr10" rel="noopener" target="_blank">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/in/daniel-felipe-lozada-ramirez/" rel="noopener" target="_blank">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="mailto:felipe_lozada04102@elpoli.edu.co" rel="noopener" target="_blank">
                    <i class="far fa-envelope"></i>
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data: function () {
            return {
                is_auth: false
            }
        },
        components: {
        },
        methods: {
            verifyAuth: function () {
                this.is_auth = localStorage.getItem("isAuth") || false;
                if (this.is_auth == false){
                    this.$router.push({ name: "login" });
                }else{
                    this.$router.push({ name: "home" });
                }
            },
            loadLogIn: function () {
                this.$router.push({ name: "login" });
            },
            loadSignUp: function () {
                this.$router.push({ name: "signup" });
            },
            loadHome: function() {
            this.$router.push({ name: "home" });
            },
            loadPet: function () {
                this.$router.push({ name: "pet" });
            },
            logOut: function () {
            localStorage.clear();
            this.verifyAuth();
            },
            completedLogIn: function(data) {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("username", data.username);
                localStorage.setItem("token_access", data.token_access);
                localStorage.setItem("token_refresh", data.token_refresh);
                this.verifyAuth();
            },
            completedSignUp: function(data) {
                this.completedLogIn(data);
            },
        },
        created: function () {
            this.verifyAuth();
        }
    }
</script>

<style>
    body {
        margin:0 0 0 0;
    }
    .header {
        position: sticky;
        top: 0;
        z-index: 1;
        margin:0;
        padding:0;
        width: 100%;
        height: 10vh;
        min-height: 90px;
        background: #4776E6;
        background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);
        background: linear-gradient(to right, #8E54E9, #4776E6);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 3px 3px 0px #999;
        margin-bottom: 5px;
    }
    .header h1 {
        margin-top:2rem;
        margin-left: 0.5rem;
        width: 20%;
        text-align: left;
    }
    .header img {
        margin-left: 2rem;
    }
    .header .logo {
        display: flex;
        align-items: center;
    }
    .header .btn {
        margin: 0 2rem;
        background-color: #fff;
        color: #4776E6;
        font-weight: 500;
        border: none;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);

    }
    main {
        min-height: calc(100vh - 7.97rem);
        background-color:#f6fbfe;
        background-color: #fff;

    }
    .footer {
        margin:0;
        padding:0;
        width: 100%;
        height: 2rem;
        background: #4776E6;
        background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);
        background: linear-gradient(to right, #8E54E9, #4776E6);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* box-shadow: 1px 3px 3px 5px #999; */
        text-align: center;
    }
    .footer a>i {
        color: #fff;
        }
    .footer a>i:hover{
        transform: translateY(-1px) scale(1.05);
    }
    .media i {
        margin-left:  2rem;
    }
    .footer span {
        margin-left: 2rem;
    }
    .footer .media {
        margin-right: 2rem;
    }
    .btn.btn-primary.btn-lg.btn-block:hover {
        background-color: #7f3de9;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }
</style>