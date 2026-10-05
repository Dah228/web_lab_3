import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/WEB-INF/area-check")
public class AreaCheckServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        String xText = req.getParameter("coord_X");
        String yText = req.getParameter("coord_Y");
        String rText = req.getParameter("radius_R");

        if (!AreaChecker.isValid(xText, yText, rText)) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);

            req.getRequestDispatcher("/WEB-INF/error.jsp")
                    .forward(req, resp);

            return;
        }

        double x = Double.parseDouble(xText.trim());
        double y = Double.parseDouble(yText.trim());
        double r = Double.parseDouble(rText.trim());

        boolean hit = AreaChecker.isHit(x, y, r);

        CheckResult result = new CheckResult(
                x,
                y,
                r,
                hit,
                new java.sql.Timestamp(System.currentTimeMillis())
        );
        ResultRepository repository =
                (ResultRepository) getServletContext().getAttribute(
                        ResultRepository.CONTEXT_ATTRIBUTE
                );

        if (repository == null) {
            throw new ServletException("Хранилище результатов не создано");
        }

        String sessionId = req.getSession().getId();
        repository.add(sessionId, result);

        req.setAttribute("result", result);

        req.getRequestDispatcher("/WEB-INF/result.jsp")
                .forward(req, resp);
    }
}