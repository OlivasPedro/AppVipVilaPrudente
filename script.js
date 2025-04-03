let wasDragged = false;


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
    if (!wasDragged) {
      popupZoom.style.display = "flex";
      setTimeout(() => {
        popupOverlay.style.opacity = 1;
      }, 10);
    }
    // Resetar após o clique
    wasDragged = false;
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

  
const btnProjeto = document.getElementById("btnProjeto");
const projetoDiferenciaisTela = document.getElementById("projeto-diferenciais");

btnProjeto.addEventListener("click", () => {
  menuTela.style.animation = "slideOut 0.8s forwards";

  setTimeout(() => {
    menuTela.style.display = "none";
    
    // Reseta a posição para iniciar fora da tela à direita
    projetoDiferenciaisTela.style.transform = "translateX(100%)";
    projetoDiferenciaisTela.style.display = "block";
    
    // Aplica duas animações: fadeIn rápido e slideInRight para a entrada
    projetoDiferenciaisTela.style.animation = "fadeIn 0.2s ease-out, slideIn 0.8s forwards";
    
    projetoDiferenciaisTela.classList.add("ativo");
  }, 500);
});




// ========== SWIPE NA GALERIA ==========
let startX = 0;
let isDragging = false;

imagemPrincipal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

imagemPrincipal.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  // opcional: efeito visual enquanto arrasta (não muda a imagem ainda)
  imagemPrincipal.style.transform = `translateX(${diff}px)`;
  imagemPrincipal.style.transition = 'none';
});

imagemPrincipal.addEventListener("touchend", (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  imagemPrincipal.style.transition = 'transform 0.2s ease';
  imagemPrincipal.style.transform = 'translateX(0)';

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      trocarImagem("next"); // arrastou pra esquerda
    } else {
      trocarImagem("prev"); // arrastou pra direita
    }
  }
});



let currentX = 0;


function startDrag(x) {
    startX = x;
    currentX = x;
    isDragging = true;
    wasDragged = false;
    imagemPrincipal.style.transition = 'none';
  }
  
  function drag(x) {
    if (!isDragging) return;
    wasDragged = true;
    currentX = x;
    const diff = currentX - startX;
    imagemPrincipal.style.transform = `translateX(${diff}px)`;
  }
  
  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
  
    const diff = currentX - startX;
    imagemPrincipal.style.transition = 'transform 0.3s ease';
    imagemPrincipal.style.transform = 'translateX(0)';
  
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        trocarImagem("next");
      } else {
        trocarImagem("prev");
      }
    }
  
    // Reset
    startX = 0;
    currentX = 0;
  }
  

// TOUCH EVENTS
imagemPrincipal.addEventListener("touchstart", (e) => {
  startDrag(e.touches[0].clientX);
});

imagemPrincipal.addEventListener("touchmove", (e) => {
  drag(e.touches[0].clientX);
});

imagemPrincipal.addEventListener("touchend", () => {
  endDrag();
});

