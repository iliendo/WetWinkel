package Wetwinkel.Service;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.User;
import Wetwinkel.Objects.Client;

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
    private Map<Integer, Case> elementsCase;


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

    String emailA;

    public User getUser(String email, String password) {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Login", User.class);
        query.setParameter("email", email);
        query.setParameter("wachtwoord", password);
        emailA = email;
        return query.getSingleResult();
    }

    public User getUserVoorCase() {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("UserCase.Get", User.class);
        query.setParameter("email", emailA);

        return query.getSingleResult();
    }

    public User getUserFromMail(String email) {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Get", User.class);
        query.setParameter("email", email);

        return query.getSingleResult();
    }

    public Case addCase(Case addCase) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(addCase);
        em.getTransaction().commit();

        em.close();
        return addCase;
    }

    public List<Case> getCases() {
        EntityManager em = entityManagerFactory.createEntityManager();

        List<Case> caseList = em.createNamedQuery("Cases.Get", Case.class).getResultList();

        em.close();

        return caseList;
    }

    public Case getCase(int idCase) {
        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<Case> query = em.createNamedQuery("Case.Get", Case.class);
        query.setParameter("idCase", idCase);


        return query.getSingleResult();
    }

    public void check() {
        EntityManager em = entityManagerFactory.createEntityManager();
        User user1 = new User();
        Case case1 = entityManagerFactory
    }




}
