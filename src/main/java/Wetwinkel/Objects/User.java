package Wetwinkel.Objects;


import Wetwinkel.util.Security;

import javax.persistence.*;
import java.util.List;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "User.Login", query = "SELECT u FROM User u WHERE email = :email AND wachtwoord = :wachtwoord"),
        @NamedQuery(name = "User.Get", query= "SELECT u FROM User u WHERE email = :email"),
        @NamedQuery(name = "UserList.Get", query= "SELECT u FROM User u")
})
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idUser;
    private String naam;
    private String email;
    private String tussenvoegsel;
    private String achternaam;
    private String wachtwoord;
    private boolean superUser;

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users")
    private List<Case> cases;

    public User(String naam, String email, String tussenvoegsel, String achternaam, String wachtwoord, boolean superUser, List<Case> cases) {
        this.naam = naam;
        this.email = email;
        this.tussenvoegsel = tussenvoegsel;
        this.achternaam = achternaam;
        this.wachtwoord = wachtwoord;
        this.superUser = superUser;
        this.cases = cases;
    }

    public User() {
    }

    public int getIdUser() {
        return idUser;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTussenvoegsel() {
        return tussenvoegsel;
    }

    public void setTussenvoegsel(String tussenvoegsel) {
        this.tussenvoegsel = tussenvoegsel;
    }

    public String getAchternaam() {
        return achternaam;
    }

    public void setAchternaam(String achternaam) {
        this.achternaam = achternaam;
    }

    public String getWachtwoord() {
        return wachtwoord;
    }

    public void setWachtwoord(String wachtwoord) {
        this.wachtwoord = Security.getHashedPassword(email, wachtwoord);
        if (this.wachtwoord == null){
            //TODO geef een error hier!
        }

    }

    public List<Case> getCases() {
        return cases;
    }

    public void setCases(List<Case> cases) {
        this.cases = cases;
    }

    public boolean isSuperUser() {
        return superUser;
    }

    public void setSuperUser(boolean superUser) {
        this.superUser = superUser;
    }

}
