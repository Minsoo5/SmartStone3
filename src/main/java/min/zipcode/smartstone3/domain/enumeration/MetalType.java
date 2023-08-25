package min.zipcode.smartstone3.domain.enumeration;

/**
 * The MetalType enumeration.
 */
public enum MetalType {
    STAINLESS_STEEL("Stainless Steel"),
    HIGH_CARBON("High Carbon"),
    CERAMIC("Ceramic"),
    TOOL_STEEL("Tool Steel"),
    ALLOY_STEEL("Alloy Steel"),
    NOT_SURE("Not Sure");

    private final String value;

    MetalType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
