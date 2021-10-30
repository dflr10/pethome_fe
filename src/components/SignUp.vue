<template>
    <section class="vh-70 bg-image"
        style="background-color:#fff;">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div class="card" style="border-radius: 15px;">
                            <div class="card-body p-5">
                                <h3 class="text-center mb-5">Create an account</h3>
                                <form v-on:submit.prevent="processSignUp">
                                    <div class="form-outline mb-4">
                                        <input type="text" v-model="user.name" id="form3Example1cg" class="form-control form-control-lg" placeholder="Your name"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="text" v-model="user.username" id="form3Example2cg" class="form-control form-control-lg" placeholder="Your username"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="email" v-model="user.email" id="form3Example3cg" class="form-control form-control-lg" placeholder="Your email"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="password" v-model="user.password" id="form3Example4cg"
                                            class="form-control form-control-lg" placeholder="Password"/>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="password" v-model="user.password" id="form3Example4cdg"
                                            class="form-control form-control-lg" placeholder="Repeat your password"/>
                                    </div>
                                    <div class="form-check d-flex justify-content-center mb-5">
                                        <input class="form-check-input me-2" type="checkbox" value=""
                                            id="form2Example3cg" />
                                        <label class="form-check-label" for="form2Example3g">
                                            I agree all statements in <a href="#!" class="text-body"><u>Terms of
                                                    service</u></a>
                                        </label>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <button type="submit"
                                            class="btn btn-primary btn-block btn-lg gradient-custom-4">Register</button>
                                    </div>
                                    <hr class="my-4">
                                    <p class="text-center text-muted mb-0">Have already an account? <button  class="btn fw-bold text-body login" v-on:click="loadLogin"><u>Log in here</u></button></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "signup",
        data: function () {
            return {
                user: {
                    username: "",
                    password: "",
                    name: "",
                    email: "",
                }
            }
        },
        methods: {
            processSignUp: function () {
                axios.post(
                    "https://pethomemintic-be.herokuapp.com/user/",
                    this.user,
                    { headers: {} }
                )
                    .then((result) => {
                        let dataSignUp = {
                            username: this.user.username,
                            token_access: result.data.access,
                            token_refresh: result.data.refresh,
                        }
                        this.$emit('completedSignUp', dataSignUp);
                    })
                    .catch((error) => {
                        console.log(error)
                        alert("ERROR: Registration error.");
                    });
            },
            loadLogin: function () {
                this.$emit("loadLogin");
                this.$router.push({ name: "login" });
            }
        }
    }
</script>

<style scoped>
    .card {
        box-shadow: 3px 3px 5px #999;
        border:none;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2);
        margin: 4rem 0;
    }
    h3{
        color:#4776E6;
    }
    .btn {
        background-color: #8E54E9;
        border:none;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        color: #fff;
    }
    u{
        color:#4776E6;
    }
    .btn.login {
        background-color:white;
        color:#4776E6;
        box-shadow:none;
        width: 25%;
        padding: 0;
    }
    input {
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
</style>