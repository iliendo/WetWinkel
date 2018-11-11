package Wetwinkel.Objects;

import org.w3c.dom.Text;

import javax.persistence.*;
import javax.xml.crypto.Data;
import java.util.Date;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Case.Get", query = "SELECT b FROM Case b"),

})


@Table(name = "suit")
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCase;
    private String naam;
    private Date datum;
    private enum rechtsgebied {
        rechtstraf,
        auto
    };
    private enum status {
        open,
        close
    };
    private String feiten;
    private String advies;
    private Date laatsteUpdate;
    private Boolean gearchiveerd;
    private int idClient;

    public Case(String naam, Date datum, String feiten, String advies, Date laatsteUpdate, Boolean gearchiveerd, int idClient) {
        this.naam = naam;
        this.datum = datum;
        this.feiten = feiten;
        this.advies = advies;
        this.laatsteUpdate = laatsteUpdate;
        this.gearchiveerd = gearchiveerd;
        this.idClient = idClient;
    }

    public Case() {
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

    public Boolean getGearchiveerd() {
        return gearchiveerd;
    }

    public void setGearchiveerd(Boolean gearchiveerd) {
        this.gearchiveerd = gearchiveerd;
    }

    public int getIdClient() {
        return idClient;
    }

    public void setIdClient(int idClient) {
        this.idClient = idClient;
    }
}