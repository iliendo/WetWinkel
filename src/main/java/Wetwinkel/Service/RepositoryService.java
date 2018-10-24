package Wetwinkel.Service;

import Wetwinkel.Objects.User;
import Wetwinkel.util.Security;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.core.Response;
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

    private RepositoryService() {
        entityManagerFactory = Persistence.createEntityManagerFactory("wetwinkelPU");
    }

    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
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

        String sql = "SELECT * FROM users WHERE email = ? AND wachtwoord = ?";
        Query statement = em.createNativeQuery(sql);

        String hashedPassword = Security.getHashedPassword(password, email);
        statement.setParameter(1, email);
        statement.setParameter(2, password);

        Object result = statement.getSingleResult();
        if (result instanceof User) {
            return (User) result;
        } else {
            return null;
        }
    }



}
