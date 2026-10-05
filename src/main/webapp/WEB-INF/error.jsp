<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Ошибка ввода</title>
</head>
<body>
    <h1>Некорректные данные</h1>

    <p>X: от −2 до 2 с шагом 0.5.</p>
    <p>Y: строго между −5 и 3.</p>
    <p>R: 1, 1.5, 2, 2.5 или 3.</p>

    <a href="${pageContext.request.contextPath}/controller">
        Вернуться к форме
    </a>
</body>
</html>