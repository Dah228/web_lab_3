<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Ошибка ввода</title>
</head>
<body>
    <h1>Некорректные данные</h1>

    <p>При ручном вводе X выбирается кнопками от −2 до 2 с шагом 0.5.</p>
    <p>При ручном вводе Y должен быть строго между −5 и 3.</p>
    <p>При клике на график X и Y должны быть конечными числами.</p>
    <p>R: 1, 1.5, 2, 2.5 или 3.</p>

    <a href="${pageContext.request.contextPath}/controller">
        Вернуться к форме
    </a>
</body>
</html>