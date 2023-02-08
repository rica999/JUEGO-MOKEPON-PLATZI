//Variables globales para el ataque
let ataqueJugador
let ataqueEnemigo
let totalVictoriasJugador = 0
let totalVictoriasEnemigo = 0
//SECCIONES DE HTML
const sectionSelectPet = document.getElementById("seleccionar-mascota")
const sectionBotonSelect = document.getElementById("seleccionar")
const sectionAtaque = document.getElementById("seleccionar-ataque")
sectionAtaque.style.display="none" //no se va a mostrar
const sectionReiniciar = document.getElementById("reiniciar")
sectionReiniciar.style.display="none"
const sectionMensaje = document.getElementById("mensajes")
const infoMascotas = document.getElementById("info-mascotas")
//VIDAS
const vidasJugador = document.getElementById("life-player")
const vidasEnemigo = document.getElementById("life-enemy")
//PARRAFO RESUMEN VIDAS
const resumenJugador = document.getElementById("resumen-jugador")
const resumenEnemigo = document.getElementById("resumen-enemigo")
//SPAN QUE CAMBIAN CUANDO JUEGAS
const spanMascotaElegida = document.getElementById("mascota-elegida")
const spanMascotaEnemigo = document.getElementById("mascota-enemy")
//INSERTAR MOKEPONES DE FORMA DINÁMICA
const contentMokepon = document.getElementById("numero-mokepon")
let numeroMokepon
let hipodoge
let capipepo
let ratigueya
let tuMascota
let ataques
const contentBotonesAtaque = document.getElementById("botones-ataque")
let numeroBotonesAtaque
let arrayButtonAtaques = []
let arrayListAtaqueEnemigo = []
let arrayAtaqueJugador = []
let arrayAtaqueEnemigo = []
let indexNombreAtaqueJugador
let indexNombreAtaqueEnemigo

let tipoAtaqueEnemigo
//VARIABLES CANVAS
const sectionCanvas = document.getElementById("mapa-canvas")
sectionCanvas.style.display="none"
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d") //permite crear un lienzo para dibujar en canvas
let nombreMascotaJugador //para saber cual imagen de mokepon se va a mostrar
let intervaloMovimiento
const buttonUp = document.getElementById("boton-arriba")
const buttonDown = document.getElementById("boton-abajo")
const buttonLeft = document.getElementById("boton-izquierda")
const buttonRight = document.getElementById("boton-derecha")
let fondoMapa = new Image()
fondoMapa.src = "img/mokemap.png"
let alturaResponsive
let anchoResponsive = window.innerWidth - 20 //innerWidth devuelve el ancho interior de la ventana

const anchoMaximo = 350 //del mapa
if(anchoResponsive>anchoMaximo){ //evita que se pase del maximo
    anchoResponsive = anchoMaximo-20
}

alturaResponsive = anchoResponsive * 600 / 800 //por defecto el canvas tiene un tamaño de 800 de ancho x 200 de alto y por regla de 3 simple se obtiene un valor proporcional
mapa.width = anchoResponsive
mapa.height = alturaResponsive

