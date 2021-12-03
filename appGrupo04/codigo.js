var fila="<tr id=''><td class='id'></td><td class='foto'></td><td class='video'></td><td class='nombre'></td><td class='descripción'></td><td class='duracion'></td><td class='categoria'></td><td><span class='accion2'></span><span class='accion'></span></td></tr>";
var carreras=null;




	 function crearBoton(id){
		 var boton="<button class='x' onclick='borrarCarrera("+id+");'>Borrar</button>";
         return boton;
	 }

	 function crearBotonActualizar(id){
		var boton="<button class='x' onclick='obtenerDatos("+id+")'>Actualizar</button>";
		return boton;
	}

//metodo que elije si crear carrera o actulizar
	function botonGuardar(){
		
		var codigo = document.getElementById('id-value');
		if (codigo.hidden){	
			agregarCarrera();
			location.reload();
		}
		else{
			actualizarCarrera();
			location.reload();
		}
	}

	
//obtener datos para mostrarlos(Para actualizar) 
	function obtenerDatos(codigo){
	fetch('http://localhost:3000/carreras/'+codigo,{method:"get"})
	.then(response=>response.json())
	.then(data=>{
		carreras=data;
		mostrarDato(carreras)
	});
}  	
//mostar los datos en los campos(Para actualizar)
function mostrarDato(carreraOb){
	var lblcodigo = document.getElementById('lblCodigo');
	var codigo = document.getElementById('id-value');
	var nombre = document.getElementById('nombre-value');
	var imagen = document.getElementById('imagen-value');
	var video = document.getElementById('video-value');
	var descripcion = document.getElementById('descripcion-value');
	var duracion = document.getElementById('duracion-value');
	var categoria = document.getElementById('categoria-value');
	codigo.setAttribute('value', carreraOb.id);
	nombre.setAttribute('value', carreraOb.nombre);
	imagen.setAttribute('value', carreraOb.imagen);
	video.setAttribute('value', carreraOb.video);
	descripcion.setAttribute('value', carreraOb.descripcion);
	duracion.setAttribute('value', carreraOb.duracion);
	categoria.value=carreraOb.categoria;
	var arriba=document.getElementById('inicio');
	arriba.focus();
	nombre.focus();
	codigo.disabled = true;
	codigo.removeAttribute('hidden');
	lblcodigo.removeAttribute('hidden');
}

	 //Mostrar Carreras
	function obtenerCarreras() {
	  fetch('http://localhost:3000/carreras')
            .then(res=>res.json())
            .then(data=>{
				carreras=data;				
				listarCarreras(carreras)})
			.catch(error => {
                    alert(error);
                } )
}
//Eliminar Carrera
function borrarCarrera(id) {
	var delresult;
	var url='http://localhost:3000/carreras/'+id;
	
	  fetch(url,{method:"DELETE"})
            .then( res=>res.status)
            .then(codigo=>{
switch(codigo) {
			case 200: alert("Carrerar Universitaria borrada con éxito");			         
					  document.querySelector("inventario").click();
					  location.reload();
					  break;
			case 404: alert("Carrera universitaria no existe");break; }
});	  	
	

}

//Categorías
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "Ingeniería":code="c1";break;
	    case "Derecho":code="c2";break;
		case "Medicina":code="c3";break;
		case "Economía":code="c4";break;
	}
	return code;
}   
var orden=0;
	  
