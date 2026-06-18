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
                el.classList.add('translated');
                spawnDust(el);
            }, index * 20); // Velocidade da revelação
        });
    });
}

function spawnDust(el) {
    const rect = el.getBoundingClientRect();
    for(let i = 0; i < 3; i++) { // Cria 3 partículas por letra
        const dust = document.createElement('div');
        dust.className = 'char-dust';
        dust.style.left = (rect.left + Math.random() * rect.width) + 'px';
        dust.style.top = (rect.top + Math.random() * rect.height) + 'px';
        document.body.appendChild(dust);
        
        dust.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-20px) scale(0)', opacity: 0 }
        ], { duration: 1000, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });
        
        setTimeout(() => dust.remove(), 1000);
    }
}