//VARIABLES NODEJS
let jugadorId = null
let mokeponesEnemigos = []
let enemigoId = null
//---------------------------------EXPLICACIÓN OBJETOS LITERALES (NO NECESITAN DE UNA CLASE CREADA)-----------------
class Mokepon { //CLASE
    constructor(nombre,foto,vidas,fotoMapa,x=20,y=30,id=null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataque = [] //La propiedad ataques no se coloca en los parámetros del constructor porque no se va a poblar creando nuevos objetos...por lo que veo son valores que no son dinámicos
        //propiedades CANVAS
        this.x = x
        this.y = y
        this.ancho = 60
        this.alto = 60
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){ //función asociada a una clase...se llama método
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
let Hipodoge = new Mokepon("Hipodoge","img/fuecoco.png",3,"img/fuecoco.png")
let Capipepo = new Mokepon("Capipepo","img/sprigatito.png",3,"img/sprigatito.png")
let Ratigueya = new Mokepon("Ratigueya","img/quaxly.png",3,"img/quaxly.png")

const HIPODOGE_ATAQUE = [
    {nombre: "Agua 💧", id:"boton-water"}, //se agregan las propiedades que uno desee
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Tierra 🌱", id:"boton-terra"}
]

Hipodoge.ataque.push(...HIPODOGE_ATAQUE) //... significa que no se pasa como lista sino como valores individuales

const CAPIPEPO_ATAQUE = [
    {nombre: "Tierra 🌱", id:"boton-terra"},
    {nombre: "Tierra 🌱", id:"boton-terra"},
    {nombre: "Tierra 🌱", id:"boton-terra"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Fuego 🔥", id:"boton-fire"}
]

Capipepo.ataque.push(...CAPIPEPO_ATAQUE)

const RATIGUEYA_ATAQUE = [
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Tierra 🌱", id:"boton-terra"}
]

Ratigueya.ataque.push(...RATIGUEYA_ATAQUE)

/* //ENEMIGOS TENDRÁN LOS MISMOS ATAQUES
HipodogeEnemigo.ataque.push(
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Tierra 🌱", id:"boton-terra"},
)
CapipepoEnemigo.ataque.push(
    {nombre: "Tierra 🌱", id:"boton-terra"},
    {nombre: "Tierra 🌱", id:"boton-terra"},
    {nombre: "Tierra 🌱", id:"boton-terra"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
)
RatigueyaEnemigo.ataque.push(
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Fuego 🔥", id:"boton-fire"},
    {nombre: "Agua 💧", id:"boton-water"},
    {nombre: "Tierra 🌱", id:"boton-terra"},
) */
let arrayMokepon = []
arrayMokepon.push(Hipodoge,Capipepo,Ratigueya)

arrayMokepon.forEach((mokepon)=>{ //Se lee: por cada elemento del arreglo hacer lo siguiente
    numeroMokepon = //templates literarios, conbinan HTML con JS con comillas invertidas ``
    `
        <li>
            <input type="radio" name="mascota" id=${mokepon.nombre} value=${mokepon.nombre}>
            <label for=${mokepon.nombre}>${mokepon.nombre}</label>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </li>
    `
    contentMokepon.innerHTML += numeroMokepon //SE VA A INSERTAR LOS MOKEPON EN HTML DE FORMA DINÁMICA...SEGÚN LA CANTIDAD
})

hipodoge = document.getElementById("Hipodoge") //variables de tipo objeto (verificar con typeof())
capipepo = document.getElementById("Capipepo")
ratigueya = document.getElementById("Ratigueya")

function aleatorio (min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

//CONEXIÓN AL SERVIDOR APENAS CARGUE EL JUEGO
backUnirseJuego()

function backUnirseJuego(){
    fetch("http://192.168.0.2:8080/unirse") //permite realizar llamadas a servicios con HTTP...por defecto hace una llamada tipo GET
        .then((respuesta)=>{ //esta respuesta es un objeto
            if(respuesta.ok){   //compara si la respuesta fue ok
                respuesta.text() //esperamos que nos devuelva un texto...esta funcion tambien es una promesa como fetch y tiene la propiedad then
                    .then((res) => {
                        console.log(res)
                        jugadorId = res //se asigna el id que sera enviado con el post
                    })
            }
        })
}

function seleccionarMascota(){
    //ASIGNACIÓN DE VALOR SEGÚN SELECCIÓN DE MASCOTA
    if(hipodoge.checked){
        tuMascota = hipodoge.id
    }
    else if (capipepo.checked){
        tuMascota = capipepo.id
    }
    else if (ratigueya.checked){
        tuMascota = ratigueya.id
    }
    //COMPARA SI HE SELECIONADO ALGUNA MASCOTA O NO
    if(tuMascota != null){
        alert("Fantástico, seleccionaste a: " + tuMascota);

        sectionSelectPet.style.display="none"
        sectionBotonSelect.style.display="none"

        sectionReiniciar.style.display="flex"
        infoMascotas.style.display="none"
        sectionCanvas.style.display="flex" //muestra el canvas al seleccionar ataque

        spanMascotaElegida.innerHTML = tuMascota
    }
    else{
        alert("No seleccionaste a nadie")
    }
    iniciarMapa()
    //Llamado a función que envia el parametro para consumir el servicio post del backend
    backSeleccionMokepon(tuMascota)
}

function backSeleccionMokepon(mascotaJugador){ //se reemplazo el localhost con la ip de la pc debido a que se creo la carpeta public
    fetch(`http://192.168.0.2:8080/mokepon/${jugadorId}`,{//si el método no es GET, se debe especificar el tipo, las cabeceras que son como metadatos que permiten a la pc interpretar datos y el cuerpo de la petición
        method: "post",
        headers:{
            "Content-type":"application/json" //se especifica que se enviará un json
        },
        body: JSON.stringify({ //siempre se debe enviar en formato texto
            mokepon:mascotaJugador //cualquier nombre de variable, que sea igual a la que el servidor va a recibir
        })
    })//en este caso no se coloca .then porque no se espera recibir una respuesta del servidor...solo envia datos y acaba
}

//YA NO SERÁ ALEATORIO
function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre //imprime la propiedad nombre del objeto seleccionado
    arrayListAtaqueEnemigo = enemigo.ataque

    extraerAtaquesJugador(tuMascota)
}
//PAR DE FUNCIONES PARA MOSTRAR ATAQUES DE MANERA DINÁMICA
function extraerAtaquesJugador(miMascota){
    for (let i = 0; i < arrayMokepon.length; i++) {
        if(arrayMokepon[i].nombre == miMascota){
            ataques = arrayMokepon[i].ataque
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) { //intente hacerlo de frente pero no acepta arrayMokepon[i].ataque.id, por lo que se separo en la variable ataques
    ataques.forEach((ataque)=>{
        numeroBotonesAtaque =
        `
        <button id=${ataque.id} class="atack-buttons">${ataque.nombre}</button>
        `
        contentBotonesAtaque.innerHTML += numeroBotonesAtaque //imprime todos los botones
    })
    const btnAtaqueFuego = document.getElementById("boton-fire")
    const btnAtaqueAgua = document.getElementById("boton-water")
    const btnAtaqueTierra = document.getElementById("boton-terra")

    arrayButtonAtaques = document.querySelectorAll(".atack-buttons")//almacena todos los elementos con clase atack-buttons
    definirAtaquePorBoton()
}

//FUNCIÓN PARA AGREGAR EVENTOS DE CLICK A TODOS LOS BOTONES QUE SE CREEN
function definirAtaquePorBoton(){
    arrayButtonAtaques.forEach((boton)=>{
        boton.addEventListener("click",(e)=>{ //e hace referencia al evento mismo, en este caso al evento click
            if (e.target.textContent == "Fuego 🔥") { //propiedades del boton...puedes verlo con console.log(e)
                arrayAtaqueJugador.push("Fuego")
                console.log(arrayAtaqueJugador)
                boton.style.background = "#112f58"
                boton.disabled=true
            }
            else if (e.target.textContent == "Agua 💧"){
                arrayAtaqueJugador.push("Agua")
                console.log(arrayAtaqueJugador)
                boton.style.background = "#112f58"
                boton.disabled=true
            }
            else{
                arrayAtaqueJugador.push("Tierra")
                console.log(arrayAtaqueJugador)
                boton.style.background = "#112f58"
                boton.disabled=true
            }
            //ataqueEnemy()
            if(arrayAtaqueJugador.length == 5){
                backEnviarAtaques()
            }
        })
    })
}

function backEnviarAtaques(){
    fetch(`http://192.168.0.2:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            ataques:arrayAtaqueJugador
        })
    })

    intervaloMovimiento = setInterval(backObtenerAtaques,50)
}

function backObtenerAtaques(){
    fetch(`http://192.168.0.2:8080/mokepon/${enemigoId}/ataques`)
        .then((res)=>{
            if(res.ok){
                res.json()
                    .then(({ataques})=>{ //abreviación de res.ataques
                        if(ataques.length == 5){
                            arrayAtaqueEnemigo = ataques
                            resultBatalla()
                        }
                    })
            }
        })
}

//Elección de ataque del enemigo
function ataqueEnemy(){
    tipoAtaqueEnemigo = aleatorio(0,arrayListAtaqueEnemigo.length-1)//de acuerdo a la cantidad de ataques que pueda seleccionar, en este caso son 5
    let nombreAtaqueEnemigo = arrayListAtaqueEnemigo[tipoAtaqueEnemigo].nombre
    if(nombreAtaqueEnemigo.includes("Fuego")){
        arrayAtaqueEnemigo.push("Fuego")
    }
    else if(nombreAtaqueEnemigo.includes("Agua")){
        arrayAtaqueEnemigo.push("Agua")
    }
    else if(nombreAtaqueEnemigo.includes("Tierra")){
        arrayAtaqueEnemigo.push("Tierra")
    }
    console.log(arrayAtaqueEnemigo)
    inicioCombate()
}
//FUNCIÓN PARA INICIAR EL COMBATE CUANDO TANTO EL JUGADOR COMO EL ENEMIGO HAYAN SELECCIONADO SUS 5 ATAQUES
function inicioCombate() {
    if(arrayAtaqueJugador.length == 5){
        resultBatalla()
    }
}

//RESULTADO DEL COMBATE
function resultBatalla() {
    clearInterval(intervaloMovimiento)

    for (let index = 0; index < arrayAtaqueJugador.length; index++) {
        if(arrayAtaqueJugador[index]==arrayAtaqueEnemigo[index]){
            crearMensaje(arrayAtaqueJugador[index],arrayAtaqueEnemigo[index],"EMPATE 🤪")
            //indexAtaqueJugadoryEnemigo(index,index)//servirá para imprimir el nombre de los ataques de cada uno al combatir
        }
        else if ((arrayAtaqueJugador[index]=="Agua" && arrayAtaqueEnemigo[index]=="Fuego") || (arrayAtaqueJugador[index]=="Fuego" && arrayAtaqueEnemigo[index]=="Tierra") || (arrayAtaqueJugador[index]=="Tierra" && arrayAtaqueEnemigo[index]=="Agua")){
            crearMensaje(arrayAtaqueJugador[index],arrayAtaqueEnemigo[index],"GANASTE 🥳")
            //indexAtaqueJugadoryEnemigo(index,index)
            totalVictoriasJugador++
            vidasJugador.innerHTML = totalVictoriasJugador
        }
        else{
            crearMensaje(arrayAtaqueJugador[index],arrayAtaqueEnemigo[index],"PERDISTE 😪")
            //indexAtaqueJugadoryEnemigo(index,index)
            totalVictoriasEnemigo++
            vidasEnemigo.innerHTML = totalVictoriasEnemigo
        }
    }
    calculoVidas()
}
//FUNCIÓN PARA CALCULAR VIDAS
function calculoVidas() {
    if(totalVictoriasJugador<totalVictoriasEnemigo){
        crearMensajeFinal("PERDISTE...DIRECTO AL SEPELIO")
    }
    else if (totalVictoriasJugador>totalVictoriasEnemigo){
        crearMensajeFinal("MAESTRO, GANASTE")
    }
    else if (totalVictoriasJugador==totalVictoriasEnemigo){
        crearMensajeFinal("EMPATARON, DENSE LA MANO")
    }
}
//FUNCIÓN DE MENSAJE DE ATAQUE AL SELECCIONAR EL TIPO DE ATAQUE DE JUGADOR Y ENEMIGO
function crearMensaje(ataqueJugador,ataqueEnemigo,resultadoBatalla) {
    sectionMensaje.innerHTML="<p>" + resultadoBatalla + "</p>"

    let spanAtaqueJugador = document.createElement("span")
    resumenJugador.append(ataqueJugador,spanAtaqueJugador)
    let spanAtaqueEnemigo = document.createElement("span")
    resumenEnemigo.append(ataqueEnemigo,spanAtaqueEnemigo)
}
//FUNCIÓN DE MENSAJE DE RESULTADO FINAL
function crearMensajeFinal(resultadoFinal){
    sectionMensaje.innerHTML="<p>" + resultadoFinal + "</p>"
}

//FUNCIÓN PARA RECARGAR LA PÁGINA PARA VOLVER A JUGAR
function recargaPagina() {
    location.reload()
}
//BOTONES TIPO ATAQUES
const btnSelectPet = document.getElementById("btnseleccion-mascota")
btnSelectPet.addEventListener("click",seleccionarMascota)

const btnReiniciar = document.getElementById("button-reload")
btnReiniciar.addEventListener("click",recargaPagina)

//FUNCIONES CANVAS
function pintarCanvas(){ //sobreescribe la imagen en el mapa teniendo en cuenta el valor de los objetos
    lienzo.clearRect(0,0,mapa.width,mapa.height) //metodo para poder limpiar el lienzo al mover la imagen...sino sse quedarían todas las img que han cambiado de posición uscesivamente.
    lienzo.drawImage(
        fondoMapa,0,0,mapa.width,mapa.height //324x204
    )
    for (let i = 0; i < arrayMokepon.length; i++) {
        if(arrayMokepon[i].nombre==tuMascota){

            arrayMokepon[i].pintarMokepon() //usa el método creado donde guarda lo comentado de arriba

            /* HipodogeEnemigo.pintarMokepon()
            CapipepoEnemigo.pintarMokepon()
            RatigueyaEnemigo.pintarMokepon() */

            nombreMascotaJugador = arrayMokepon[i]
            //Identificar si hay colisión
            //if(nombreMascotaJugador.velocidadX !== 0 || nombreMascotaJugador.velocidadY !== 0){//compara si hay movimiento
                /*revisionColision(HipodogeEnemigo)
                revisionColision(CapipepoEnemigo)
                revisionColision(RatigueyaEnemigo)*/
            //}
            /*setInterval(movEnemigoAleatorio(HipodogeEnemigo),50) //para que se muevan apenas cargue el mapa
            setInterval(movEnemigoAleatorio(CapipepoEnemigo),50)
            setInterval(movEnemigoAleatorio(RatigueyaEnemigo),50)*/
        }
    }
    nombreMascotaJugador.x = nombreMascotaJugador.x + nombreMascotaJugador.velocidadX //avanza según la velocidad
    nombreMascotaJugador.y = nombreMascotaJugador.y + nombreMascotaJugador.velocidadY

    //Llamado a función que actualiza y envía la posición de la mascota al back
    backEnvioPosicion(nombreMascotaJugador.x,nombreMascotaJugador.y)
    mokeponesEnemigos.forEach((mokepon)=>{
        if(mokepon != undefined){
            mokepon.pintarMokepon()
            revisionColision(mokepon)
        }
    })
}

function backEnvioPosicion(x,y){
    fetch(`http://192.168.0.2:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            positionx:x,
            positiony:y
        })
    }).then((respuesta) => {
        if(respuesta.ok){
            respuesta.json()
                .then((res)=>{
                    res.enemigos
                    console.log(res.enemigos) //enemigos es la variable que se envia al servicio en res.send

                    mokeponesEnemigos = res.enemigos.map((enemigo)=>{
                        let mokeponEnemigo = null
                        if(enemigo.mokepon != undefined){
                            const enemyMokepon = enemigo.mokepon
                            const mokeponEnemigoNombre = enemyMokepon.nombre || "" //va a retornar el nombre del mokepon
                            if(mokeponEnemigoNombre == "Hipodoge"){
                                mokeponEnemigo = new Mokepon("Hipodoge","img/fuecoco.png",3,"img/hipodoge.png",80,120,enemigo.id)
                            }
                            else if(mokeponEnemigoNombre == "Capipepo"){
                                mokeponEnemigo = new Mokepon("Capipepo","img/sprigatito.png",3,"img/capipepo.png",150,95,enemigo.id)
                            }
                            else if(mokeponEnemigoNombre == "Ratigueya"){
                                mokeponEnemigo = new Mokepon("Ratigueya","img/quaxly.png",3,"img/ratigueya.png",230,120,enemigo.id)
                            }
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }

                        //mokeponEnemigo.pintarMokepon()
                        return mokeponEnemigo
                    })
            })
        }
    })
}

//FUNCIONES DE MOVIMIENTO CUANDO SE MANTIENE APRETADO LOS BOTONES DE MOVIMIENTO CON ONMOUSEDOWN
function moverImagenDerecha(){
    if(nombreMascotaJugador.x<=mapa.width-60){
        nombreMascotaJugador.velocidadX = 5
    }
    else{
        nombreMascotaJugador.velocidadX = 0
    }
    buttonRight.style.background="blue"
}
function moverImagenIzquierda(){
    if(nombreMascotaJugador.x>=mapa.width-324){//indica que no va a salir del mapa
        nombreMascotaJugador.velocidadX = -5
    }
    else{
        nombreMascotaJugador.velocidadX = 0
    }
    buttonLeft.style.background="blue"
}
function moverImagenArriba(){
    if(nombreMascotaJugador.y>=mapa.height-251){
        nombreMascotaJugador.velocidadY = -5
    }
    else{
        nombreMascotaJugador.velocidadY = 0
    }
    buttonUp.style.background="blue"
}
function moverImagenAbajo(){
    if(nombreMascotaJugador.y<=mapa.height-60){
        nombreMascotaJugador.velocidadY = 5
    }
    else{
        nombreMascotaJugador.velocidadY = 0
    }
    buttonDown.style.background="blue"
}
function detenerMovimiento(){
    nombreMascotaJugador.velocidadX = 0
    nombreMascotaJugador.velocidadY = 0
    buttonUp.style.background="transparent"
    buttonDown.style.background="transparent"
    buttonLeft.style.background="transparent"
    buttonRight.style.background="transparent"
}
//FUNCIÓN PARA SABER QUE TECLA SE APRIETA
function teclaApretada(event){
    //console.log(event) //identifica que tecla se apreto al recibir el evento de keydown
    switch (event.key) {
        case 'ArrowUp':
            moverImagenArriba()
            break;
        case 'ArrowDown':
            moverImagenAbajo()
            break;
        case 'ArrowLeft':
            moverImagenIzquierda()
            break;
        case 'ArrowRight':
            moverImagenDerecha()
            break;
        default:
            break;
    }
}
//MOVIMIENTO TECLAS
function iniciarMapa(){

    intervaloMovimiento = setInterval(pintarCanvas, 50)//para que se ejecute cada cierto tiempo mientras se mantiene apretado los botones de movimiento
    window.addEventListener("keydown",teclaApretada) //Movimiento con teclado
    window.addEventListener("keyup",detenerMovimiento)
}

//FUNCIÓN PARA LA COLISIÓN DE MOKEPONES
function revisionColision(enemigo) {
    const arribaEnemigo = enemigo.y //indican los cuatro puntos de la imagen de cada mokepon, en este caso de cada enemigo
    const abajoEnemigo = enemigo.y + enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascotaJugador = nombreMascotaJugador.y
    const abajoMascotaJugador = nombreMascotaJugador.y + nombreMascotaJugador.alto
    const izquierdaMascotaJugador = nombreMascotaJugador.x
    const derechaMascotaJugador = nombreMascotaJugador.x + nombreMascotaJugador.ancho

    if(
        abajoMascotaJugador < arribaEnemigo || //condiciones que no deben cumplirse para que no haya colisión
        arribaMascotaJugador > abajoEnemigo ||
        derechaMascotaJugador < izquierdaEnemigo ||
        izquierdaMascotaJugador > derechaEnemigo
    ){
        return
    }
    else{
        alert("Hay colisión con " + enemigo.nombre)
        detenerMovimiento()
        clearInterval(intervaloMovimiento)//detiene el intervalo

        enemigoId = enemigo.id //se asigna un id al enemigo para las colisiones

        sectionAtaque.style.display="flex"//combate apenas colisione
        sectionCanvas.style.display="none"
        infoMascotas.style.display="flex"
        seleccionarMascotaEnemigo(enemigo)
    }
}
//FUNCIÓN PARA QUE EL ENEMIGO SE MUEVA DENTRO DEL MAPA
function movEnemigoAleatorio(enemigo) {
    if(enemigo.x <= mapa.width-60 && enemigo.y <= mapa.height-60){//compara si están dentro del mapa
        if(aleatorio(1,2)==1){
            if(aleatorio(1,2)==1){
                enemigo.x = enemigo.x+5
                enemigo.y = enemigo.y+0
            }
            else{
                enemigo.x = enemigo.x-5
                enemigo.y = enemigo.y+0
            }
        }
        else{
            if(aleatorio(1,2)==1){
                enemigo.x = enemigo.x+0
                enemigo.y = enemigo.y+5
            }
            else{
                enemigo.x = enemigo.x+0
                enemigo.y = enemigo.y-5
            }
        }
    }
    else{
        if(aleatorio(1,2)==1){
            enemigo.x = enemigo.x-5
        }
        else{
            enemigo.y = enemigo.y-5
        }

    }
}