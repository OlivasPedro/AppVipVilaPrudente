const botao = document.getElementById("btnIniciarNavegacao");
const telaDescanso = document.getElementById("tela-descanso");
const novaTela = document.getElementById("menu");

botao.addEventListener("click", function() {
    entrarEmTelaCheia();

    // Aplica a animação de scale out na tela de descanso
    telaDescanso.style.animation = "shrinkScreen 0.6s forwards";

    // Após o término da animação, oculta a tela de descanso e exibe a nova tela com scale in
    setTimeout(function() {
        telaDescanso.style.display = "none";
        novaTela.classList.add("menu-ativo");
    }, 300);
});

function entrarEmTelaCheia() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari e Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

const btnGaleria = document.getElementById("btnGaleria");
const menuTela = document.getElementById("menu");
const galeriaTela = document.getElementById("galeria");

btnGaleria.addEventListener("click", function() {
    // Aplica a animação de slide out no menu (da direita para a esquerda)
    menuTela.style.animation = "slideOut 0.8s forwards";
    
    // Após o término da animação, oculta o menu e exibe a galeria com slide in
    setTimeout(function() {
        menuTela.style.display = "none";
        galeriaTela.style.display = "block";
        // Inicia a animação de slide in na galeria (de direita para a esquerda)
        galeriaTela.style.animation = "slideIn 0.8s forwards";
    }, 500);
});

const btnFecharGaleria = document.getElementById("btnFecharGaleria");

btnFecharGaleria.addEventListener("click", function () {
    // Garante que a galeria esteja na posição correta para animar
    galeriaTela.style.transform = "translateX(0)";
    
    // Aplica animação de saída da galeria para a esquerda
    galeriaTela.style.animation = "slideOutLeft 0.5s forwards";

    // Após a animação, oculta a galeria e mostra o menu com entrada da direita
    setTimeout(function () {
        galeriaTela.style.display = "none";
        menuTela.style.display = "block";
        menuTela.style.animation = "slideInRight 0.5s forwards";
    }, 800);
});

const totalImagens = 31;
let indexAtual = 1;

// Rolagem de imagens da galeria
const nomesDasImagens = [
    "Academia.png",
    "Bicicletario.png",
    "Brinquedoteca.png",
    "Churrasqueira.png",
    "Cine-Open.png",
    "Coworking.png",
    "Entrada.png",
    "Fachada Diurna.png",
    "Fachada Noturna.png",
    "Fire Place.png",
    "Game Pub.png",
    "Garden 01.png",
    "Garden 02.png",
    "Gourmet.png",
    "Hall.png",
    "Lavanderia.png",
    "Living 01.png",
    "Living 02.png",
    "Living 03.png",
    "Living 04 Duplex 2.png",
    "Living 04 Duplex.png",
    "Living 05.png",
    "Living 06.png",
    "Living 08.png",
    "Mercadinho.png",
    "Pet Place.png",
    "Piscina.png",
    "Playground.png",
    "Quarto Casal.png",
    "Quarto Solteiro.png",
    "Sauna.png",
  ];
  
  // Elementos principais
  const imagemPrincipal = document.querySelector(".foto-principal");
  const imagemZoom = document.querySelector(".imagem-zoom");
  const btnPrev = document.getElementById("btnPrevFoto");
  const btnNext = document.getElementById("btnNextFoto");
  
  // Gera o caminho da imagem do popup a partir do nome base
  function gerarNomePopup(nomeOriginal) {
      const base = nomeOriginal
          .replace('.png', '')
          .replace(/([a-z])([A-Z])/g, '$1_$2')
          .replace(/[\s\-]+/g, '_')
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
      return `Chaincorp_Vila_Prudente_${base}_HR.jpg`;
  }
  function trocarImagem(direcao) {
    // Aplica animação de saída
    imagemPrincipal.style.opacity = 0;
    imagemPrincipal.style.transition = 'opacity 0.2s ease';

    setTimeout(() => {
        // Atualiza índice
        if (direcao === 'next') {
            indexAtual = (indexAtual + 1) % nomesDasImagens.length;
        } else {
            indexAtual = (indexAtual - 1 + nomesDasImagens.length) % nomesDasImagens.length;
        }

        // Atualiza imagem
        const nome = nomesDasImagens[indexAtual];
        imagemPrincipal.src = `images/tela-galeria/FOTOS COM LUPA/${nome}`;
        imagemZoom.src = `images/tela-galeria/FOTOS/${gerarNomePopup(nome)}`;

        // Espera imagem carregar antes de mostrar
        imagemPrincipal.onload = () => {
            imagemPrincipal.style.opacity = 1;
        };
    }, 300);
}

  
  // Eventos dos botões
  btnNext.addEventListener("click", () => trocarImagem("next"));
  btnPrev.addEventListener("click", () => trocarImagem("prev"));
  
  // Define imagem inicial ao carregar
  function carregarImagemInicial() {
      const nome = nomesDasImagens[indexAtual];
      const caminhoGaleria = `images/tela-galeria/FOTOS COM LUPA/${nome}`;
      const caminhoPopup = `images/tela-galeria/FOTOS/${gerarNomePopup(nome)}`;
  
      imagemPrincipal.src = caminhoGaleria;
      imagemZoom.src = caminhoPopup;
  }
  carregarImagemInicial();
  
  // ========== POPUP ==========
  const popupZoom = document.getElementById("popupZoom");
  const popupOverlay = document.querySelector(".popup-overlay");
  const popupContent = document.querySelector(".popup-content");
  
  // Abrir popup ao clicar na imagem principal
  imagemPrincipal.addEventListener("click", () => {
      popupZoom.style.display = "flex";
      setTimeout(() => {
          popupOverlay.style.opacity = 1;
      }, 10);
  });
  
  // Fechar popup ao clicar fora da imagem
  popupOverlay.addEventListener("click", (event) => {
      if (!popupContent.contains(event.target)) {
          fecharPopup();
      }
  });
  
  function fecharPopup() {
      popupOverlay.style.opacity = 0;
      setTimeout(() => {
          popupZoom.style.display = "none";
      }, 500);
  }

// ========== VÍDEO ==========
document.addEventListener("DOMContentLoaded", () => {
    const btnFilme = document.getElementById("btnFilme");
    const popupVideo = document.getElementById("popupVideo");
    const fecharPopupVideo = document.getElementById("fecharPopupVideo");
    const youtubeFrame = document.getElementById("youtubeFrame");
  
    const youtubeLink = "https://www.youtube.com/embed/TW9d8vYrVFQ";
  
    if (btnFilme && popupVideo && fecharPopupVideo && youtubeFrame) {
      btnFilme.addEventListener("click", () => {
        youtubeFrame.src = youtubeLink;
        popupVideo.style.display = "flex";
        setTimeout(() => {
          popupVideo.style.opacity = 1;
        }, 10);
      });
  
      fecharPopupVideo.addEventListener("click", () => {
        popupVideo.style.opacity = 0;
        youtubeFrame.src = "";
        setTimeout(() => {
          popupVideo.style.display = "none";
        }, 300);
      });
    } else {
      console.error("❌ Algum dos elementos do popup do vídeo não foi encontrado!");
    }
  });
  

  const btnFecharVideo = document.getElementById("btnFecharVideo");

btnFecharVideo?.addEventListener("click", () => {
  popupVideo.style.opacity = 0;
  youtubeFrame.src = "";
  setTimeout(() => {
    popupVideo.style.display = "none";
    popupVideo.classList.remove("ativo");
  }, 500);
});

  