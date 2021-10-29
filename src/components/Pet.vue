<template>
    <img class="loading" v-if="!loaded" src="../assets/loading.svg" alt="loading">
    <button v-if="loaded"  type="button" class="btn btn-add btn-primary float-left" data-bs-toggle="modal" data-bs-target="#addModal"
    v-on:click="addPet">Add new pet</button>
    <input class="form-control filter" v-if="loaded" v-model="nameFilter" v-on:keyup="filterPet" placeholder="Filter by name">
    <select name="select" v-if="loaded" class="form-control filter" v-model="specieFilter" @change="filterPet">
        <option value="">Filter by specie</option>
        <option value="dog" selected >Dogs</option>
        <option value="cat" >Cats</option>
    </select>
    <select name="select" v-if="loaded" class="form-control filter" v-model="avaliableFilter" @change="filterPet">
        <option value="">Filter by avaliables</option>
        <option value="true" selected >Yes</option>
        <option value="false" >No</option>
    </select>
    <div class="hero container" v-if="!pets.length > 0 && loaded">
            <h2> Click this button </h2>
            <p>to add your first pet!</p>
    </div>
    <div v-if="loaded" class="grid-fluid container">
        <div v-for="pet in pets" v-bind:key="pet.id_pet"  class="card" style="width: 18rem;">
            <img :src='imagePath+pet.image' class="card-img-top" alt="Pet image"/>
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
                <button type="button" class="btn btn-light  mr-1" data-bs-toggle="modal" data-bs-target="#addModal" v-on:click="editPet(pet)"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-light  mr-1" v-on:click="deletePet(pet.id_pet)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModal" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalTitle">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-row db-highlight mb-3">
                        <div class="input-group">
                            <form id="addForm" method="POST" action="<%= BASE_URL %>/pets/add">
                                <div class="form-group mb-3">
                                    <input type="text" class="id" v-model="id_pet">
                                    <div class="item">
                                        <span class="input-group-text">Pet name</span>
                                        <input type="text" class="form-control" v-model="name" aria-required="true" placeholder="Name">
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Description</span>
                                        <textarea type="text" class="form-control" v-model="description" aria-required="true" placeholder="Description"></textarea>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text form-control select-gender">Gender</span>
                                            <select name="select" v-if="loaded" class="form-control gender" v-model="gender" required>
                                                <option value="">Select Gender</option>
                                                <option value="Male" selected >Male</option>
                                                <option value="Female" >Female</option>
                                            </select>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text form-control select-gender">Specie</span>
                                            <select name="select" v-if="loaded" class="form-control gender" v-model="specie" required>
                                                <option value="">Select Specie</option>
                                                <option value="Dog" selected >Dog</option>
                                                <option value="Cat" >Cat</option>
                                            </select>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Breed</span>
                                        <input type="text" class="form-control" v-model="breed" aria-required="true" placeholder="Breed">
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Birthday</span>
                                        <input type="date" class="form-control" v-model="bday_aprox" aria-required="true" placeholder="Birthday">
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Date reg</span>
                                        <input v-if="id_pet!=0"  type="date" class="form-control" v-model="date_register" aria-required="true" placeholder="Date Register" readonly>
                                        <input v-if="id_pet==0" type="date" class="form-control" v-model="date_register" aria-required="true" placeholder="Date Register" readonly>
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Avaliable</span>
                                        <input type="text" class="form-control aval" v-model="avaliable" aria-required="true" placeholder="Avaliable" readonly>
                                        <button type="button" v-if="id_pet!=0" v-on:click="adoptPet" class="btn btn-change btn-primary">Change</button>
                                    </div>
                                </div>
                                <button type="button" v-if="id_pet==0" v-on:click="createPet" class="btn btn-add-new btn-primary">Add</button>
                                <button type="button" v-if="id_pet!=0" v-on:click="updatePet" class="btn btn-update btn-primary">Update</button>
                            </form>
                        </div>
                        <div class="p-2 w-30 bd-highlight imageModal">
                            <img :src='imagePath + image' alt="Pet image"/>
                                <input type="file"  name="image" id="image" class="inputfile m-2" accept="image/*" @change="uploadImage"/>
                        </div>
                    </div>
                </div>
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
                loaded: false,
                modalTitle:"",
                avaliableFilter: "",
                specieFilter: "",
                nameFilter: "",
                petsWithoutFilter: [],
                id_pet: 0,
                name: "",
                specie: "",
                breed: "",
                gender: "",
                bday_aprox: "",
                date_register:"",
                avaliable: false,
                description: "",
                image: "noImage.png",
                user:0,
                imagePath: "https://pethomemintic-be.herokuapp.com/images/",
            }
        },
        methods: {
            getPets: function () {
                axios.get('https://pethomemintic-be.herokuapp.com/pet/')
                    .then(response => {
                        this.pets = response.data;
                        this.user = parseInt(localStorage.getItem('idUser'));
                        this.petsWithoutFilter = this.pets.filter(pet => pet.user === this.user).reverse();
                        this.pets=this.petsWithoutFilter;
                        this.loaded = true;
                        })
                    .catch(error => {
                        console.log(error);
                    })
            },
            addPet: function () {
                this.modalTitle = "Add Pet";
                this.id_pet = 0;
                this.name = "";
                this.specie = "";
                this.breed = "";
                this.gender= "";
                this.bday_aprox = "";
                let time = Date.now();
                let today = new Date(time);
                if (today.getMonth()+1 < 10) {
                    this.date_register = today.getFullYear() + "-0" + (today.getMonth()+1) + "-" + today.getDate();
                } else {
                    this.date_register = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
                }
                this.avaliable = true;
                this.description = "";
                this.image = "noImage.png";
            },
            editPet: function (pet) {
                this.modalTitle = "Edit pet";
                this.id_pet = pet.id_pet;
                this.name = pet.name;
                this.specie = pet.specie;
                this.breed = pet.breed;
                this.gender = pet.gender;
                this.bday_aprox = pet.bday_aprox;
                this.date_register = pet.date_register;
                this.avaliable = pet.avaliable;
                this.description = pet.description;
                this.image = pet.image;
                this.user = pet.user;
            },
            adoptPet: function () {
                this.avaliable = !this.avaliable;
            },
            createPet: function () {
                axios.post('https://pethomemintic-be.herokuapp.com/pet/', {
                    name: this.name,
                    specie: this.specie,
                    breed: this.breed,
                    gender: this.gender,
                    bday_aprox: this.bday_aprox,
                    date_register: this.date_register,
                    avaliable: this.avaliable,
                    description: this.description,
                    image: this.image,
                    user: this.user
            },)
                .then(response => {
                    this.getPets();
                    })
                .catch(error => {
                    console.log(error);
                })
            },
            updatePet: function () {
                axios.put('https://pethomemintic-be.herokuapp.com/pet/', {
                    id_pet: this.id_pet,
                    name: this.name,
                    specie: this.specie,
                    breed: this.breed,
                    gender: this.gender,
                    bday_aprox: this.bday_aprox,
                    date_register: this.date_register,
                    avaliable: this.avaliable,
                    description: this.description,
                    image: this.image,
                    user: this.user
            },)
                .then(response => {
                    this.getPets();
                    })
                .catch(error => {
                    console.log(error);
                })
            },
            uploadImage: function(event){
                let formData = new FormData();
                formData.append('file', event.target.files[0]);
                axios.post('https://pethomemintic-be.herokuapp.com/pet/savefile/', formData)
                    .then(response => {
                        this.image = response.data;
                    }).catch(error => {
                        console.log(error);
                    })
            },
            filterPet: function (){
                let specieFilter = this.specieFilter;
                let avaliableFilter = this.avaliableFilter;
                let nameFilter = this.nameFilter;
                this.pets=this.petsWithoutFilter.filter(
                    function (el){
                        return el.specie.toString().toLowerCase().includes(specieFilter.toString().trim().toLowerCase())
                        && el.avaliable.toString().toLowerCase().includes(avaliableFilter.toString().trim().toLowerCase())
                        && el.name.toString().toLowerCase().includes(nameFilter.toString().trim().toLowerCase());

                    }
                );
            },
            deletePet: function (id) {
                if(!confirm("Are you sure you want to delete this pet?")){
                    return;
                }
                axios.delete('https://pethomemintic-be.herokuapp.com/pet/' + id +'/')
                    .then(response => {
                        this.getPets();
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
        align-self: center;
    }
    .card {
        margin: 2rem auto;
        border:none;
        border-radius: 8px;
        box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.1);
    }
    .card:hover {
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
    }
    .card-text {
        font-size: 1.2rem;
        color: rgb(82, 82, 100);
    }
    li  {
        color: rgb(82, 82, 100);
    }
    li strong {
        color: rgb(89, 92, 110);
    }
    img{
        width: 100%;
        height: auto;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
    }
    .name {
        color: #4776E6;
    }
    .btn{
        border: none;
        background: transparent;
    }
    .loading {
        width: 5%;
        display:block;
        margin: auto;
        padding-top: 12rem;
    }
    .btn-add, .btn-update, .btn-change, .btn-add-new {
        background-color: #8E54E9;
        margin: 2rem;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .btn-update {
        width: 100%;
        margin:1rem 0;
    }
    .btn-add-new {
        width: 100%;
        margin:1rem 0;
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .aval {
        width: 68%;
    }
    .change {
        display: flex;
    }
    .btn-change{
        margin: 0;
        width: 25%;
    }
    .form-control {
        margin: 0.5rem;
        display: block;
    }
    .id{
        display: none;
    }
    .item{
        display:flex;
        align-items: center;
        margin: 0.7rem;
    }
    .input-group-text {
        width: 55%;
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .input-group {
        display: flex;
    }
    .inputfile {
        padding: 0.5rem;
        background-color: rgb(240, 250, 246);
        width: 100%;
        border-radius: 8px;
    }
    .filter {
        display: inline-block;
        width: 20%;
        color: rgb(98, 98, 107);
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .select-gender {
        width: 35%;
    }
    .item .gender {
        width: 100%;
    }
    select, input, textarea {
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .imageModal img{
        border: none;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .modal-body  {
        border-radius: 8px;
    }
    .modal-content {
        border-radius: 8px;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    .modal-header {
        border: none;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
        margin-bottom: 0.3rem;
        border-radius: 8px;
    }
    .btn.btn-add.btn-primary.float-left:hover,
    .btn.btn-add-new.btn-primary:hover,
    .btn.btn-change.btn-primary:hover,
    .btn.btn-update.btn-primary:hover
    {
        background-color: #7f3de9;
        color: #fff;
        transition: all 0.2s ease-in-out;
    }
    .hero{
        background-image: url("../assets/empty.jpg");
        background-size: cover;
        background-position: center;
        min-height: 65.5vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #8E54E9;
        font-size: 2rem;
    }
    .hero h2,p{
        margin: 0 2rem;
        font-weight: bold;
        font-size: 2.5rem;
        -webkit-text-stroke: 1.5px #8E54E9;
        color: white;
    }
    .hero  h2{
        font-size: 3rem;
    }

    .hero img {
        width: 100%;
        height: auto;
    }
</style>