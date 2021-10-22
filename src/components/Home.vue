<template>
    <div class="hero container">
        <!-- <img src="../assets/hero2.jpg" alt="Pethome hero image"> -->
        <h2>¡ Welcome <span> {{username}} </span> !</h2>
        <p>Keeping track of your foundation pets has never been easier and faster.</p>
    </div>
</template>

<script>
    export default {
        name: "home",
        data: function () {
            return {
                username: localStorage.getItem('username') || ""
            }
        }
    }
</script>

<style scoped>
    .hero{
        background-image: url("../assets/hero.jpg");
        background-size: cover;
        background-position: center;
        min-height: 80.7vh;
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