//Listar Carreras; esta funcion se utiliza en mostrar productos
	function listarCarreras(carreras) {
	  var nombre=document.getElementById("nombre"); 
	  nombre.setAttribute("onclick", "orden*=-1;listarCarreras(carreras);");
	  var categoria=document.getElementById("Categoria"); 
	  categoria.setAttribute("onclick", "orden*=-1;listarCarreras(carreras);");
	  var num=carreras.length;
	  var listado=document.getElementById("listado");
	  var ids,videos,nombres,descriptions,categories,fotos,duracion,accion, accion2;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  videos=document.getElementsByClassName("video");
	  descriptions=document.getElementsByClassName("descripción");
	  categories=document.getElementsByClassName("categoria");   
	  fotos=document.getElementsByClassName("foto");   
	  nombres=document.getElementsByClassName("nombre");
	  duracion=document.getElementsByClassName("duracion");
	  accion=document.getElementsByClassName("accion");
	  accion2=document.getElementsByClassName("accion2");

	  if(orden===0) 
	  {
		orden=-1;nombre.innerHTML="Nombre de Carrera"
	  }
	  else{
	    if(orden==1) {ordenarAsc(carreras,"nombre");nombre.innerHTML="Nombre de Carrera";nombre.style.color="black"}
	    else 
	    if(orden==-1) {ordenarDesc(carreras,"nombre");nombre.innerHTML="Nombre de Carrera";nombre.style.color="black"}
	  }
	  if(orden===0) 
	  {
		  orden=-1;categoria.innerHTML="Categoria"
	  }
	  else{
		if(orden==1) {ordenarAsc(carreras,"categoria");categoria.innerHTML="Categoria";categoria.style.color="black";}
		else 
		if(orden==-1) {ordenarDesc(carreras,"categoria");categoria.innerHTML="Categoria";categoria.style.color="black";}
	  }	  
	
		  var boton="";
		  var boton2="";
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=carreras[nfila].id;
		boton = crearBoton(carreras[nfila].id);
		boton2=	crearBotonActualizar(carreras[nfila].id);
		descriptions[nfila].innerHTML=carreras[nfila].descripcion;
		duracion[nfila].innerHTML=carreras[nfila].duracion;
		categories[nfila].innerHTML=carreras[nfila].categoria;
		accion[nfila].innerHTML=boton;
		accion2[nfila].innerHTML=boton2;
		catcode=codigoCat(carreras[nfila].categoria);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		tr.setAttribute("id","fila"+carreras[nfila].id)
		nombres[nfila].innerHTML=carreras[nfila].nombre;
		fotos[nfila].innerHTML="<img src='"+carreras[nfila].imagen+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+carreras[nfila].imagen+"');" );
		videos[nfila].innerHTML="<iframe width='280' height='150'src='"+carreras[nfila].video+"'title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
		videos[nfila].firstChild.setAttribute("onclick","window.open('"+carreras[nfila].video+"');" );		
		}
	}

//Odenar
function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}

//actualizar carreras
function actualizarCarrera(){
	obtenerCarreras();
const codigo = document.getElementById('id-value').value;
const nombre = document.getElementById('nombre-value').value;
const imagen = document.getElementById('imagen-value').value;
const video = document.getElementById('video-value').value;
const descripcion = document.getElementById('descripcion-value').value;
const duracion = document.getElementById('duracion-value').value;
const categoria = document.getElementById('categoria-value').value;
var addresult;
	var miCarrera = {id:codigo,imagen:imagen,video:video,categoria:categoria,nombre: nombre,	descripcion:descripcion,duracion: duracion};
	 fetch('http://localhost:3000/carreras/'+codigo, {
		method: "put",
		body: JSON.stringify(miCarrera),
	  headers: {
	 'Accept': 'application/json',
	 'Content-type': 'application/json; charset=UTF-8',
	  }}).then(response=>response.json()).then(data=>addresult=data);

	  obtenerCarreras();
	  
}


function agregarCarrera(){
	//var codigo = document.getElementById('id-value').value;
	var nombre = document.getElementById('nombre-value').value;
	var imagen = document.getElementById('imagen-value').value;
	var video = document.getElementById('video-value').value;
	var descripcion = document.getElementById('descripcion-value').value;
	var duracion = document.getElementById('duracion-value').value;
	var categoria = document.getElementById('categoria-value').value;
	var addresult;
	var miCarrera = {imagen:imagen,video:video,categoria:categoria,nombre: nombre,	descripcion:descripcion,duracion: duracion};
	fetch('http://localhost:3000/carreras', {
		method: "POST",
		body: JSON.stringify(miCarrera),
		headers: {'Accept': 'application/json','Content-type': 'application/json; charset=UTF-8',}
	}).then(response=>response.json()).then(data=>addresult=data);


}

