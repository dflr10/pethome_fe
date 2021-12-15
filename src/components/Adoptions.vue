<template>

<div class="body-requests">
    
  <div v-if="!requests" class = "container div-center">
        <img class="vector-image" src="@/assets/norequests.webp" alt="">
        <p class="information-starry" >There are not adoption requests yet</p>
  </div>


  <div class="container" v-if="requests">
    <h2 class="req-h2"> We have found {{num_requests}} requests!</h2>
    <div class="row row-cols-1 row-cols-md-2 g-4 req-group">

   	  <div class="col" v-for="(req) in req_list" :key="req.id_"> <!-- Template for aproval or denial-->
	      <div class="card req-card">
       		<h2 class="card-header text-center">{{req.nombres}}'s request</h2>
	        <div class="card-body">
		        <div class="row about">
		          <div class="col-md-6 petInfo">
                            <img :src="imagePath + req['0'].image" class="img-fluid rounded-start req-img" alt="imagen">
        	            <h5 class="card-title">Adoption for {{req["0"].name}}</h5>
		            <p class="card-text"><b>Name:</b> {{req["0"].name}}</p>
		            <p class="card-text"><b>Description:</b> {{req["0"].description}}</p>
		            <p class="card-text"><b>Species:</b> {{req["0"].specie}}</p>
			    <p class="card-text"><b>Birthday:</b> {{req["0"].bday_aprox}}</p>
			    <p class="card-text"><b>Registered on:</b> {{req["0"].date_register}}</p>
			    <p class="card-text"><b>Available:</b> {{ req["0"].avaliable ? "Yes" : "No" }}</p>
		          </div>
		          <div class="col-md-6 person">
		            <h5 class="card-title">{{req.nombres}} {{req.apellidos}}</h5>
		            <p class="card-text"><b>First names:</b> {{req.nombres}}</p>
		            <p class="card-text"><b>Second names:</b> {{req.apellidos}}</p>
		            <p class="card-text"><b>Legal id:</b> {{req.cedula}}</p>
		            <p class="card-text"><b>Phone number:</b> {{req.celular}}</p>
		            <p class="card-text"><b>Email:</b> {{req.correo}}</p>
		            <p class="card-text"><b>Neighbour:</b> {{req.barrio}}</p>
		            <p class="card-text"><b>Adress:</b> {{req.direccion}}</p>
		            <p class="card-text"><b>Owns a house:</b> {{req.casapropia ? "Yes" : "No"}}</p>
		            <p class="card-text"><b>Remote job:</b> {{req.homejob ? "Yes" : "No"}}</p>
		            <p class="card-text"><b>Pet carer:</b> {{req.cuidador ? "Yes" : "No"}}</p>
		            <p class="card-text"><b>Salary:</b> {{req.salario}}</p>
		            <p class="card-text"><b>Pets owned:</b> {{req.numMascotas}}</p>
		            <p class="card-text"><b>Recommended:</b> {{req.recomendado ? "Yes" : "No"}}</p>
		          </div>
		        </div>

		        <div class="div-center group-btns">
	                  <button type="button" class="btn btn-primary mx-2 btn-request" @click="aprove_request">Aprove</button>
	                  <button type="button" class="btn btn-primary mx-2 btn-request" @click="delete_request">Deny</button>
		        </div>
		    </div>
	        </div>
        </div> <!--card template-->

     </div>
  </div>

</div>

</template>

