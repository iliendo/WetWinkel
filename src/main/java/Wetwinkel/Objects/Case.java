package Wetwinkel.Objects;

import Wetwinkel.reference.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@NamedQueries(value = {
        @NamedQuery(name = "Case.Get", query = "SELECT b FROM Case b"),
        @NamedQuery(name = "Case.idGet", query = "SELECT b From Case b WHERE idCase = :idCase"),
})


@Table(name = "suit")
public class Case {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCase;
    private String naam;
    @Transient
    private Date datum;

    @Enumerated (EnumType.STRING)
    private Rechtsgebied rechtsgebied;

    @Enumerated (EnumType.STRING)
    private Status status;
    private String feiten;
    private String advies;
    @Transient
    private Date laatsteUpdate;
    private Boolean gearchiveerd;
    private int idClient;

    public Case(String naam, Date datum, Rechtsgebied rechtsgebied, Status status, String feiten, String advies, Date laatsteUpdate, Boolean gearchiveerd, int idClient) {
        this.naam = naam;
        this.datum = datum;
        this.rechtsgebied = rechtsgebied;
        this.status = status;
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

    public Rechtsgebied getRechtsgebied() {
        return rechtsgebied;
    }

    public void setRechtsgebied(Rechtsgebied rechtsgebied) {
        this.rechtsgebied = rechtsgebied;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}