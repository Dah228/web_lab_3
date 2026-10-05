<%@ page contentType="text/html; charset=UTF-8" %>
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
                </fieldset>

                <br><br>
                <label for="coord_Y"> Координата Y:</label>
                <input id="coord_Y" name="coord_Y" type="text" placeholder="от -5 до 3">
                <br><br>

                <fieldset>
                    <legend>Радиус R:</legend>
                    <label><input type="radio" name="radius_R" value="1"> 1</label>
                    <label><input type="radio" name="radius_R" value="1.5"> 1.5</label>
                    <label><input type="radio" name="radius_R" value="2"> 2</label>
                    <label><input type="radio" name="radius_R" value="2.5"> 2.5</label>
                    <label><input type="radio" name="radius_R" value="3" checked> 3</label>
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
                    <tbody id="results-body"></tbody>
                </table>
            </div>

        </th>
    </tr>

</table>

<script src="${pageContext.request.contextPath}/logic.js"></script>
</body>
</html>