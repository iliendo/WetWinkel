package Wetwinkel.reference;

public enum Status {
    OPEN("Open"),
    ONGOING("Bezig"),
    CLOSE("Klaar");

    private String dutch;
    Status(String dutch){
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
