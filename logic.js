const canvas = document.getElementById('picture');
const ctx = canvas.getContext('2d');
const form = document.getElementById('form_to_input');
const tbody = document.getElementById('results-body');
const coord_X = document.getElementById('coord_X');
const coord_Y = document.getElementById('coord_Y');
const xButtons = document.querySelectorAll('#x-buttons button');
const radiusButtons = document.querySelectorAll('input[name="radius_R"]');

const allowedX = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
const allowedR = [1, 1.5, 2, 2.5, 3];

function redraw() {
    const selected = document.querySelector('input[name="radius_R"]:checked');

    if (selected) {
        draw_canvas(Number(selected.value));
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
        points_to_canvas(point.x, point.y, point.isHit);
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
        coord_X.value = button.dataset.x;

        xButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

function points_to_canvas(x, y, isHit) {
    const pixelX = x * 50 + 200;
    const pixelY = 200 - y * 50;

    ctx.beginPath();
    ctx.arc(pixelX, pixelY, 2, 0, Math.PI * 2);
    ctx.fillStyle = isHit ? 'green' : 'red';
    ctx.fill();
}

const checkedPoints = [];

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

function check_hit(x, y, r) {
    const triangle =
        x <= 0 &&
        y >= 0 &&
        y <= x + r / 2;

    const rectangle =
        x >= -r &&
        x <= 0 &&
        y >= -r / 2 &&
        y <= 0;

    const circle =
        x >= 0 &&
        y <= 0 &&
        x * x + y * y <= (r / 2) ** 2;

    return triangle || rectangle || circle;
}

function add_element_to_table(record) {
    const tr = document.createElement('tr');

    const cells = [
        record.x,
        record.y,
        record.r,
        record.isHit ? 'Попала' : 'Не попала',
        new Date(record.timestamp).toLocaleString('ru-RU'),
        record.executionTime.toFixed(3)
    ];

    cells.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
    });

    tr.children[3].style.color = record.isHit ? 'green' : 'red';
    tr.children[3].style.fontWeight = 'bold';

    tbody.prepend(tr);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedR =
        document.querySelector('input[name="radius_R"]:checked');

    const xText = coord_X.value.trim();
    const x = Number(xText);

    if (xText === '' || !allowedX.includes(x)) {
        alert('Выберите X с помощью кнопок.');
        return;
    }

    if (!input_is_correct(coord_Y.value)) {
        alert('Введите число Y: −5 < Y < 3. Границы не включены.');
        return;
    }

    if (!selectedR || !allowedR.includes(Number(selectedR.value))) {
        alert('Выберите радиус R.');
        return;
    }

    const y = Number(coord_Y.value.trim().replace(',', '.'));
    const r = Number(selectedR.value);

    const start = performance.now();
    const isHit = check_hit(x, y, r);
    const executionTime = performance.now() - start;

    checkedPoints.push({ x, y, r, isHit });
    points_to_canvas(x, y, isHit);

    add_element_to_table({
        x,
        y,
        r,
        isHit,
        timestamp: Date.now(),
        executionTime
    });
});

// Пока проверка выполняется в браузере, а не на сервере.
const timeHeader =
    document.querySelector('#results-table thead tr th:last-child');

if (timeHeader) {
    timeHeader.textContent = 'Время проверки, мс';
}


canvas.addEventListener('click', function(event) {
    const selectedR =
        document.querySelector('input[name="radius_R"]:checked');

    if (!selectedR) {
        alert('Сначала выберите радиус R.');
        return;
    }

    const r = Number(selectedR.value);

    if (!allowedR.includes(r)) {
        alert('Выбран недопустимый радиус R.');
        return;
    }

    // Переводим положение мыши в пиксели Canvas.
    const rect = canvas.getBoundingClientRect();

    const pixelX =
        (event.clientX - rect.left) * canvas.width / rect.width;

    const pixelY =
        (event.clientY - rect.top) * canvas.height / rect.height;

    // В графике начало координат — (200, 200),
    // одна координатная единица занимает 50 пикселей.
    const rawX = (pixelX - 200) / 50;
    const rawY = (200 - pixelY) / 50;
    const y = Number(rawY.toFixed(3));


    // Округляем X до ближайшего значения с шагом 0.5.
    const roundedX = Math.round(rawX * 2) / 2;
    const x = roundedX === 0 ? 0 : roundedX;

    if (!allowedX.includes(x)) {
        alert('Ввод невалидный: округлённый X должен быть от −2 до 2.');
        return;
    }

    if (!Number.isFinite(y) || y <= -5 || y >= 3) {
        alert('Ввод невалидный: Y должен быть строго между −5 и 3.');
        return;
    }

    // Записываем координаты в форму. Y не округляем.
    coord_X.value = String(x);
    coord_Y.value = String(y);

    // Подсвечиваем кнопку полученного X.
    xButtons.forEach(button => {
        button.classList.toggle(
            'selected',
            Number(button.dataset.x) === x
        );
    });

    form.requestSubmit();
});


redraw();