/* spell.js */
const runesSet = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛟᛞ';

function getRandomRune() {
    return runesSet[Math.floor(Math.random() * runesSet.length)];
}

function createCharacterWrapper(char) {
    const wrapper = document.createElement('span');
    const rune = document.createElement('span');
    const real = document.createElement('span');

    wrapper.className = 'char-wrapper';
    rune.className = 'rune-char';
    real.className = 'real-char';

    rune.textContent = char === ' ' ? '\u00A0' : getRandomRune();
    real.textContent = char === ' ' ? '\u00A0' : char;

    wrapper.append(rune, real);
    return wrapper;
}

function initSpellText(boxId) {
    const box = document.getElementById(boxId);

    if (!box) {
        console.error(`Elemento com ID "${boxId}" não foi encontrado.`);
        return;
    }

    box.querySelectorAll('p').forEach((paragraph) => {
        const text = paragraph.textContent;
        paragraph.replaceChildren(...[...text].map(createCharacterWrapper));
    });

    const revealText = () => {
        const allChars = box.querySelectorAll('.char-wrapper:not(.translated)');

        allChars.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('translated');
                spawnDust(el);
            }, index * 20);
        });
    };

    box.addEventListener('click', revealText);
    box.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            revealText();
        }
    });
}

function spawnDust(el) {
    const rect = el.getBoundingClientRect();

    for (let i = 0; i < 3; i += 1) {
        const dust = document.createElement('div');
        dust.className = 'char-dust';
        dust.style.left = `${rect.left + Math.random() * rect.width}px`;
        dust.style.top = `${rect.top + Math.random() * rect.height}px`;
        document.body.appendChild(dust);

        dust.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-20px) scale(0)', opacity: 0 }
        ], { duration: 1000, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' });

        setTimeout(() => dust.remove(), 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => initSpellText('main-desc'));
