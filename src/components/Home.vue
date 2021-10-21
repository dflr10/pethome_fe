<template>
    <div class="hero container">
        <img src="https://placeimg.com/1024/280/animals" alt="Pethome hero image">
        <h2>¡ Welcome <span> {{username}} </span>!</h2>
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
        background-size: cover;
        background-position: center;
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .hero img {
        width: 100%;
        max-width: 100%;
        height: auto;
        border:none;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.5);

    }
     p {
        color: #4776E6;
        font-size: 2.5rem;
        text-align: center;
    }
    h2 {
        font-size: 2.5rem;
        font-weight: bold;
        color: #8E54E9;
    }
</style>