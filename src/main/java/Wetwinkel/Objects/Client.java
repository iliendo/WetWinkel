package Wetwinkel.Objects;

import javax.persistence.*;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Client.Get", query = "SELECT c FROM Client c ")//WHERE tussenvoegsel = :tussenvoegsel AND wachtwoord = :wachtwoord
})
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idClient;
    private String initialen;
    private String tussenvoegsel;
    private String achternaam;
    private String straatnaam;
    private String postcode;
    private int huisnummer;
    private String toevoeging;
    private String land;
    private int telefoonnummer;
    private String email;
    private int ontdekkingWw;

    public Client(String initialen, String tussenvoegsel, String achternaam, String straatnaam, String postcode, int huisnummer,
    String toevoeging, String land, int telefoonnummer, String email, int ontdekkingWw) {
        this.initialen = initialen;
        this.tussenvoegsel = tussenvoegsel;
        this.achternaam = achternaam;
        this.straatnaam = straatnaam;
        //setWachtwoord(wachtwoord);
        this.postcode = postcode;
        this.huisnummer = huisnummer;
        this.toevoeging = toevoeging;
        this.land = land;
        this.telefoonnummer = telefoonnummer;
        this.email = email;
        this.ontdekkingWw = ontdekkingWw;
    }

    public Client() {
    }

    public String getLand() {
        return land;
    }

    public void setLand(String land) {
        this.land = land;
    }

    public int getIdClient() {return idClient;}

    public String getInitialen() {return initialen;}

    public String getTussenvoegsel() {return tussenvoegsel;}

    public String getAchternaam() {return achternaam;}

    public String getStraatnaam() {return straatnaam;}

    public String getPostcode() {return postcode;}

    public int getHuisnummer() {return huisnummer;}

    public int getTelefoonnummer() {return telefoonnummer;}

    public String getToevoeging() {return toevoeging;}

    public String getEmail() {return email;}

    public int getOntdekkingWw() {return ontdekkingWw;}

    //SetStuff

    public void setInitialen(String initialen) {this.initialen = initialen;}

    public void setTussenvoegsel(String tussenvoegsel) {this.tussenvoegsel = tussenvoegsel;}

    public void setAchternaam(String achternaam) {this.achternaam = achternaam;}

    public void setStraatnaam(String straatnaam) {this.straatnaam = straatnaam;}

    public void setPostcode(String postcode) {this.postcode = postcode;}

    public void setHuisnummer(int huisnummer) {this.huisnummer = huisnummer;}

    public void setTelefoonnummer(int telefoonnummer) {this.telefoonnummer = telefoonnummer;}

    public void setToevoeging(String toevoeging) {this.toevoeging = toevoeging;}

    public void setEmail(String email) {this.email = email;}

    public void setOntdekkingWw(int ontdekkingWw) {this.ontdekkingWw = ontdekkingWw;}




//    public void setWachtwoord(String wachtwoord) {
//        this.wachtwoord = Security.getHashedPassword(wachtwoord, tussenvoegsel);
//        if (this.wachtwoord == null){
//            //TODO geef een error hier!
//        }
//        this.wachtwoord = wachtwoord;
//
//    }

    //public boolean isSuperUser() {
//        return superUser;
//    }

//    public void setSuperUser(boolean superUser) {
//        this.superUser = superUser;
//    }
//
//}

}
