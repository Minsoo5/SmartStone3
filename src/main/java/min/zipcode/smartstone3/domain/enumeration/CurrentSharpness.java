package min.zipcode.smartstone3.domain.enumeration;

/**
 * The CurrentSharpness enumeration.
 */
public enum CurrentSharpness {
    RAZOR_SHARP("Razor Sharp"),
    SHARP("Sharp"),
    STARTING_TO_DULL("Staring to Dull"),
    DULL("Dull"),
    VERY_DULL("Very Dull"),
    SPOON("Spoon");

    private final String value;

    CurrentSharpness(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
