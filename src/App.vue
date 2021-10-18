<template>
    <div id="app" class="app">
        <header class="header">
            <img class="logo" src="../src/assets/pethome64.png" alt="pethome" >
            <h1>PETHOME</h1>
        </header>
        <main>
        </main>
        <footer class="footer">
            <span>Developed by Group 6</span>
            <div class="media">
                <a href="#">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="#">
                    <i class="fab fa-github"></i>
                </a>
                <a href="#">
                    <i class="far fa-envelope"></i>
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
    export default
        {
            name: 'App'
            ,
            data
                : function () {
                },
            methods:
            {
            },
            created
                : function () {
                }
        }
</script>

<style>
    body {
        margin:0 0 0 0;
        
    }
    .header {
        margin:0;
        padding:0;
        width: 100%;
        height: 10vh;
        min-height: 100px;
        background: #4776E6;
        background: -webkit-linear-gradient(to right, #8E54E9, #4776E6); 
        background: linear-gradient(to right, #8E54E9, #4776E6);
        color: #fff;
        display: flex;
        align-items: center;
        box-shadow: 3px 3px 5px #999;
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
    main{
        min-height: calc(100vh - 8.28rem);
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
        box-shadow: 1px 3px 3px 5px #999;
        text-align: center;
    }
    .footer a>i{
        color: #fff;
        }
    .footer a>i:hover{
        transform: translateY(-1px) scale(1.05);
    }
    .media i{
        margin: 0 1rem;
    }
    .footer span{
        margin-left: 2rem;
    }
    .footer .media{
        margin-right: 2rem;
    }
</style>