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
  
  // Troca imagem com animação e sincroniza com o popup
  function trocarImagem(direcao) {
      if (direcao === 'next') {
          indexAtual = (indexAtual + 1) % nomesDasImagens.length;
          imagemPrincipal.style.animation = 'swipeRight 0.4s ease';
      } else {
          indexAtual = (indexAtual - 1 + nomesDasImagens.length) % nomesDasImagens.length;
          imagemPrincipal.style.animation = 'swipeLeft 0.4s ease';
      }
  
      const nome = nomesDasImagens[indexAtual];
      const caminhoGaleria = `images/tela-galeria/FOTOS COM LUPA/${nome}`;
      const caminhoPopup = `images/tela-galeria/FOTOS/${gerarNomePopup(nome)}`;
  
      imagemPrincipal.src = caminhoGaleria;
      imagemZoom.src = caminhoPopup;
  
      setTimeout(() => {
          imagemPrincipal.style.animation = '';
      }, 400);
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
  
// Ações para as zonas clicáveis do botão hexágono
document.getElementById("hexPrev").addEventListener("click", () => {
    trocarImagem("prev");
});

document.getElementById("hexNext").addEventListener("click", () => {
    trocarImagem("next");
});

  // MUDAR POSICIONAMENTO DO BOTAO
  // COLOCAR OS CLIQUES DOS BOTOES COM MAP?