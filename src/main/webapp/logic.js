const canvas = document.getElementById('picture');
const ctx = canvas.getContext('2d');
const form = document.getElementById('form_to_input');
const tbody = document.getElementById('results-body');
const coord_X = document.getElementById('coord_X');
const coord_Y = document.getElementById('coord_Y');
const xButtons = document.querySelectorAll('#x-buttons button');
const radiusButtons = document.querySelectorAll('input[name="radius_R"]');
const sourceInput = document.getElementById('source');

coord_Y.addEventListener('input', () => {
    sourceInput.value = 'manual';
});
// Адрес папки, из которой загружен logic.js.
const assetsUrl = new URL('.', document.currentScript.src);

const orelImage = new Image();
const reshkaImage = new Image();

orelImage.addEventListener('error', () => {
    console.error('Не удалось загрузить:', orelImage.src);
});

reshkaImage.addEventListener('error', () => {
    console.error('Не удалось загрузить:', reshkaImage.src);
});

// Перерисовываем график после загрузки картинок
orelImage.addEventListener('load', redraw);
reshkaImage.addEventListener('load', redraw);

orelImage.src = new URL('orel.png', assetsUrl).href;
reshkaImage.src = new URL('reshka.png', assetsUrl).href;

const allowedX = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
const allowedR = [1, 1.5, 2, 2.5, 3];

function redraw() {
    const selected =
        document.querySelector('input[name="radius_R"]:checked');

    if (selected) {
        draw_canvas(Number(selected.value));
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Пока радиус не выбран, показываем только оси.
        draw_axes(150);
    }
}

// Перерисовка при выборе радиуса.
radiusButtons.forEach(button => {
    button.addEventListener('change', redraw);
});

function draw_canvas(r) {
    const R = r * 50;
    const x0 = 200;
    const y0 = 200;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'yellow';

    // Треугольник во второй четверти.
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 - R / 2, y0);
    ctx.lineTo(x0, y0 - R / 2);
    ctx.closePath();
    ctx.fill();

    // Прямоугольник в третьей четверти.
    ctx.beginPath();
    ctx.rect(x0 - R, y0, R, R / 2);
    ctx.fill();

    // Четверть круга в четвёртой четверти.
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.arc(x0, y0, R / 2, 0, Math.PI / 2);
    ctx.closePath();
    ctx.fill();

    draw_axes(R);
    checkedPoints.forEach(point => {
        if (point.r === r) {
            points_to_canvas(point.x, point.y, point.isHit);
        }
    });
}

function draw_axes(R) {
    const x0 = 200;
    const y0 = 200;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();

    // Оси.
    ctx.moveTo(0, y0);
    ctx.lineTo(400, y0);
    ctx.moveTo(x0, 400);
    ctx.lineTo(x0, 0);

    // Стрелки.
    ctx.moveTo(390, 195);
    ctx.lineTo(400, 200);
    ctx.lineTo(390, 205);

    ctx.moveTo(195, 10);
    ctx.lineTo(200, 0);
    ctx.lineTo(205, 10);

    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textBaseline = 'middle';

    const marks = [
        { value: -R, label: '−R' },
        { value: -R / 2, label: '−R/2' },
        { value: R / 2, label: 'R/2' },
        { value: R, label: 'R' }
    ];

    marks.forEach(mark => {
        const x = x0 + mark.value;
        const y = y0 - mark.value;

        ctx.beginPath();

        // Штрих на X.
        ctx.moveTo(x, y0 - 4);
        ctx.lineTo(x, y0 + 4);

        // Штрих на Y.
        ctx.moveTo(x0 - 4, y);
        ctx.lineTo(x0 + 4, y);

        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.fillText(mark.label, x, y0 - 15);

        ctx.textAlign = 'left';
        ctx.fillText(mark.label, x0 + 10, y);
    });

    ctx.textAlign = 'center';
    ctx.fillText('x', 390, 180);
    ctx.fillText('y', 220, 12);
}

xButtons.forEach(button => {
    button.addEventListener('click', () => {
        sourceInput.value = 'manual';

        coord_X.value = button.dataset.x;

        xButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

function points_to_canvas(x, y, isHit) {
    const pixelX = x * 50 + 200;
    const pixelY = 200 - y * 50;

    const image = isHit ? orelImage : reshkaImage;
    const size = 24;

    if (!image.complete || image.naturalWidth === 0) {
        return;
    }

    ctx.drawImage(
        image,
        pixelX - size / 2,
        pixelY - size / 2,
        size,
        size
    );
}

const checkedPoints = Array.from(
    document.querySelectorAll('#results-body tr[data-x]')
).map(row => ({
    x: Number(row.dataset.x),
    y: Number(row.dataset.y),
    r: Number(row.dataset.r),
    isHit: row.dataset.hit === 'true'
}));

function input_is_correct(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return false;
    }

    // Разрешаем десятичную точку или запятую.
    const text = value.trim().replace(',', '.');

    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
        return false;
    }

    const y = Number(text);
    return Number.isFinite(y) && y > -5 && y < 3;
}

form.addEventListener('submit', function(event) {
    const xText = coord_X.value.trim();
    const yText = coord_Y.value.trim().replace(',', '.');

    const x = Number(xText);
    const y = Number(yText);

    const selectedR =
        document.querySelector('input[name="radius_R"]:checked');

    if (
        xText === '' ||
        yText === '' ||
        !Number.isFinite(x) ||
        !Number.isFinite(y)
    ) {
        event.preventDefault();
        alert('Координаты должны быть конечными числами.');
        return;
    }

    if (!selectedR || !allowedR.includes(Number(selectedR.value))) {
        event.preventDefault();
        alert('Выберите допустимый радиус R.');
        return;
    }

    // Ограничения варианта применяем только к ручному вводу.
    if (sourceInput.value !== 'canvas') {
        if (!allowedX.includes(x)) {
            event.preventDefault();
            alert('Выберите X с помощью кнопок.');
            return;
        }

        if (!input_is_correct(yText)) {
            event.preventDefault();
            alert('Введите число Y: −5 < Y < 3.');
            return;
        }
    }

    coord_Y.value = yText;
});



canvas.addEventListener('click', function(event) {
    const selectedR =
        document.querySelector('input[name="radius_R"]:checked');

    if (!selectedR || !allowedR.includes(Number(selectedR.value))) {
        alert('Сначала выберите допустимый радиус R.');
        return;
    }

    const rect = canvas.getBoundingClientRect();

    const pixelX =
        (event.clientX - rect.left) * canvas.width / rect.width;

    const pixelY =
        (event.clientY - rect.top) * canvas.height / rect.height;

    const x = Number(((pixelX - 200) / 50).toFixed(3));
    const y = Number(((200 - pixelY) / 50).toFixed(3));

    coord_X.value = String(x);
    coord_Y.value = String(y);
    sourceInput.value = 'canvas';

    xButtons.forEach(button => {
        button.classList.toggle(
            'selected',
            Number(button.dataset.x) === x
        );
    });

    form.requestSubmit();
});


redraw();