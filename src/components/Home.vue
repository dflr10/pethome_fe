<template>
    <div class="hero">
        <img src="/src/assets/hero.jpg" alt="Pethome hero image">
        <h2>¡Bienvenido <span> {{username}} </span>!</h2>
        <p>Keeping track of your foundation pets has never been easier and faster.</p>
    </div>
</template>
<script>
    export default {
        name: "home",
        data: function () {
            return {
                username: localStorage.getItem('username') || "none"
            }
        }
    }
</script>

<style scoped>
    .hero{
        margin-top: 2rem;
        background-image: url("/src/assets/hero.jpg");
        background-size: cover;
        background-position: center;
        min-height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    p{
        color: #4776E6;
        font-size: 2rem;
        text-align: center;
    }
</style>