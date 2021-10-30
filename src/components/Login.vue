<template>
    <section style="background-color: #fff">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <form v-on:submit.prevent="processLogInUser" class="card-body p-5 text-center">
                            <h3 class="mb-5">Log in</h3>
                            <div class="form-outline mb-4">
                                <input type="text" v-model="user.username" id="typeUsernameX-2" class="form-control form-control-lg" placeholder="Username"/>
                            </div>
                            <div class="form-outline mb-4">
                                <input type="password" v-model="user.password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Password"/>
                            </div>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" > Log in
                            </button>
                            <hr class="my-4">
                            <p class="text-center text-muted mb-0">Don't have an account? <button  class="btn fw-bold text-body signup" v-on:click="loadSignUp"><u>Sign up here</u></button></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "login",
        data: function () {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            processLogInUser: function () {
                axios.post(
                    "https://pethomemintic-be.herokuapp.com/login/",
                    this.user,
                    { headers: {} }
                )
                    .then((result) => {
                        let dataLogIn = {
                            username: this.user.username,
                            token_access: result.data.access,
                            token_refresh: result.data.refresh,
                        }
                        this.$emit("completedLogIn", dataLogIn);
                    })
                    .catch((error) => {
                        if (error.response.status == "401")
                            alert("ERROR 401: Wrong credentials.");
                    });
            },
            loadSignUp: function () {
                this.$emit("loadSignUp");
                this.$router.push({ name: "signup" });
            }
        }
    }
</script>

<style scoped>
    .card {
        box-shadow: 3px 3px 5px #999;
        border:none;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2);
    }
    h3{
        color:#4776E6;
    }
    .btn {
        border:none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        color: #fff;
        background-color: #8E54E9;
    }
    u{
        color:#4776E6;
    }
    .btn.signup {
        background-color:white;
        color:#4776E6;
        box-shadow:none;
        width: 35%;
        padding: 0;
    }
    input {
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
</style>