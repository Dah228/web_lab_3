import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class ResultRepository {

    public static final String CONTEXT_ATTRIBUTE = "resultRepository";

    private final Map<String, List<CheckResult>> resultsBySession =
            new HashMap<>();

    public synchronized void add(String sessionId, CheckResult result) {
        resultsBySession
                .computeIfAbsent(sessionId, id -> new ArrayList<>())
                .add(result);
    }

    public synchronized List<CheckResult> findBySession(String sessionId) {
        List<CheckResult> results = resultsBySession.get(sessionId);

        if (results == null) {
            return List.of();
        }

        return List.copyOf(results);
    }

    public synchronized void removeSession(String sessionId) {
        resultsBySession.remove(sessionId);
    }
}