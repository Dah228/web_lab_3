import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;


@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String x = req.getParameter("coord_X");
        String y = req.getParameter("coord_Y");
        String r = req.getParameter("radius_R");

        if (hasPointParameters(x, y, r)){
            req.getRequestDispatcher("/WEB-INF/area-check")
                    .forward(req, resp);
        }
        else {
            ResultRepository repository =
                    (ResultRepository) getServletContext().getAttribute(
                            ResultRepository.CONTEXT_ATTRIBUTE
                    );

            if (repository == null) {
                throw new ServletException("Хранилище результатов не создано");
            }

            String sessionId = req.getSession().getId();

            req.setAttribute(
                    "results",
                    repository.findBySession(sessionId)
            );

            req.getRequestDispatcher("/WEB-INF/form.jsp")
                    .forward(req, resp);
        }
    }


    private static boolean hasPointParameters(String x, String y, String r) {
        return x != null || y != null || r != null;
    }
}
