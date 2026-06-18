const runesSet = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛟᛞ';

function initSpellText(boxId) {
    const box = document.getElementById(boxId);
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

    box.addEventListener('click', () => {
        const allChars = box.querySelectorAll('.char-wrapper');
        allChars.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('translated');
                spawnDust(el);
            }, index * 20);
        });
    });
}

function spawnDust(el) {
    const rect = el.getBoundingClientRect();
    for(let i=0; i<3; i++) { // 3 partículas por letra
        const dust = document.createElement('div');
        dust.className = 'char-dust';
        dust.style.left = (rect.left + Math.random()*rect.width) + 'px';
        dust.style.top = (rect.top + Math.random()*rect.height) + 'px';
        document.body.appendChild(dust);
        dust.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-15px) scale(0)', opacity: 0 }
        ], { duration: 800 });
        setTimeout(() => dust.remove(), 800);
    }
}