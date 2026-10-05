import java.sql.Timestamp;

public final class CheckResult {
    private final double x;
    private final double y;
    private final double r;
    private final boolean hit;
    private final Timestamp timestamp;

    public CheckResult(double x, double y, double r,
                       boolean hit, Timestamp timestamp) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.timestamp = Timestamp.from(timestamp.toInstant());
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public Timestamp getTimestamp() {
        return Timestamp.from(timestamp.toInstant());
    }
}