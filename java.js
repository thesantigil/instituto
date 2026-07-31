const WHATSAPP_NUMBER = "5492281000000"; // reemplazar por el número real del colegio

const estado = { nivel: null, carrera: null };
const bloqueCarrera = document.getElementById('bloque-carrera');
const resumenEl = document.getElementById('inscripcion-summary-text');
const btnConsultar = document.getElementById('btn-consultar');

document.getElementById('chips-nivel').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('#chips-nivel .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  estado.nivel = chip.dataset.value;
  estado.carrera = null;
  document.querySelectorAll('#chips-carrera .chip').forEach(c => c.classList.remove('active'));

  bloqueCarrera.hidden = estado.nivel !== 'Terciario';
  actualizarResumen();
});

document.getElementById('chips-carrera').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  document.querySelectorAll('#chips-carrera .chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  estado.carrera = chip.dataset.value;
  actualizarResumen();
});

const images = document.querySelectorAll(".carousel img");

let current = 3; // la imagen del medio

function updateCarousel(){

    images.forEach((img,index)=>{

        let offset = index-current;

        img.style.opacity="0";
        img.style.pointerEvents="none";

        if(offset===0){

            img.style.transform=
            "translate(-50%,-50%) translateX(0px) scale(1)";
            img.style.zIndex=10;
            img.style.opacity=1;

        }

        else if(offset===-1){

            img.style.transform=
            "translate(-50%,-50%) translateX(-260px) scale(.82)";
            img.style.zIndex=8;
            img.style.opacity=.9;

        }

        else if(offset===1){

            img.style.transform=
            "translate(-50%,-50%) translateX(260px) scale(.82)";
            img.style.zIndex=8;
            img.style.opacity=.9;

        }

        else if(offset===-2){

            img.style.transform=
            "translate(-50%,-50%) translateX(-470px) scale(.65)";
            img.style.zIndex=6;
            img.style.opacity=.5;

        }

        else if(offset===2){

            img.style.transform=
            "translate(-50%,-50%) translateX(470px) scale(.65)";
            img.style.zIndex=6;
            img.style.opacity=.5;

        }

    });

}

updateCarousel();

document.querySelector(".next").onclick=()=>{

    current++;

    if(current>=images.length)
        current=0;

    updateCarousel();

}

document.querySelector(".prev").onclick=()=>{

    current--;

    if(current<0)
        current=images.length-1;

    updateCarousel();

}

images.forEach((img,index)=>{

    img.onclick=()=>{

        current=index;
        updateCarousel();

    }

});

function actualizarResumen() {
  const { nivel, carrera } = estado;
  if (!nivel) {
    resumenEl.textContent = 'Elegí un nivel para continuar.';
    btnConsultar.disabled = true;
    return;
  }
  if (nivel === 'Terciario' && !carrera) {
    resumenEl.textContent = 'Elegí la carrera terciaria que te interesa.';
    btnConsultar.disabled = true;
    return;
  }
  if (nivel === 'Terciario') {
    resumenEl.innerHTML = `Consulta por <strong>${carrera}</strong>.`;
  } else {
    resumenEl.innerHTML = `Consulta por una vacante de <strong>${nivel}</strong>.`;
  }
  btnConsultar.disabled = false;
}

btnConsultar.addEventListener('click', () => {
  const { nivel, carrera } = estado;
  if (!nivel) return;
  const mensaje = nivel === 'Terciario'
    ? `Hola! Quiero consultar por una vacante en ${carrera}.`
    : `Hola! Quiero consultar por una vacante de ${nivel} para 2027.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
});

document.getElementById('wa-float-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const mensaje = 'Hola! Quería consultar sobre el Instituto Alborada.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank');
});