// MOUSE EVENTS
imagemPrincipal.addEventListener("mousedown", (e) => {
  e.preventDefault(); // previne seleção de imagem ou texto
  startDrag(e.clientX);

  // Adiciona listeners apenas durante o drag
  const onMouseMove = (e) => drag(e.clientX);
  const onMouseUp = () => {
    endDrag();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

const btnFecharProjetoDiferenciais = document.getElementById("btnFecharProjetoDiferenciais");

btnFecharProjetoDiferenciais.addEventListener("click", function () {
  // Aplica animação de saída (slide para a esquerda)
  projetoDiferenciaisTela.style.animation = "slideOutLeft 0.5s forwards";
  
  setTimeout(function () {
    // Oculta a tela do projeto-diferenciais e reseta o estado
    projetoDiferenciaisTela.style.display = "none";
    projetoDiferenciaisTela.style.animation = "";
    projetoDiferenciaisTela.classList.remove("ativo");
    
    // Retorna ao menu com animação de entrada da direita
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const iconeButtons = document.querySelectorAll('.icone-btn');

iconeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = btn.querySelector("img").alt;

    let caminhoPopup;

    switch (nome) {
      case "pe-direito":
        caminhoPopup = "images/tela-galeria/FOTOS/Chaincorp_Vila_Prudente_Living_04_Duplex_2_HR.jpg";
        break;
      case "cinema":
        caminhoPopup = "images/tela-projeto/diferenciais/FOTOS/Chaincorp_Vila_Prudente_Cine_Open_HR.jpg";
        break;
      case "coworking":
        caminhoPopup = "images/tela-projeto/diferenciais/FOTOS/Chaincorp_Vila_Prudente_Coworking_HR.jpg";
        break;
      case "game-pub":
        caminhoPopup = "images/tela-projeto/diferenciais/FOTOS/Chaincorp_Vila_Prudente_Game_Pub_HR.jpg";
        break;
      case "mercadinho":
        caminhoPopup = "images/tela-projeto/diferenciais/FOTOS/Chaincorp_Vila_Prudente_Mercadinho_HR.jpg";
        break;
      default:
        caminhoPopup = ""; // fallback
    }

    // Abre o popup se houver imagem
    if (caminhoPopup) {
      imagemZoom.src = caminhoPopup;
      popupZoom.style.display = "flex";
      setTimeout(() => {
        popupOverlay.style.opacity = 1;
      }, 10);
    }
  });
});

const botoes = document.querySelectorAll('.botao-projeto');
const todasAsTelas = document.querySelectorAll('section[id^="projeto-"]');
const fadeDuration = 1000; // duração do fade-in em milissegundos

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const idBotao = botao.id;
    if (!idBotao) return;

    const nomeTela = idBotao
      .replace(/^btn/, '')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();

    const idTela = `projeto-${nomeTela}`;
    const novaTela = document.getElementById(idTela);

    if (!novaTela) {
      console.error(`Tela com ID "${idTela}" não encontrada.`);
      return;
    }

    // Oculta todas as telas imediatamente, sem animação de saída
    todasAsTelas.forEach(tela => {
      tela.style.display = 'none';
      tela.classList.remove('ativo');
    });

    // Exibe a nova tela com fade in
    novaTela.style.display = 'block';
    novaTela.style.transform = 'none';
    novaTela.style.animation = 'none'; // limpa qualquer animação antiga
    //novaTela.style.animation = `fadeIn ${fadeDuration}ms ease forwards`;
    novaTela.classList.add('ativo');

    // Atualiza o botão ativo
    botoes.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
  });
});

const btnFecharProjetoFichaTecnica = document.getElementById("btnFecharProjetoFichaTecnica");
const projetoFichaTecnicaTela = document.getElementById("projeto-ficha-tecnica");

btnFecharProjetoFichaTecnica.addEventListener("click", function () {
  // Aplica animação de saída (slide para a esquerda)
  projetoFichaTecnicaTela.style.animation = "slideOutLeft 0.5s forwards";
  
  setTimeout(function () {
    // Oculta a tela do projeto-diferenciais e reseta o estado
    projetoFichaTecnicaTela.style.display = "none";
    projetoFichaTecnicaTela.style.animation = "";
    projetoFichaTecnicaTela.classList.remove("ativo");
    
    // Retorna ao menu com animação de entrada da direita
    menuTela.style.display = "block";
    menuTela.style.animation = "slideInRight 0.5s forwards";
  }, 500);
});

const cabecalhoImagem = document.getElementById('cabecalhoImagem');
const textoImagem = document.getElementById('textoImagem');
const botoesCabecalho = document.querySelectorAll('.cabecalho-area');

botoesCabecalho.forEach(botao => {
  botao.addEventListener('click', () => {
    const tipo = botao.dataset.cabecalho;

    cabecalhoImagem.src = `images/tela-projeto/ficha-tecnica/${tipo}/cabecalho.png`;
    textoImagem.src = `images/tela-projeto/ficha-tecnica/${tipo}/texto.png`;
  });
});



