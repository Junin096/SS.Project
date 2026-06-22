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

            // --- NOVO: Tradução Individual por Mouse (Efeito Lanterna) ---
            span.addEventListener('mouseenter', () => {
                if(!span.classList.contains('translated')){
                    span.classList.add('translated');
                    spawnEstilhaco(span); // Estilhaça apenas esta letra
                }
            });

            // Retorna ao Vazio (volta a ser runa) após o mouse sair
            span.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    span.classList.remove('translated');
                }, 1500); // 1.5 segundos para a runa voltar
            });
        });
    });

    // Tradução em massa ao clicar (mantida como feitiço de revelação total)
    box.addEventListener('click', () => {
        const allChars = box.querySelectorAll('.char-wrapper');
        allChars.forEach((el, index) => {
            setTimeout(() => {
                if(!el.classList.contains('translated')){
                    el.classList.add('translated');
                    spawnEstilhaco(el);
                }
            }, index * 15);
        });
    });
}

// Cria a explosão de luz branca pura em cada letra
function spawnEstilhaco(el) {
    const rect = el.getBoundingClientRect();
    for(let i = 0; i < 5; i++) { 
        const dust = document.createElement('div');
        dust.className = 'char-dust';
        dust.style.left = (rect.left + rect.width/2) + 'px';
        dust.style.top = (rect.top + rect.height/2) + 'px';
        document.body.appendChild(dust);
        
        const tx = (Math.random() - 0.5) * 100;
        const ty = (Math.random() - 0.5) * 100;
        
        dust.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });
        
        setTimeout(() => dust.remove(), 600);
    }
}

// LÓGICA DO RASTRO MÁGICO DO MOUSE
window.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 400);

    if (Math.random() > 0.5) {
        const dust = document.createElement('div');
        dust.className = 'mouse-dust';
        dust.style.left = e.pageX + 'px';
        dust.style.top = e.pageY + 'px';
        
        const tx = (Math.random() - 0.5) * 60;
        const ty = (Math.random() - 0.5) * 60;
        dust.style.setProperty('--tx', `${tx}px`);
        dust.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(dust);
        setTimeout(() => dust.remove(), 800);
    }
});