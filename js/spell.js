/* spell.js */
const runesSet = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛟᛞ';

function initSpellText(boxId) {
    const box = document.getElementById(boxId);
    
    // Processa cada parágrafo dentro do contêiner
    box.querySelectorAll('p').forEach(p => {
        const text = p.innerText;
        p.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'char-wrapper';
            span.innerHTML = `<span class="rune-char">${runesSet[Math.floor(Math.random()*runesSet.length)]}</span><span class="real-char">${char}</span>`;
            p.appendChild(span);
        });
    });

    // Tradução em massa ao clicar
    box.addEventListener('click', () => {
        const allChars = box.querySelectorAll('.char-wrapper');
        allChars.forEach((el, index) => {
            setTimeout(() => {
                // Só dispara se a letra ainda não tiver sido traduzida
                if(!el.classList.contains('translated')){
                    el.classList.add('translated');
                    spawnEstilhaco(el); // Efeito de estilhaço individual
                }
            }, index * 25); // Velocidade da revelação (um pouco mais lenta para ver o estilhaço)
        });
    });
}

// Cria a explosão de luz branca pura em cada letra
function spawnEstilhaco(el) {
    const rect = el.getBoundingClientRect();
    // Cria 5 partículas rápidas e brilhantes por letra
    for(let i = 0; i < 5; i++) { 
        const dust = document.createElement('div');
        dust.className = 'char-dust';
        // Começa no centro da letra
        dust.style.left = (rect.left + rect.width/2) + 'px';
        dust.style.top = (rect.top + rect.height/2) + 'px';
        document.body.appendChild(dust);
        
        // Direção aleatória da explosão
        const tx = (Math.random() - 0.5) * 100; // espalha no eixo X
        const ty = (Math.random() - 0.5) * 100; // espalha no eixo Y
        
        dust.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' }); // Explosão rápida
        
        setTimeout(() => dust.remove(), 600);
    }
}

// --- LÓGICA DO RASTRO MÁGICO DO MOUSE ---
window.addEventListener('mousemove', (e) => {
    // 1. Rastro Prateado Principal
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 400);

    // 2. Poeira Mágica (fagulhas)
    if (Math.random() > 0.5) { // 50% de chance de gerar poeira a cada movimento
        const dust = document.createElement('div');
        dust.className = 'mouse-dust';
        dust.style.left = e.pageX + 'px';
        dust.style.top = e.pageY + 'px';
        
        const tx = (Math.random() - 0.5) * 60; // espalha no eixo X
        const ty = (Math.random() - 0.5) * 60; // espalha no eixo Y
        dust.style.setProperty('--tx', `${tx}px`);
        dust.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(dust);
        setTimeout(() => dust.remove(), 800);
    }
});