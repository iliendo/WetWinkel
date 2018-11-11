package Wetwinkel.Service;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.User;
import Wetwinkel.Objects.Client;
import Wetwinkel.util.Security;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.persistence.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

public class RepositoryService {

    private EntityManagerFactory entityManagerFactory;

    // A singleton reference
    private static RepositoryService instance;

    // An instance of the service is created and during class initialisation
    static {
        instance = new RepositoryService();
    }

    //  Method to get a reference to the instance (singleton)
    public static RepositoryService getInstance() {
        return instance;
    }

    private Map<Integer, User> elements;
    private Map<Integer, Client> cElements;
    private Map<Integer, Case> caseElements;

    private RepositoryService() {
        entityManagerFactory = Persistence.createEntityManagerFactory("wetwinkelPU");
    }

    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }


    public Client addClient(Client client) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(client);
        em.getTransaction().commit();

        em.close();
        return client;
    }

    public User addUser(User user) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        em.close();
        return user;
    }

    public Response deleteUser(String email) {
        EntityManager em = getEntityManager();
        Response r;
        em.getTransaction().begin();
        User user = em.find(User.class, email);
        if (user == null) {
            r = Response.status(Response.Status.NOT_FOUND).entity("User does not exist").build();
        } else {
            em.remove(user);
            r = Response.status(Response.Status.ACCEPTED).entity("Deleted").build();
        }
        em.getTransaction().commit();
        em.close();
        return r;
    }

    public User getUser(String email, String password) {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Login", User.class);
        query.setParameter("email", email);
        query.setParameter("wachtwoord", password);

        return query.getSingleResult();
    }

    public User getUserFromMail(String email) {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Get", User.class);
        query.setParameter("email", email);

        return query.getSingleResult();
    }

    public List<Case> getCase() {
        EntityManager em = entityManagerFactory.createEntityManager();

       // List<Case> caseList = em.createNamedQuery("Case.Get",Case.class).getResultList();
        List<Case> caseList = em.createQuery("SELECT b FROM Case b").getResultList();
        em.close();

        return caseList;
    }


}
