const START_HEIGHT = 220;
const END_HEIGHT = 150;
const TARGET_HEIGHT = 156;
const FAKE_GIFT_HEIGHT = 175;
const PIXELS_PER_CM = 100;

const rulerContainer = document.getElementById('ruler-container');
const ruler = document.getElementById('ruler');
const modal = document.getElementById('modal');
const fakeModal = document.getElementById('fake-modal');
const closeModal = document.getElementById('close-modal');
const closeFakeModal = document.getElementById('close-fake-modal');

// Twemoji SVG
function getSvgImg(hexCode) {
    return `<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${hexCode}.svg" style="width:100%;height:100%;object-fit:contain;" />`;
}

const svgs = {
    planet: getSvgImg('1fa90'),
    sun: getSvgImg('2600'),
    moon: getSvgImg('1f319'),
    star: getSvgImg('2b50'),
    cloud: getSvgImg('2601'),
    bird: getSvgImg('1f54a'),
    tree: getSvgImg('1f333'),
    pine: getSvgImg('1f332'),
    flower: getSvgImg('1f337'),
    sunflower: getSvgImg('1f33b'),
    gift: getSvgImg('1f381'),
    airplane: getSvgImg('2708'),
    balloon: getSvgImg('1f388'),
    satellite: getSvgImg('1f6f0'),
    mountain: getSvgImg('26f0'),
    bush: getSvgImg('1f33f'),
    rainbow: getSvgImg('1f308'),
    rocket: getSvgImg('1f680'),
    butterfly: getSvgImg('1f98b'),
    comet: getSvgImg('2604'),
    hibiscus: getSvgImg('1f33a'),
};

const heightTexts = {
    220: "Тут летают только мечты Саиды 🚀",
    210: "Жираф: 'Привет, соседка!' 🦒",
    200: "Холодильник смотрит на тебя сверху вниз 🧊",
    190: "Дверная ручка — твой злейший враг 🚪",
    185: "Тут живут люди нормального роста 🧍",
    175: "Вот и подарок! 🎁",
    165: "Табуретка — лучший друг Саиды 🪜",
    160: "Стоооп, это ещё не всё! 👀",
    156: "🎯 ВОТ ОНА! САИДА!"
};

const PADDING_TOP = 200;

/*
 * Линейка на 22%. 
 * Все объекты размещаем СЛЕВА (0–16%) или СПРАВА (30–90%) от линейки,
 * чтобы линия их не закрывала.
 */
function createBgElement(svgHtml, cmHeight, leftPos, size, extraClass) {
    const topPosition = PADDING_TOP + (START_HEIGHT - cmHeight) * PIXELS_PER_CM;
    const el = document.createElement('div');
    el.className = 'bg-element';
    if (extraClass) el.classList.add(extraClass);
    el.innerHTML = svgHtml;
    el.style.top = `${topPosition}px`;
    el.style.left = leftPos;
    el.style.width = size;
    el.style.height = size;
    rulerContainer.appendChild(el);
}

function addBackgroundElements() {
    // ==============================
    //  КОСМОС (220–195 см)
    //  Объекты СЛЕВА (0–16%) и СПРАВА (30%+)
    // ==============================

    // Слева
    createBgElement(svgs.sun, 219, '2%', '120px', 'float-anim');   // ☀️ Солнце
    createBgElement(svgs.star, 213, '8%', '22px');                  // ⭐
    createBgElement(svgs.star, 206, '4%', '18px');                  // ⭐
    createBgElement(svgs.comet, 200, '10%', '55px');                // ☄️ Комета

    // Справа
    createBgElement(svgs.planet, 218, '75%', '110px');              // 🪐 Планета
    createBgElement(svgs.rocket, 215, '45%', '65px');               // 🚀 Ракета
    createBgElement(svgs.star, 212, '55%', '20px');                 // ⭐
    createBgElement(svgs.moon, 209, '85%', '70px');                 // 🌙 Луна
    createBgElement(svgs.satellite, 205, '40%', '55px');            // 🛰️ Спутник
    createBgElement(svgs.star, 203, '65%', '25px');                 // ⭐
    createBgElement(svgs.star, 198, '50%', '18px');                 // ⭐
    createBgElement(svgs.star, 196, '80%', '22px');                 // ⭐

    // ==============================
    //  НЕБО (195–165 см)
    //  Чередование лево / право
    // ==============================

    // Слева
    createBgElement(svgs.cloud, 194, '1%', '130px', 'float-anim'); // ☁️
    createBgElement(svgs.balloon, 184, '5%', '60px', 'float-anim');// 🎈
    createBgElement(svgs.cloud, 176, '2%', '100px', 'float-anim'); // ☁️
    createBgElement(svgs.bird, 169, '8%', '35px');                 // 🕊️

    // Справа
    createBgElement(svgs.airplane, 192, '70%', '85px');            // ✈️
    createBgElement(svgs.cloud, 189, '55%', '150px', 'float-anim');// ☁️
    createBgElement(svgs.bird, 186, '40%', '38px');                // 🕊️
    createBgElement(svgs.rainbow, 181, '50%', '95px');             // 🌈
    createBgElement(svgs.cloud, 178, '65%', '120px', 'float-anim');// ☁️
    createBgElement(svgs.butterfly, 172, '45%', '40px', 'tilted'); // 🦋 Под наклоном!
    createBgElement(svgs.bird, 167, '75%', '30px');                // 🕊️
    createBgElement(svgs.cloud, 165, '85%', '100px', 'float-anim');// ☁️

    // ==============================
    //  ЗЕМЛЯ (165–150 см)
    //  Слева и справа, не перекрывая друг друга
    // ==============================

    // Слева
    createBgElement(svgs.mountain, 163, '1%', '180px');            // ⛰️
    createBgElement(svgs.tree, 159, '3%', '130px');                // 🌳
    createBgElement(svgs.bush, 154, '8%', '70px');                 // 🌿
    createBgElement(svgs.flower, 152, '2%', '35px');               // 🌷
    createBgElement(svgs.hibiscus, 151, '14%', '30px');            // 🌺

    // Справа
    createBgElement(svgs.mountain, 161, '55%', '200px');           // ⛰️
    createBgElement(svgs.pine, 160, '80%', '130px');               // 🌲
    createBgElement(svgs.tree, 156, '45%', '150px');               // 🌳
    createBgElement(svgs.bush, 153, '70%', '80px');                // 🌿
    createBgElement(svgs.sunflower, 151, '55%', '40px');           // 🌻
    createBgElement(svgs.flower, 150, '85%', '30px');              // 🌷
}

