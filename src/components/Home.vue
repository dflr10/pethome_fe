<template>
        <div class="hero ">
            <div class="hero_home container">
                <h2 class="information--title"> Welcome <span> {{name}} </span> !</h2>
                <p class="information">Keeping track your foundation pets has never been easier and faster!</p>
            </div>
        </div>
</template>

<script>

    import jwt_decode from "jwt-decode";
    import gql from "graphql-tag";

    export default {

        name: "home",

        data: function () {
            return {
                name: "",
                email: "",
		userDetailById : {},
                username: localStorage.getItem('username') || "",

                loaded: false,
            }
        },

        methods: {
            getData: function () {

                if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                    this.$emit('logOut');
                    return;
                }

                this.verifyToken();
                let token = localStorage.getItem("token_access");
	        
		if(this.userDetailById.name && this.userDetailById.email){
		    this.name = this.userDetailById.name;
		    this.email = this.userDetailById.email;
                }
	    },
            verifyToken: async function () {

		await this.$apollo.mutate({

                    mutation: gql`
      		              mutation RefreshToken($token: token!) {
                                  refreshToken(token: $token) {
                                      access
                                  }
                              }
                    `,

		    variables: {
                        token: {
                             refresh: localStorage.getItem("token_refresh"),
                        },
		    },

		})
		.then(result =>{ localStorage.setItem("token_access", result.data.refreshToken.access);})
		.catch(error => { 
		    this.$emit('logOut');
		});

            }
        },
        apollo: {
          userDetailById: {
              query: gql`
                 query UserDetailById($userId: Int!) {
                    userDetailById(userId: $userId) {
                       name
                       email
                    }
                 }
	      `,
	      variables(){
	        return {userId: parseInt(localStorage.getItem("idUser")),}
	      },
	  }
        },
        created: function () {
	    this.$apollo.queries.userDetailById.refetch();
        },
        mounted: function() {
            this.getData();
	}
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
