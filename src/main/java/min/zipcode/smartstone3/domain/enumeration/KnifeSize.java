package min.zipcode.smartstone3.domain.enumeration;

/**
 * The KnifeSize enumeration.
 */
public enum KnifeSize {
    EIGHTY("80 mm"),
    ONE_HUNDERD_TWENTY("120 mm"),
    ONE_HUNDRED_FORTY("140 mm"),
    ONE_HUNDERD_SIXTY("160 mm"),
    ONE_HUNDERD_EIGHTY("180 mm"),
    TWO_HUNDRED("200 mm"),
    TWO_HUNDRED_TWENTY("220 mm"),
    TWO_HUNDERD_FORTY("240 mm"),
    TWO_HUNDERD_EIGHTY("280 mm");

    private final String value;

    KnifeSize(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
