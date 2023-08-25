package min.zipcode.smartstone3.domain.enumeration;

/**
 * The BevelSides enumeration.
 */
public enum BevelSides {
    SINGLE("Single"),
    DOUBLE("Double");

    private final String value;

    BevelSides(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
