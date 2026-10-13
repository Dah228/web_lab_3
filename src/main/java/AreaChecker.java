public final class AreaChecker {

    private AreaChecker() {
    }

    // Проверяет строки, полученные через req.getParameter().
    public static boolean isValid(String xText,
                                  String yText,
                                  String rText,
                                  boolean fromCanvas) {
        if (xText == null || yText == null || rText == null) {
            return false;
        }

        if (xText.isBlank() || yText.isBlank() || rText.isBlank()) {
            return false;
        }

        try {
            double x = Double.parseDouble(xText.trim());
            double y = Double.parseDouble(yText.trim());
            double r = Double.parseDouble(rText.trim());

            return isValid(x, y, r, fromCanvas);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static boolean isValid(double x,
                                  double y,
                                  double r,
                                  boolean fromCanvas) {
        if (!Double.isFinite(x)
                || !Double.isFinite(y)
                || !Double.isFinite(r)) {
            return false;
        }

        boolean validR =
                r == 1 || r == 1.5 || r == 2 || r == 2.5 || r == 3;

        if (!validR) {
            return false;
        }

        if (fromCanvas) {
            return true;
        }

        boolean validX =
                x >= -2 && x <= 2 && x * 2 == Math.rint(x * 2);

        boolean validY = y > -5 && y < 3;

        return validX && validY;
    }
    // Вызывается после успешной валидации.
    public static boolean isHit(double x, double y, double r) {
        // Треугольник во второй четверти.
        boolean triangle =
                x <= 0
                        && y >= 0
                        && y <= x + r / 2;

        // Прямоугольник в третьей четверти.
        boolean rectangle =
                x >= -r && x <= 0
                        && y >= -r / 2 && y <= 0;

        // Четверть круга в четвёртой четверти.
        boolean circle =
                x >= 0
                        && y <= 0
                        && x * x + y * y <= (r / 2) * (r / 2);

        return triangle || rectangle || circle;
    }
}