<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ПРОВЕРКА ПОПАДАНИЯ</title>

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/styles.css">
</head>

<body>


<table id="main_page_table">
    <tr>
        <th colspan="2" id="my_data">
            <h2> Логинова Дарья Андреевна </h2>
            <p class="anime_lol">P3213 | Вариант 80085</p>
        </th>
    </tr>

    <tr>
        <td id="drawing_pic">
            <canvas id="picture" width="400" height="400"></canvas>
        </td>


        <td>
            <form id="form_to_input"
                  action="${pageContext.request.contextPath}/controller"
                  method="get">

                <fieldset id="x-buttons">
                    <legend>Координата X:</legend>

                    <button type="button" data-x="-2">-2</button>
                    <button type="button" data-x="-1.5">-1.5</button>
                    <button type="button" data-x="-1">-1</button>
                    <button type="button" data-x="-0.5">-0.5</button>
                    <button type="button" data-x="0">0</button>
                    <button type="button" data-x="0.5">0.5</button>
                    <button type="button" data-x="1">1</button>
                    <button type="button" data-x="1.5">1.5</button>
                    <button type="button" data-x="2">2</button>
                    <input type="hidden" name="coord_X" id="coord_X">
                    <input type="hidden" name="source" id="source" value="manual">

                </fieldset>

                <br><br>
                <label for="coord_Y"> Координата Y:</label>
                <input id="coord_Y" name="coord_Y" type="text" placeholder="от -5 до 3">
                <br><br>

                <fieldset>
                    <legend>Радиус R:</legend>

                    <c:forEach items="${[1, 1.5, 2, 2.5, 3]}" var="radius">
                        <label>
                            <input type="radio"
                                   name="radius_R"
                                   value="${radius}"
                                   ${sessionScope.selectedRadius eq radius ? 'checked' : ''}>
                            ${radius}
                        </label>
                    </c:forEach>
                </fieldset>

                <button id="send_button" type="submit"> Отправить</button>
                <br><br>

            </form>

        </td>
    </tr>

    <tr>
        <th colspan="2" id="table_data">
            <div class="results-scroll">
                <table id="results-table">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Результат</th>
                        <th>Дата и время</th>
                    </tr>
                    </thead>

                    <tbody id="results-body">
                    <c:forEach items="${requestScope.results}" var="point">
                        <tr data-x="${point.x}"
                            data-y="${point.y}"
                            data-r="${point.r}"
                            data-hit="${point.hit}">

                            <td>${point.x}</td>
                            <td>${point.y}</td>
                            <td>${point.r}</td>

                            <td class="${point.hit ? 'hit' : 'miss'}">
                                ${point.hit ? 'Попала' : 'Не попала'}
                            </td>

                            <td>
                                <c:out value="${point.timestamp}"/>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </table>
            </div>

            <c:if test="${empty requestScope.results}">
                <p>Проверок пока нет.</p>
            </c:if>

        </th>
    </tr>

</table>

<script src="${pageContext.request.contextPath}/logic.js?v=coins2"></script>
</body>
</html>