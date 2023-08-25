package min.zipcode.smartstone3.domain.enumeration;

/**
 * The KnifeStyle enumeration.
 */
public enum KnifeStyle {
    PAIRING_KNIFE("Pairing Knife"),
    PETTY_KNIFE("Petty Knife"),
    FILET_KNIFE("Filet Knife"),
    BONING_KNIFE("Boning Knife"),
    UTILITY_KNIFE("Utility Knife"),
    CHEF_KNIFE("Chef Knife"),
    CLEAVER("Cleaver"),
    SLICER("Slicer");

    private final String value;

    KnifeStyle(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
