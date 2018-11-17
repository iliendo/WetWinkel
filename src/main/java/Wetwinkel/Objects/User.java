package Wetwinkel.Objects;


import Wetwinkel.util.Security;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "User.Login", query = "SELECT u FROM User u WHERE email = :email AND wachtwoord = :wachtwoord"),
        @NamedQuery(name = "User.Get", query = "SELECT u FROM User u WHERE u.email = :email"),
        @NamedQuery(name = "UserList.Get", query = "SELECT u FROM User u")
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

    //    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "users")

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "users_suit",
            joinColumns = {@JoinColumn(name = "idUser")},
            inverseJoinColumns = {@JoinColumn(name = "idCase")}
    )
    private Set<Case> cases = new HashSet<>();

    public User(String naam, String email, String tussenvoegsel, String achternaam, String wachtwoord, boolean superUser) {
        this.naam = naam;
        this.email = email;
        this.tussenvoegsel = tussenvoegsel;
        this.achternaam = achternaam;
        this.wachtwoord = wachtwoord;
        this.superUser = superUser;
//        this.cases = cases;
    }

    public User() {
    }

    @ManyToMany(mappedBy = "userOnTheCase")
    public List<Case> caseToWorkOn = new ArrayList<>();

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public List<Case> getCaseToWorkOn() {
        return caseToWorkOn;
    }

    public void setCaseToWorkOn(List<Case> caseToWorkOn) {
        this.caseToWorkOn = caseToWorkOn;
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
        if (this.wachtwoord == null) {
            //TODO geef een error hier!
        }

    }


    public Set<Case> getCases() {
        return cases;
    }

    public void setCases(Set<Case> cases) {
        this.cases = cases;
    }

    public boolean isSuperUser() {
        return superUser;
    }

    public void setSuperUser(boolean superUser) {
        this.superUser = superUser;
    }

}