function initRuler() {
    const totalCm = START_HEIGHT - END_HEIGHT;
    const totalHeightPixels = totalCm * PIXELS_PER_CM;

    rulerContainer.style.minHeight = `${totalHeightPixels}px`;

    // Линия ровно от первой до последней отметки
    ruler.style.top = `${PADDING_TOP}px`;
    ruler.style.height = `${totalHeightPixels}px`;

    addBackgroundElements();

    for (let cm = START_HEIGHT; cm >= END_HEIGHT; cm--) {
        const topPosition = PADDING_TOP + (START_HEIGHT - cm) * PIXELS_PER_CM;

        if (cm % 5 === 0 || cm === TARGET_HEIGHT) {
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.style.top = `${topPosition}px`;

            const cmLabel = document.createElement('div');
            cmLabel.className = 'cm-label';
            cmLabel.innerText = `${cm}`;
            marker.appendChild(cmLabel);

            const tick = document.createElement('div');
            tick.className = 'tick';
            if (cm % 10 === 0) tick.style.width = '40px';
            marker.appendChild(tick);

            if (heightTexts[cm] && cm !== FAKE_GIFT_HEIGHT) {
                const text = document.createElement('div');
                text.className = 'marker-text';
                text.innerText = heightTexts[cm];
                marker.appendChild(text);
            }

            // Фейковый подарок (175 см)
            if (cm === FAKE_GIFT_HEIGHT) {
                const gift = document.createElement('div');
                gift.className = 'fake-gift-anim';
                gift.innerHTML = svgs.gift;
                gift.style.width = '80px';
                gift.style.height = '80px';
                gift.title = 'Ого, подарок?!';
                gift.onclick = openFakeGift;
                marker.appendChild(gift);

                if (heightTexts[cm]) {
                    const text = document.createElement('div');
                    text.className = 'marker-text';
                    text.style.marginLeft = '12px';
                    text.innerText = heightTexts[cm];
                    marker.appendChild(text);
                }
            }

            // Настоящий подарок (156 см)
            if (cm === TARGET_HEIGHT) {
                tick.style.backgroundColor = '#ffd54f';
                tick.style.boxShadow = '0 0 15px #ff9800';
                tick.style.width = '55px';

                const gift = document.createElement('div');
                gift.className = 'gift-box';
                gift.innerHTML = svgs.gift;
                gift.style.width = '90px';
                gift.style.height = '90px';
                gift.title = 'Нажми меня!';
                gift.onclick = openRealGift;

                marker.innerHTML = '';
                marker.appendChild(cmLabel);
                marker.appendChild(tick);
                marker.appendChild(gift);

                const text = document.createElement('div');
                text.className = 'marker-text';
                text.style.marginLeft = '15px';
                text.style.backgroundColor = '#ffd54f';
                text.style.color = '#d84315';
                text.style.fontSize = '1.4rem';
                text.innerText = heightTexts[cm];
                marker.appendChild(text);
            }

            rulerContainer.appendChild(marker);
        } else {
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.style.top = `${topPosition}px`;

            const tick = document.createElement('div');
            tick.className = 'tick';
            tick.style.width = '10px';
            marker.appendChild(tick);
            rulerContainer.appendChild(marker);
        }
    }
}

function fireConfetti() {
    var duration = 3000;
    var end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f06292', '#ffeb3b', '#4fc3f7'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f06292', '#ffeb3b', '#4fc3f7'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

function openFakeGift() { fakeModal.classList.remove('hidden'); }
function openRealGift() {
    fireConfetti();
    setTimeout(() => { modal.classList.remove('hidden'); }, 500);
}

closeModal.addEventListener('click', () => { modal.classList.add('hidden'); });
closeFakeModal.addEventListener('click', () => { fakeModal.classList.add('hidden'); });

initRuler();
