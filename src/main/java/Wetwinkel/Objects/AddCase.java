package Wetwinkel.Objects;

import javax.persistence.*;
import java.sql.Date;

// TODO: Wat doet dit?
@Entity
@Table(name = "case")
public class AddCase {
    // Geeft aan welke variabele de primary key is
    @Id
    // Geeft aan dat de variabele AI moet zijn in de database
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCase;
    private String naam;
    @Column(name = "datum", insertable=false)
    private Date datum;
    private enum rechtsgebied {
        rechtstraf, auto;
    };
    private enum status {
        open, close;
    };
    private String feiten;
    private String advies;
    @Column(name = "laatsteUpdate", insertable=false)
    private Date laatsteUpdate;
    private boolean gearchiveerd;
    private int idClient;

    public AddCase(String naam, Date datum, String feiten, String advies, Date laatsteUpdate, boolean gearchiveerd, int idClient) {
        this.naam = naam;
        this.datum = datum;
        this.feiten = feiten;
        this.advies = advies;
        this.laatsteUpdate = laatsteUpdate;
        this.gearchiveerd = gearchiveerd;
        this.idClient = idClient;
    }

    public AddCase(){
    }

    public int getIdCase() {
        return idCase;
    }

    public void setIdCase(int idCase) {
        this.idCase = idCase;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(String naam) {
        this.naam = naam;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public String getFeiten() {
        return feiten;
    }

    public void setFeiten(String feiten) {
        this.feiten = feiten;
    }

    public String getAdvies() {
        return advies;
    }

    public void setAdvies(String advies) {
        this.advies = advies;
    }

    public Date getLaatsteUpdate() {
        return laatsteUpdate;
    }

    public void setLaatsteUpdate(Date laatsteUpdate) {
        this.laatsteUpdate = laatsteUpdate;
    }

    public boolean isGearchiveerd() {
        return gearchiveerd;
    }

    public void setGearchiveerd(boolean gearchiveerd) {
        this.gearchiveerd = gearchiveerd;
    }

    public int getIdClient() {
        return idClient;
    }

    public void setIdClient(int idClient) {
        this.idClient = idClient;
    }
}
