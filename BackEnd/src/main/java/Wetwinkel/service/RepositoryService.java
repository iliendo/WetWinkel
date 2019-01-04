package Wetwinkel.service;

import Wetwinkel.objects.Case;
import Wetwinkel.objects.User;
import Wetwinkel.objects.Client;

import javax.persistence.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

    public <T> void addObject(T object) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(object);
        em.getTransaction().commit();

        em.close();
    }

    public <T> void editObject(T object) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.merge(object);
        em.getTransaction().commit();
        em.close();
    }

    public List<Client> getListOfCllients() {
        EntityManager em = getEntityManager();

        List<Client> clients = em.createNamedQuery("Client.Get", Client.class).getResultList();
        em.close();

        return clients;
    }

    public List<User> getListOfUsers() {
        EntityManager em = getEntityManager();

        List<User> users = em.createNamedQuery("UserList.Get", User.class).getResultList();

        em.close();

        return users;
    }

    public Response deleteUser(User user, boolean force) {
        EntityManager em = getEntityManager();
        Response r;
        em.getTransaction().begin();

        if (user == null) {
            r = Response.status(Response.Status.NOT_FOUND).entity("User does not exist").build();
        } else {
            if(!force && !user.getCases().isEmpty()){
                r = Response.status(409).entity("This user still has cases on his name.").build();
            } else {
                if(force){
                    Query query = em.createNativeQuery("DELETE FROM users_suit WHERE idUser = ?");
                    query.setParameter(1, user.getIdUser());
                    query.executeUpdate();
                }
                em.remove(em.contains(user) ? user : em.merge(user));
                r = Response.status(Response.Status.OK).entity("Deleted").build();
            }
        }
        em.getTransaction().commit();
        em.close();
        return r;
    }

    public User login(String email, String password) {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Login", User.class);
        query.setParameter("email", email);
        query.setParameter("wachtwoord", password);
        User result = query.getSingleResult();
        em.close();
        return result;
    }

    public User getUserFromMail(String email) {

        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Get", User.class);
        query.setParameter("email", email);
        User user = query.getSingleResult();
        em.close();

        return user;
    }

    public User getUserFromID(int ID) {
        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<User> query = em.createNamedQuery("User.Id", User.class);
        query.setParameter("id", ID);
        User user = query.getSingleResult();
        em.close();

        return user;
    }

    public List<Case> getCases() {
        EntityManager em = entityManagerFactory.createEntityManager();

        List<Case> caseList = em.createNamedQuery("Case.Get", Case.class).getResultList();
        em.close();

        return caseList;
    }

    public Case getCaseById(int idCase) {
        EntityManager em = entityManagerFactory.createEntityManager();

        TypedQuery<Case> query = em.createNamedQuery("Case.idGet", Case.class);
        query.setParameter("idCase", idCase);

        return query.getSingleResult();
    }

}
