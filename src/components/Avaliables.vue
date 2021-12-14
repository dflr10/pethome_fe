/* REALIZAR UN COMPONENTE QUE PERMITA MOSTRAR TODAS LAS MASCOTAS DISPONIBLES
PARA ADOPCIÓN POR PARTE DE USUARIOS REGISTRADOS A USUARIOS NOO REGISTRADOS, ESTOS
PODRÁN ENVIAR UN FORMULARIO EN EL QUE PODRÁ APLICAR COMO ADOPTANTE DE UNA MASCOTA.
eL CENTRO DE ADOPCIÓN SE PONDRÁ EN CONTACTO CON ESTA PERSONA POR MEDIO EXTERNOS A PETHOME. */

<template>
    <img class="loading" v-if="!loaded" src="../assets/loading.svg" alt="loading">

    <div class="hero" v-if="arePetsAvaliablesEmpty() && loaded && isPetsEmpty()" >
      <div class="container">
          <div class="hero " v-if="arePetsAvaliablesEmpty() && loaded && isPetsEmpty()" v-bind:class="{'no-search-results' : isPetsEmpty()}">
        <div class="container">
            <h2 class="hero-title">Sorry, we don't have any avaliable for adoption pet yet.</h2>
        </div>
    </div>
      </div>
    </div>
      <h5 class="hero-title avaliable" v-if="loaded">This pets are waiting for a new home.</h5>
    <div v-if="loaded" class="grid-fluid container">
        <div v-for="pet in pets" v-bind:key="pet.id_pet" class="card" style="width: 18rem;">
            <div class="card-body top" v-bind:class="{'no-avaliable' : pet.avaliable==false}">
                <img  :src='imagePath+pet.image' class="card-img-top " alt="Pet image"/>
                <h5 class="name card-title"><strong>{{pet.name}}</strong></h5>
                <p class="card-text">{{pet.description}}.</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Gender: </strong>{{pet.gender}}</li>
                <li class="list-group-item"><strong>Specie: </strong>{{pet.specie}}</li>
                <li class="list-group-item"><strong>Breed: </strong>{{pet.breed}}</li>
                <li class="list-group-item"><strong>Birthday: </strong>{{pet.bday_aprox}}</li>
                <li class="list-group-item"><strong>Date register: </strong>{{pet.date_register}}</li>
                <li class="list-group-item avaliable"><strong>Avaliable: </strong>{{pet.avaliable}}</li>
            </ul>
            </div>
            <div id="down" class="card-body down">
                <button type="button" class="btn btn-light  mr-1"  data-bs-toggle="modal" data-bs-target="#addModal" v-on:click="adoptBtn(pet)"><i class="fas fa-paw"></i> Adopt me</button>
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
                    <div class="d-flex db-highlight mb-3 mobile">
                      <div class="p-2 w-30 bd-highlight imageModal">
                            <img :src='imagePath + image' alt="Pet image"/>
                        </div>
                        <div class="input-group">
                            <form id="addForm" class="pet-form" method="POST" action="<%= BASE_URL %>/pets/add">
                                <div class="form-group mb-3">
                                    <input type="text" class="id" v-model="id_pet">
                                    <div class="item">
                                        <span class="input-group-text">Pet name</span>
                                        <input type="text" class="form-control" v-model="name" aria-required="true" placeholder="Name"
                                        readonly>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Description</span>
                                        <textarea type="text" class="form-control" v-model="description" aria-required="true" placeholder="Description"
                                        readonly></textarea>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Gender</span>
                                        <input type="text" class="form-control" v-model="gender" aria-required="true" placeholder="Gender"
                                        readonly/>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Specie</span>
                                        <input type="text" class="form-control" v-model="specie" aria-required="true" placeholder="Specie"
                                        readonly/>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Breed</span>
                                        <input type="text" class="form-control" v-model="breed" aria-required="true" placeholder="Breed"
                                        readonly/>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Birthday</span>
                                        <input type="date" class="form-control date" v-model="bday_aprox" aria-required="true" placeholder="Birthday" readonly/>
                                    </div>
                                    <div class="item">
                                        <span class="input-group-text">Date reg</span>
                                        <input type="date" class="form-control date" v-model="date_register" aria-required="true" placeholder="Date Register" readonly>
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Avaliable</span>
                                        <input type="text" class="form-control aval" v-model="avaliable" aria-required="true" placeholder="Avaliable" readonly>
                                    </div>
                                    <br/>
                                    <hr/>
                                    <h2>Adoptant information</h2>
                                    <br/>
                                    <div class="item change">
                                        <span class="input-group-text">Username</span>
                                        <input type="text" class="form-control" v-model="username" aria-required="true" placeholder="Username" readonly >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Names</span>
                                        <input type="text" class="form-control" v-model="nombres" aria-required="true" placeholder="Names" >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Last names</span>
                                        <input type="text" class="form-control" v-model="apellidos" aria-required="true" placeholder="Last names" >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">ID num</span>
                                        <input type="text" class="form-control" v-model="cedula" aria-required="true" placeholder="123456789" >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Email*</span>
                                        <input type="email" class="form-control" v-model="correo" aria-required="true" placeholder="example@mail.com" required>
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Vicinity</span>
                                        <input type="text" class="form-control" v-model="barrio" aria-required="true" placeholder="Vicinity" >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Address</span>
                                        <input type="text" class="form-control" v-model="direcion" aria-required="true" placeholder="Cll 1 # 2-3" >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Own home</span>
                                        <input type="text" class="form-control aval" v-model="casapropia" aria-required="true" readonly>
                                        <button type="button" v-if="id_pet!=0" v-on:click="isOwnHome" class="btn btn-change btn-primary"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Home-office</span>
                                        <input type="text" class="form-control aval" v-model="homejob" aria-required="true" readonly>
                                        <button type="button" v-if="id_pet!=0" v-on:click="isHomeJob" class="btn btn-change btn-primary"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Carer</span>
                                        <input type="text" class="form-control aval" v-model="cuidador" aria-required="true" readonly>
                                        <button type="button" v-if="id_pet!=0" v-on:click="haveCarer" class="btn btn-change btn-primary"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Salary</span>
                                        <input type="number" class="form-control" v-model="salario" aria-required="true" placeholder="123456789" >
                                    </div>
                                    <div class="item change">
                                        <span class="input-group-text">Pets num</span>
                                        <input type="number" class="form-control" v-model="numMascotas" aria-required="true" placeholder="1,2,3..." >
                                    </div>
                                </div>
                                    <button type="button" v-if="id_pet!=0" v-on:click="sendAdoptionRequest" class="btn btn-update btn-primary" data-bs-dismiss="modal" aria-label="Close">Send adoption request</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import gql from "graphql-tag";

    export default {
        name: "avaliables",
        data: function () {
            return {
                deploy_route: "https://pethomemintic-be.herokuapp.com", // ruta heroku -> "https://pethomemintic-be.herokuapp.com" , ruta_local -> "http://127.0.0.1:8000"
                imagePath:"https://pethomemintic-be.herokuapp.com/images/", // PATH IMAGEN UPLOAD

                pets: [],
                loaded: false,
                modalTitle:"",
                avaliablePets: [],
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

                _id:"",
                username:"",
                nombres:"",
                apellidos:"",
                cedula:"",
                celular:"",
                correo:"",
                barrio:"",
                direccion:"",
                idMascota:0,
                casapropia:false,
                homejob:false,
                cuidador:false,
                salario:0,
                numMascotas:0,
                recomendado:false,
            }
        },
        methods: {
            getAvaliablePets: function () {
                //Cambiar de axios a gql
                axios.get(this.deploy_route + "/pet/")
                    .then(response => {
                        this.pets = response.data;
                        this.avaliablePets = this.pets.filter(pet => pet.avaliable).reverse();
                        this.pets=this.avaliablePets;
                        this.loaded = true;
                        })
                    .catch(error => {
                        console.log(error);
                    })
            },
            filterPet: function (){
              //Todo make filter code by city
            },
            adoptBtn: function (pet) {
                this.modalTitle = "Adopting pet";
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
                this.idMascota = this.id_pet;
            },
            sendAdoptionRequest: async function () {
	            await this.$apollo.mutate({
                    mutation: gql`
               		  mutation CreateCustomer($custommInput: customInput!) {
                        createCustomer(custommInput: $custommInput) {
                            id_
                            username
                            nombres
                            apellidos
                            cedula
                            celular
                            correo
                            barrio
                            direccion
                            idMascota
                            casapropia
                            homejob
                            cuidador
                            salario
                            numMascotas
                            recomendado
                        }
                    }`,
                    variables: {
                        "custommInput":{
                            "username": this.user+"",
                            "nombres": this.nombres,
                            "apellidos": this.apellidos,
                            "cedula": this.cedula,
                            "celular": this.celular,
                            "correo": this.correo,
                            "barrio": this.barrio,
                            "direccion": this.direccion,
                            "idMascota": this.idMascota,
                            "casapropia": this.casapropia,
                            "homejob": this.homejob,
                            "cuidador": this.cuidador,
                            "salario": this.salario,
                            "numMascotas": this.numMascotas,
                            "recomendado": this.recomendado,
                            "id_": this.user+this.correo,
                        }
                    },
                })
                .then((result) => {
	     	     console.info(result);
                 })
                .catch((error) => {
	            console.log(error);
	         });
            },
            arePetsAvaliablesEmpty: function () {
                return this.avaliablePets.length<=0;
            },
            isPetsEmpty: function () {
                return this.pets.length<=0;
            },
            isOwnHome: function () {
                this.casapropia = !this.casapropia;
            },
            isHomeJob: function () {
                this.homejob = !this.homejob;
            },
            haveCarer: function () {
                this.cuidador = !this.cuidador;
            },
            setUsername: function () {
                this.username = this.correo + this.user + this.id_pet;
            },
        },
        mounted: function () {
            this.getAvaliablePets();
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
    li.avaliable {
        display: none;
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
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
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
        min-height: 80.8vh;
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

    .change .input-group-text{
        width: 75%;
    }

    .btn-change{
        margin: 0;
        width: 25%;
    }
    .form-control {
        margin: 0.5rem;
        margin-right: 0;
        display: block;
    }

    .form-control.aval{
        text-align: center;
    }

    .id{
        display: none;
    }
    .item{
        display:flex;
        align-items: center;
    }
    .input-group-text {
        width: 55%;
        margin: 0; /** sobreescribe el atributo de form-control para los inputs */
        text-align: left;
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
    .item .about {
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
        transform: translateY(-0.5px) scale(1.05);
    }
    .hero{
        background-size: cover;
        background-position: center;
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        color: #8E54E9;
        font-size: 2rem;
    }
    .hero.no-search-results {
        background-image: url("../assets/noSearchResults.png");
    }
    .hero, .hero-title, .p-title{
        margin: 0 2rem;
        font-weight: bold;
        font-size: 2.5rem;
        text-shadow: -1.5px 1.5px #8E54E9,
                     1.5px 1.5px #8E54E9,
                     1.5px -1.5px #8E54E9,
                     -1.5px -1.5px #8E54E9;
        color: white;
    }
     .avaliable {
        margin: 0 2rem;
        text-align: center;
        font-weight: bold;
        font-size: 2rem;
        padding: 2rem 0;
        text-shadow: -1.5px 1.5px #8E54E9,
                     1.5px 1.5px #8E54E9,
                     1.5px -1.5px #8E54E9,
                     -1.5px -1.5px #8E54E9;
        color: white;
    }
    .hero img {
        width: 100%;
        height: auto;
    }
    div .card.no-avaliable  {
        filter: blur(2px);
        background-color: #d7c0fb;
    }
    .card-title{
        margin-top: 1rem;
    }
    .card-body.top.no-avaliable {
        filter: blur(2px);
    }
    .btn.btn-light.mr-1{
        background-color: #8E54E9;
        color: #fff;
        margin: 0 0.5rem;
    }
    .btn.btn-light.mr-1:hover{
        background-color: #7f3de9;
        color: #fff;
        transition: all 0.2s ease-in-out;
        transform: translateY(-0.5px) scale(1.05);
    }
    .container .hero-title button {
        color: white;
        border: none;
        -webkit-text-stroke: 0px #8E54E9;
        background-color: #8E54E9;
        padding:0.5rem 0.9rem;
        border-radius: 8px;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
        font-weight: 400;
    }
    .hero.container button:hover {
        background-color: #7f3de9;
        transition: all 0.2s ease-in-out;
        transform: translateY(-0.5px) scale(1.05);
        cursor: pointer;
    }

    .d-flex.db-highlight.mb-3.mobile, .input-group {
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    .d-flex.db-highlight.mb-3.mobile img {
      width:250px
    }


    @media screen and (max-width: 610px){
        
        /** Para el formulario de filtros */
        div.pet-div-form > *.filter{
            display: block;
        }
        
        div.pet-div-form input.filter, 
        div.pet-div-form select.filter
        {
            width: 100%;
            margin: 0;
            margin-top: 10px;
            text-align: center;
        }

        /** btn-add-new */
        div.pet-div-form button{
            margin: 0;
            margin-top: 2rem;
            width: 100%;
        }

        .hero{
            margin: 4rem 0;
            background-image: unset;
            min-height: 0vh;
            display: grid;
            justify-items: center;
        }

        .hero .hero-title{
            font-size: 1.3rem;
            font-weight: normal;
            text-shadow: unset;
            color: #464677;
        }


        /** Modal */

        .mobile{
            /** Bootstrap 5 usa !important */
            flex-direction: column !important;
        }

        .input-group {
            flex-direction: column;
        }

        .pet-form .form-control{
            margin-left: 0;
	    max-width: 50vw;
        }

        .item:nth-last-child(-n + 2) .form-control{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        .item:nth-last-child(-n + 2) .input-group-text{
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }

	.form-control.date{
	   padding-left:0.25rem;
	}


    }

</style>
