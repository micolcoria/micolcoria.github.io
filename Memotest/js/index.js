//VARIABLES:
const imagenes = [
    'img/alce.jpg',
    'img/alce.jpg',
    'img/epelante.jpg',
    'img/epelante.jpg',
    'img/nena.jpg',
    'img/nena.jpg',
    'img/peces.jpg',
    'img/peces.jpg',
    'img/unichancho.jpg',
    'img/unichancho.jpg',
    'img/zapas.jpg',
    'img/zapas.jpg'
]

var clicks = 0; 
var primerClick
var segundoClick
var tries= 0; //INTENTOS 
var maxTries; //CANTIDAD MAXIMA DE INTENTOS POR NIVEL
var same = 0; //COINCIDENCIA DE IMAGEN
const desordenado = mix(imagenes)
 
//ASIGNA UN VALOR A DATA-IMG:
for (var i = 1; i <= desordenado.length ; i++) {
    $('#img-'+ i).attr('data-img', desordenado[i-1])
}

//FUNCION RANDOM PARA DESORDENAR LAS IMAGENES:
function mix(x) {
    for (let i = x.length - 1; i > 0; i--) {
        const y = Math.floor(Math.random() * (i + 1));
        [x[i], x[y]] = [x[y], x[i]];
    }
    return x;
}

//FUNCION NIVELES - HOME > TABLERO:
function nivel(){
    $('.level').on('click', function () {
        var level= $(this).attr('id')
        if (level === 'facil') {
            maxTries = 18
        } else if (level === 'intermedio') {
            maxTries = 12
        } else if (level === 'experto') {
            maxTries = 9
        }
        var valorNombre = $('input').val()
        
        if (valorNombre == '') {
            $('#cartel').removeClass('hidden')
        } else {
            $('#table').removeClass('hidden')
            $(this).parent().addClass('hidden')
            $('#value').append(valorNombre)
            $('#tries').append(maxTries)
            $('#levelRequired').append(level)
        }
    })

}

//FUNCION DATA-ID Y PARA QUE NO SE MUESTREN MAS DE DOS IMAGENES
$('img').on('click', function (m) {
    const imgId = m.target.id
    const id = $('#' + imgId).attr('data-id')
    if (clicks < 2) {
        $('#' + imgId).attr('src', desordenado[id - 1])
    }
})

//COMPARACIÓN DE IMAGENES:
$('img').on('click', function () {
    clicks = clicks + 1 
    //PRIMER CLICK:
    if (clicks == 1) {
        var id = $(this).attr('id');
        var img = $(this).attr('data-img');
        $(this).addClass('turn');
        primerClick = {
            id: id,
            img: img
        } 
        $('#' + primerClick.id).addClass("pointer")

        //SEGUNDO CLICK:    
    } else if (clicks == 2) {
        var id2 = $(this).attr('id');
        var img2 = $(this).attr('data-img');
        $(this).addClass('turn');
        tries ++ 
        $('#effort').html(tries)
            segundoClick = {
                id: id2,
                img: img2
            }
        $('#'+segundoClick.id).addClass("pointer")

            //SI SON IGUALES:
        if (primerClick.img == segundoClick.img && (primerClick.id != segundoClick.id)) {
            same = same + 1
            $('#' + primerClick.id).addClass('idem')
            $('#' + segundoClick.id).addClass('idem')
            clicks = 0
            $('.idem').unbind();

            //SI SON DISTINTAS:
        } else {
            setTimeout (function() {
                var that = this
                $('#'+ primerClick.id).attr('src',"img/tapada.jpg")
                $('#'+ segundoClick.id).attr('src', 'img/tapada.jpg')
                $(that).children().attr('src', "img/tapada.jpg")

                clicks = 0

                $('#' + primerClick.id).removeClass("pointer")
                $('#' + segundoClick.id).removeClass("pointer")
            }, 800)
        }
    } 
    
    modal(); //MODAL FINAL
})

//LOCALSTORAGE DE GANADORES:

function guardarDatos(){
    var data = localStorage.getItem('ranking')
    var obj = {
        nombre: $('input').val(),
        nivel: $('.level').html(),
        intentos: tries
    }
    
    data = JSON.parse(data) //PARA CONVERTIR EL STRING EN UN ARRAY

    if (data == null) {
        data = []
    }
    data.push(obj)
    localStorage.setItem('ranking', JSON.stringify(data))
    
    
    //AGREGO LOS DATOS AL RANKING CUANDO ALGUIEN GANA:
    for (var i = 0; i < data.length; i++) {
        $('.player').append(`<p class='column'> ${data[i].nombre} </p>`),
        $('.levell').append(`<p class='column'> ${data[i].nivel} </p>`),
        $('.triess').append(`<p class='column'> ${data[i].intentos}</p>`)
    }
}


//CUADRO DEL RANKING + MENSAJE + BOTON DE VOLVER A JUGAR
function modal () {
    if (same === 6) {
        
        $('#modal').removeClass('hidden');
        $('#modal').append(`<p>¡Ganaste 🎉! con ${tries} intentos </p>`)
        guardarDatos();
    } else if (tries === maxTries) {
        $('#table').addClass('pointer')
        $('#table').addClass('idem')
        $('#modal').removeClass('hidden')
        $('#modal').append(`<p>¡Perdiste! con ${tries} intentos</p>`)
    }
    $('.volver').on('click', function () {
        $('#home').removeClass('hidden')
        $('#table').addClass('hidden')
        $('.volver').addClass('hidden')
        location.reload()
    })
  }
nivel()











