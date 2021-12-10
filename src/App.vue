<template>
    <div id="app" class="app">
        <header class="header">
            <div class="logo">
                <img class="logo" src="../src/assets/pethome64.png" alt="pethome" >
                <h1 class="sitename">PETHOME</h1>
                <button class="logo_bars" @click="navbarCollapse">
                    <i class="fa" 
                        :class="[responsive_bars ? 'fa-times' : 'fa-bars fa-3x custom-fa-bars']" aria-hidden="true"></i>
                </button>
            </div>
            
            <nav class="header_nav" >
                <ul :class="[responsive_bars ? 'ul_navbar open' : 'ul_navbar']">
                    <li>
                        <button class="btn btn-primary btn-lg btn-block" v-if="is_auth" v-on:click="navbarCollapse(), loadHome()"> Home </button>
                    </li>
                    <li>
                        <button class="btn btn-primary btn-lg btn-block" v-if="is_auth" v-on:click="navbarCollapse(), loadPet()"> Pets </button>
                    </li>
                    <li>
                        <button class="btn btn-primary btn-lg btn-block" v-if="is_auth" v-on:click="navbarCollapse(), logOut()"> Log Out </button>
                    </li>
                    <li>
                        <button class="btn btn-primary btn-lg btn-block" v-if="!is_auth" v-on:click="navbarCollapse(), loadLogIn()" > Log in </button>
                    </li>
                    <li>
                        <button class="btn btn-primary btn-lg btn-block" v-if="!is_auth" v-on:click="navbarCollapse(), loadSignUp()" > Sign Up </button>
                    </li>
                </ul>
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
                is_auth: false,
                responsive_bars: false
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
            //alert("The session ended");
            this.verifyAuth();
            },
            completedLogIn: function(data) {
                localStorage.setItem("isAuth", true);
                localStorage.setItem("username", data.username);
                localStorage.setItem("token_access", data.token_access);
                localStorage.setItem("token_refresh", data.token_refresh);
                //alert("Successful authentication");
                this.verifyAuth();
            },
            completedSignUp: function(data) {
                this.completedLogIn(data);
            },
            navbarCollapse: function(){
                this.responsive_bars = !this.responsive_bars;
            },
        },
        created: function () {
            this.verifyAuth();
        },
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
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 3px 3px 0px #999;
        margin-bottom: 5px;
        /** esta propiedad hace que los componentes se alineen */
        display: flex;
    }

    

    .sitename{
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

    .logo_bars{
        /** normaliza el estilo del boton */
        background: none;
	    color: inherit;
	    border: none;
	    padding: 0;
	    font: inherit;
	    cursor: pointer;
	    outline: inherit;

        /** originalmente no se renderiza */
        display: none;
    }

    .logo_bars i{
        font-size: 2.8rem;
    }

    .header_nav ul{
        padding: 20px 0px 0px 0px;
        margin: 0;
        list-style-type: none;
    }
    
    .header_nav ul > li{
        display: inline-block;
    }

    i.custom-fa-bars{
        margin: 0px;
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
        background: #353235;
        background: -webkit-linear-gradient(to right, #353235, 5%, #362d42 );
        background: linear-gradient(to right, #353235, 5%, #362d42);
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
        font-size: 1rem;
    }
    .footer .media {
        margin-right: 2rem;
    }
    .btn.btn-primary.btn-lg.btn-block:hover {
        background-color: #7f3de9;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }

    @media screen and (max-width: 750px) {
        .header{
            display: inline-block;
        }

        .header ul{
            position: absolute;
            width: 100%;
            background: #4776E6;
            background: -webkit-linear-gradient(to right, #8E54E9, #4776E6);
            background: linear-gradient(to right, #8E54E9, #4776E6);
        }

        .ul_navbar{
            opacity: 0;
            visibility: hidden;
            transform: scaleY(0);
            transform-origin: top center;
            transition: .15s ease-in;
            transition-property: opacity, transform, visibility;
        }

        .open{
            opacity: 1;
            transform: scaleY(1);
            visibility: visible;
            z-index: 1;
        }

        .header .logo {
           align-items: end;
           justify-content: center;
        }

        .sitename{
            /** Cambia la distancia entre el logo y la hamburguesa */
            padding-right: 45%;
        }


        .logo_bars{
            display: flex;
        }

        .header_nav ul{
            padding-bottom: 10px;
        }

        .header_nav ul > li{
            display:block;
            width: 50%;
            margin: auto;
            margin-top: 4px;
            margin-bottom: 4px;
        }

        .header_nav .btn{
            width: 100%;
            color: #362d42;
            margin: 0;
        }


        .footer{
            height: 12vh;
        }

	.footer span{
	    display: none;
	}

	.footer .media{
	    margin: auto;
	} 

        .media i{
            margin: 0.4rem;
            font-size: 1.2rem;
	    padding: 0px 1.6rem;
        }
    }
</style>
