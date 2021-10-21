<template>
    <div v-if="loaded" class="grid-fluid container">
        <div v-for="pet in pets" v-bind:key="pet.id_pet"  class="card" style="width: 18rem;">
            <img src="https://placeimg.com/200/200/animals" class="card-img-top" alt="pet image">
            <div class="card-body">
                <h5 class="name card-title"><strong>{{pet.name}}</strong></h5>
                <p class="card-text">{{pet.description}}.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Gender: </strong>{{pet.gender}}</li>
                <li class="list-group-item"><strong>Specie: </strong>{{pet.specie}}</li>
                <li class="list-group-item"><strong>Breed: </strong>{{pet.breed}}</li>
                <li class="list-group-item"><strong>Birthday: </strong>{{pet.bday_aprox}}</li>
                <li class="list-group-item"><strong>Date register: </strong>{{pet.date_register}}</li>
                <li class="list-group-item"><strong>Avaliable: </strong>{{pet.avaliable}}</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-light  mr-1"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-light  mr-1"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "pet",
        data: function () {
            return {
                pets: [],
                loaded: false
            }
        },
        methods: {
            getPets: function () {
                axios.get('https://pethomemintic-be.herokuapp.com/pet/')
                    .then(response => {
                        this.pets = response.data;
                        this.loaded = true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        mounted: function () {
            this.getPets();
        }
    }
</script>

<style scoped>
    .grid-fluid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 1rem;
        grid-auto-rows: minmax(100px, auto);
    }
    .card {
        margin: 2rem;
        border:none;
        border-radius: 8px;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
    }
    .card:hover {
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
    }
    li strong {
        color: rgb(89, 92, 110);
    }
    img{
        border-radius: 8px 8px 0 0;
    }
    .name {
        color: #4776E6;
    }
    .btn{
        border: none;
        background: transparent;
    }

</style>