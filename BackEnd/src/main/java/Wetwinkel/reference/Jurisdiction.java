package Wetwinkel.reference;

public enum Jurisdiction {
    EMPLOYMENT("Werk"),
    ADMINISTRATIVE("Adminastratief"),
    RENTAL("Huur"),
    CRIMINAL("Crimineel"),
    PFL("Betaalde familie verlating"),
    SOCIAL_INSURANCE_LAW("Sociale verzekerings wet"),
    OTHER_GENERAL("Anders"),
    OTHER_CIVIL("Anders civiel"),
    IMMIGRATION("Immigratie");

    private String dutch;

    Jurisdiction(String dutch) {
        this.dutch = dutch;
    }

    public String getDutch() {
        return dutch;
    }

    @Override
    public String toString() {
        return dutch;
    }
}
