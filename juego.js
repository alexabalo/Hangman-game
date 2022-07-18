let palabritas;
    let cant_errores = 0; //cuantas letras erre
    let cant_aciertos = 0;//cuantas letras acerte

const palabras = [
    'MANZANAS',     /* 0 */
    'CAMISETA',     /* 1 */
    'CARAMELOS',    /* 2 */
    'ÑOQUIS',       /* 3 */
    'STREAMER',     /* 4 */
    'TWITCH',       /* 5 */
    'MURCIELAGO',   /* 6 */
    'MICROFONO'     /* 7 */
];

const btn = id('jugar');
const imagen = id('imagen');
const btn_letras = document.querySelectorAll( '#letras button' );

//click de iniciar juego
btn.addEventListener('click', iniciar);

function id( str ){
    return document.getElementById( str );
}

function obtener_random( num_min, num_max ){
    const amplitud_valores = num_max - num_min; //valor más alto - valor más bajo del random... (7 - 0)
    const valor_al_azar = Math.floor( Math.random( ) * amplitud_valores ) + num_min; /* 5 - 15 = 10 + 5 */
    return valor_al_azar;
}

    function iniciar(event){
        btn.disabled = true; 
        imagen.src = 'img/0.png';
        cant_errores = 0;// cantidad de errores
        cant_aciertos = 0;// cantidad de aciertos
        const parrafo = id('palabraadivinar');
        parrafo.innerHTML = '';
        id('resultado').innerHTML = '';

        const cant_palabras = palabras.length;

        const valor_azar = obtener_random(0, cant_palabras);
        
        palabritas = palabras[ valor_azar];
        console.log(palabritas);
        const cant_letras = palabritas.length;
        for(let i = 0; i < btn_letras.length; i++){
            btn_letras[i].disabled = false;
        };

        for (let i=0; i < cant_letras; i++){
            const span = document.createElement( 'span' );//esto es para crear los span
            parrafo.appendChild( span );
        }
    }

    //click de adivinar letra
    for(let i = 0; i < btn_letras.length; i++){
        btn_letras[i].addEventListener( 'click', click_letras );
    };

    function click_letras( event ){
        const span = document.querySelectorAll( '#palabraadivinar span' );

        const button = event.target; // esto es para saber cual de todas las letras
        //toque
        button.disabled = true;

        const letra = button.innerHTML;
        const palabras = palabritas.toUpperCase();

        let acerto = false;
        for(i = 0; i < palabras.length; i++){
            if(letra == palabras[i] ){
                //la variable i es la posicion en la letra de la palabra,
                // que coincide con el span al que tenemos que mostrar esta letra
                span[i].innerHTML = letra; 
                cant_aciertos++;
                acerto = true;
            }
        }

        if(acerto == false){
                cant_errores++;
                const imageneserrores = `img/${cant_errores}.png`;
                
                imagen.src = imageneserrores;
            }

            if(cant_errores == 6){
                id( 'resultado' ).innerHTML = 'PERDISTE, LA PALABRA ERA ' + palabritas;
                game_over();

            }else if(cant_aciertos == palabritas.length){
                id( 'resultado' ).innerHTML = 'GANASTE'; 
                game_over();
            }
        
        //console.log('la letra ' + letra + ' en la palabra ' + palabras + ' ¿existe? ' + acerto);

    }
    //fin del juego 
    function game_over(){
        for(let i = 0; i < btn_letras.length; i++){
            btn_letras[i].disabled = true;
        };

        btn.disabled = false; 
    }

    game_over();