<script>

   import gql from "graphql-tag";

   export default {

      name: "adoptions",

      data: function(){ return {
            requests: false,
	    num_requests: 0,
            
            pets_api: "https://pethomemintic-be.herokuapp.com",
            imagePath:"https://pethomemintic-be.herokuapp.com/images/", // PATH IMAGE

	    customersDetailByUsername: [],
	    petsAPI: [],
	    req_list: [],

	    pet_id : -1,

	    u_id: parseInt(localStorage.getItem("idUser")) || -1,
	    u_name:  localStorage.getItem("username") || "",
	}
      },

      apollo: {
          customersDetailByUsername: {
              query: gql`
    	             query CustomersDetailByUsername($username: String!) {
                         customersDetailByUsername(username: $username) {
                             salario
                             recomendado
                             username
                             numMascotas
                             nombres
                             id_
                             homejob
                             direccion
                             cuidador
                             correo
                             celular
                             cedula
                             casapropia
                             barrio
                             apellidos
                             idMascota
                         }
                    }
	   `,
	    variables(){
	        return {
                    username: this.u_id.toString(),
		}
	    }
	  },
          petsAPI: {
             query: gql`
	            query PetsAPI {
                        petsAPI {
			    id_pet
                            name
                            gender
                            breed
                            specie
                            bday_aprox
                            date_register
                            description
                            avaliable
			    image
                        }
                    }
	  `,
	    variables(){
	    }
          }
      },

      methods:{

           get_requests: function(){
	     try{
	         this.obtain_organized_requests(JSON.parse(JSON.stringify(this.customersDetailByUsername)));
		 if(this.num_requests > 0) {this.requests = true;}
	     }catch (error){
	         console.error(error); 
	         this.requests = false;
	     }

	   },

           delete_request: function( email, username ){
	      console.info(" Petition denied! ");
	   },

           aprove_request: function(){
              console.info(" Petition aproved! ");
	   },

           obtain_organized_requests: function( all_requests ){
	       all_requests.map( request => {
		   this.pet_id = request.idMascota;
                   Object.assign(request, this.obtain_pet());
		   this.req_list.push(request);
	       }); 

	   },

           obtain_pet: function( ){
               
		return JSON.parse(JSON.stringify(this.petsAPI))
			.filter( ( value ) => {
			    if(value.id_pet == this.pet_id)
			        this.num_requests++;
                            return value.id_pet == this.pet_id;
			});
	   },
	   
	},

      mounted: function(){
	  this.get_requests();
      },

      created: function(){ 
	    this.$apollo.queries.customersDetailByUsername.refetch();
	    this.$apollo.queries.petsAPI.refetch();
	 }
   }

</script>

<style scoped>


.body-requests{
   background-color: #f7f7f9;
   min-height: inherit; 
   padding-top: 3em;
   padding-bottom: 1em;
}

.vector-image{
   border-radius: 10px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.req-h2 {
   text-align: center; 
}

.req-img{
   max-width: 200px;
   margin-top: 1em;
   border-radius: 1em !important; 
}

.div-center  {
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 4em 2em 2em 2em;
}

.group-btns{
  flex-direction: row;
  padding: 0;
  justify-content: center;
}

.div-center .information-starry{
   color: #5c635f;
   font-weight: bold;
   font-size: 1.2em; 
   padding: 1em;
   
   animation: starry 2.2s infinite linear;
}

.req-group{
   margin-right: 0px;
   margin-left: 0px;
}

.req-card{
  border-radius: 1em;
  color: #5c5f66;
  animation: appear 0.8s;
}

.req-card .about{
  margin-top: 1em;
}

.petInfo, .person{
  max-height: 600px;
  max-width: 232px;
}

.person{
  border: 1px #c5c7cb solid;
  border-radius: 1em;
}

.petInfo{
  padding-bottom: 2em;
}

.card {
  align-items: center;
}

.card-header{
  background-color: rgba(0,0,0,0);
  border-bottom: none;
}

.card-text{
   margin-bottom: 0.2em;
   color: #707276;
   font-size: 0.9rem;
}

.card-text b{
   color: #5d6168;
}

.card-title{
  text-align: center;
}

.petInfo .card-title{
  margin-top: 1.4em;
}

.group-btns{
      margin-top: 2rem;  
}

.btn-request{
  width: 6em;
  color: white;
  border: none;
  -webkit-text-stroke: 0px #8E54E9;
  background-color: #8E54E9;
  padding:0.5rem 0.9rem;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  font-weight: 400;
}

.btn-request:hover {
  background-color: #7f3de9;
  transition: all 0.2s ease-in-out;
  transform: translateY(-0.5px) scale(1.05);
  cursor: pointer;
}

 @keyframes starry{
    0%   {
           color: #5c635f;
	   transform: rotate(0deg);
	 }
    25%  {
	   transform: rotate(5deg);
         }
    33%  {
           color: #8D54E9;
         }
    50%  {
	   transform: rotate(0deg);
         }
    66%  { 
           color: #4876E6; 
	 }
    75%  {
           transform: rotate(-5deg);
         }
    100% {
           color: #5c635f;
	   transform: rotate(0deg);
	 }
 }

@keyframes appear{
    from { 
          transform: translateY(5%);
	  opacity: 0;
	  }
    to   {
          transform: translateY(0%);
	  opacity: 1;
         }
}

 @media screen and (max-width: 750px) {

   .body-requests{
      padding-top: 1em;
    }

   .information-starry{
      text-align: center; 
    }

   .row > div, .group-btns{
      margin-top: 2rem;  
    }

   .req-card .person{
      border-right: none;
      border-top: 2px #c5c7cb solid;
    }

    .req-card .row{
      flex-direction: column-reverse;		
    }
 }

</style>
