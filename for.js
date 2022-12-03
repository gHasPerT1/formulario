const $registrate = document.querySelector(".sing-up-btn"),
      $iniciar = document.querySelector(".sing-in-btn"),
      $registro = document.querySelector(".sing-up"),
      $inicio = document.querySelector(".sing-in");

document.addEventListener("click",  e =>{
    if(e.target === $registrate || e.target === $iniciar){
        $registro.classList.toggle("active");
        $inicio.classList.toggle("active")
    }

})