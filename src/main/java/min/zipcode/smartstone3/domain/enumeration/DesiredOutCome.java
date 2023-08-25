package min.zipcode.smartstone3.domain.enumeration;

/**
 * The DesiredOutCome enumeration.
 */
public enum DesiredOutCome {
    LASER("Laser"),
    WORK_HORSE("Work Horse"),
    BUTCHER("Butcher");

    private final String value;

    DesiredOutCome(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
