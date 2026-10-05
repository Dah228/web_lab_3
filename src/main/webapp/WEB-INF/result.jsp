<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Результат проверки</title>
</head>
<body>
    <h1>Результат проверки</h1>

    <table>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
        </tr>
        <tr>
            <td>${result.x}</td>
            <td>${result.y}</td>
            <td>${result.r}</td>
        </tr>
    </table>

    <p>${result.hit
        ? 'Точка попадает в область'
        : 'Точка не попадает в область'}</p>

    <p>Дата проверки: ${result.timestamp}</p>

    <a href="${pageContext.request.contextPath}/controller">
        Вернуться к форме
    </a>
</body>
</html>