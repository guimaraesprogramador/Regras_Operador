var theads  = []
var valor = [];

window.onload = function(){
    document.body.style.visibility ="hidden";
    if(navigator.onLine){
        document.body.style.visibility = "visible";
        if(window.location.pathname == "/"|| window.location.pathname =="/index.html"){
            theads.push(new Worker("./src/rsa.js"));
            theads[0].postMessage({tipo:"começo"});
            theads[0].onmessage = function(ev){
                if(ev.data.criptografia.length == 0){
                    location.reload(true);
                }
                else{
                  ev.data.link = window.location.protocol +"//"+  window.location.host.toString() +"/login.html";
                 valor.push(ev.data.criptografia[0].chave_publica,
                    ev.data.criptografia[0].chave_privada, 
                    ev.data.criptografia[0].mod,
                    ev.data.link);
                    theads.pop();
        
                }
               
                
            }
        }
        
    }
    else
    {
     

        window.location.replace(window.location.href.replace(window.location.pathname.toString(),"/404.html"));
    }

}
var app = angular.module('Desafio',['ngBrowser'])

app.controller('Contra-IA',['$scope','appBrowser','$location',

function($scope,appBrowser,$location){
    
$scope.verificar_plataforma = function(){
    var permitido = "";
    var elementos_navagador ={
        platform:appBrowser.getBrowserInfo().platform,
        name:appBrowser.getBrowserInfo().name
    }
   
    if(elementos_navagador.platform == "Android"  || elementos_navagador.name == "Google Chrome"  ){

      permitido = modulos().artificial();
      return permitido;
     }else
     {
     permitido = "sem permissão";
     return permitido;
     }
     
    
};
$scope.carregar_dados = function(){
    // index.html
if(window.location.pathname === "/" || window.location.pathname === "/index.html"){
    var iniciar = document.getElementsByTagName("button")[0];
  
    iniciar.onclick = function(ev){
        if(valor.length !=0){
            var caminho = valor[3]+"?token="+valor[1];
            window.localStorage.setItem("chave-publica",valor[0]);
            window.localStorage.setItem("mod",valor[2]);
            window.location.replace(caminho);
        }
        else {
          window.location.reload();
        }
        
    }
    var pontos = document.getElementsByTagName("button")[1];
    pontos.onclick = function(ev){
    console.log(pontos.value);
    }
    var quem_somos = document.getElementsByTagName("button")[2];
    quem_somos.onclick = function(ev){
        console.log(quem_somos.value)
    }
    
}
else if(window.location.pathname == "/login.html"){
    try{
        var entrar = document.getElementsByTagName("button")[0];
        
        entrar.onclick = function(ev){
            var texto = document.querySelectorAll("input[name=usuário]")[0];
            var validar_radio = document.querySelectorAll("input[name=sexo]:checked");
            
            if(validar_radio.length != 0){
                if(texto.value != ""){
                    var normatizar_radio = validar_radio[0].value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    valor = [window.localStorage.getItem("chave-publica"),
                window.localStorage.getItem("mod")];
                    var conversor = new StringToBinary();  
                    var binario_radio = conversor.convert(normatizar_radio);
                    var criptografia_radio = [];
                    
                    binario_radio.forEach((value,index,array)=>{
                        var decimal = parseInt(value,2)
                      //                               numero,  chave, mod
                        criptografia_radio.push(PowerMod(decimal,valor[0],valor[1]));
                    })
                   
                window.localStorage.setItem("letra_nome",texto.value);
                window.localStorage.setItem("letra_sexo",criptografia_radio);
                  
                   var caminho = window.location.protocol +"//"+  window.location.host.toString() +"/jogo.html"
                   var novo_caminho = caminho + "?token="+window.location.href.split("token=")[1];
                   console.log(novo_caminho);
                 window.location.replace(novo_caminho);
                }
                else {
                    Swal.fire({
                        icon:"warning",
                        title: 'Oops...',
                        text:"campo nome não foi preenchido!"
                    })
                }
            }
            else{
                Swal.fire({
                    icon:"warning",
                    title: 'Oops...',
                    text:"campo sexo não foi preenchido!"
                })
            }
        }
    }
    catch(ev){
       window.location.reload(true);
    }
    
}
else if(window.location.pathname == "/jogo.html"){
    try{
      
   
    }catch(ev){
        Swal.fire({
            icon:"error",
            title: 'Oops...',
            text:"error em algum lugar no código do jogo"
        })
    }
}

}
$scope.operador = "";
$scope.Vitoria_jogador = 0;
$scope.Derrota_jogador = 0;
$scope.Vitoria_artificial = 0;
$scope.Derrota_artificial = 0;
$scope.resposta_artificial = "";
$scope.temporizador = "05:00";
if(window.location.pathname == "/jogo.html"){
    // var permissão = $scope.verificar_plataforma();
    // if(permissão != undefined){
       
    //     var token =  window.location.href.split("token=");
    //     var verificar = window.localStorage.getItem("chave-publica");
        
    //     if(verificar != undefined){
          
    //         window.localStorage.removeItem("chave-publica");
    //         var mod =  window.localStorage.getItem("mod");
    //         window.localStorage.removeItem("mod");
    //         var letra_nomes = window.localStorage.getItem("letra_nome");
    //         var letra_sexo = window.localStorage.getItem("letra_sexo").split(",");
    //         window.localStorage.clear()
    //     theads.push(new Worker("./src/rsa.js"));
    //     theads[0].postMessage({tipo:"fácil",nome:letra_nomes,sexo:letra_sexo,chave:token[1],
    // mod:mod});
    //     theads[0].onmessage = function(ev){
    //         // $scope.operador = ev.data.tipo;
    //         modulos().descriptografar(ev.data.nome,ev.data.sexo,
    //             ev.data.chave,ev.data.mod);
        
    //      };
    //  }
    //     else{
    //         var caminho = window.location.href.replace("/jogo.html?token="+token[1],"/index.html");
    //         console.log(caminho);
    //         window.location.replace(caminho);
    //     }
        
       
    // }

}


}]);