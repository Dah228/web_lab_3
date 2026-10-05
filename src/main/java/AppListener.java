import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;

@WebListener
public class AppListener
        implements ServletContextListener, HttpSessionListener {

    @Override
    public void contextInitialized(ServletContextEvent event) {
        ServletContext context = event.getServletContext();

        context.setAttribute(
                ResultRepository.CONTEXT_ATTRIBUTE,
                new ResultRepository()
        );
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        ServletContext context =
                event.getSession().getServletContext();

        ResultRepository repository =
                (ResultRepository) context.getAttribute(
                        ResultRepository.CONTEXT_ATTRIBUTE
                );

        if (repository != null) {
            repository.removeSession(event.getSession().getId());
        }
    }
}