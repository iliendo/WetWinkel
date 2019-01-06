package Wetwinkel.resources;

import Wetwinkel.objects.Credentials;
import Wetwinkel.objects.User;
import Wetwinkel.service.RepositoryService;
import Wetwinkel.util.Role;
import Wetwinkel.util.Secured;
import Wetwinkel.util.Security;
import io.jsonwebtoken.Jwts;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Path("/user")
public class UserResource {
    private final int KEY_LIFETIME_HOURS = 4;
    private User user;

    @POST
    @Path("/cred")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(Credentials credentials) {
        try {
            if (credentials.getWachtwoord() == null) {
                authenticate(credentials.getEmail(), null);
            } else {
                authenticate(credentials.getEmail(), credentials.getWachtwoord());
            }


            String token = issueToken(credentials.getEmail());
            boolean superUser = user.isSuperUser();

            return Response.ok(token + "," + superUser + "," + user.isNieuw() + "," + user.getIdUser()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    private void authenticate(String email, String password) throws Exception {
        if (password == null) {
            user = RepositoryService.getInstance().getUserFromMail(email);
        } else {
            password = Security.getHashedPassword(email, password);
            user = RepositoryService.getInstance().login(email, password);
        }
        if (user == null) throw new Exception("login failed");
    }

    private String issueToken(String email) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.HOUR_OF_DAY, KEY_LIFETIME_HOURS);

        Date expirationDate = cal.getTime();

        return Jwts.builder().setSubject(email).setExpiration(expirationDate).signWith(Security.getKey()).compact();
    }

    @POST
    @Secured(Role.SUPER_USER)
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addUser(User user) {
        try {
            System.out.println("add user: " + user.getWachtwoord());
            RepositoryService repInstance = RepositoryService.getInstance();
            repInstance.addObject(user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @PUT
    @Secured(Role.SUPER_USER)
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUser(User changes) {
        try {
            System.out.println("editting user");
            RepositoryService repInstance = RepositoryService.getInstance();
            User user = repInstance.getUserFromID(changes.getIdUser());
            user.setAchternaam(changes.getAchternaam());
            user.setNaam(changes.getNaam());
            user.setTussenvoegsel(changes.getTussenvoegsel());
            user.setEmail(changes.getEmail());
            user.setSuperUser(changes.isSuperUser());
            repInstance.editObject(user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @PUT
    @Path("/password")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response changePassword(User change) {
        try {
            RepositoryService repInstance = RepositoryService.getInstance();
            User user = repInstance.getUserFromMail(change.getEmail());
            user.setWachtwoordWithoutHash(change.getWachtwoord());
            user.setNieuw(false);
            repInstance.editObject(user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @GET
    @Secured(Role.SUPER_USER)
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return RepositoryService.getInstance().getListOfUsers();
    }

    @GET
    @Path("/{idUser}")
    @Secured
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@PathParam("idUser") int idUser) {
        return RepositoryService.getInstance().getUserFromID(idUser);
    }

    @DELETE
    @Secured(Role.SUPER_USER)
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteUser() {

    }

    @PUT
    @Path("/postReset")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public void postResetCode(User user) {
        User checkUser = user;

        User updateUser = RepositoryService.getInstance().getUserFromMail(checkUser.getEmail());
        updateUser.setResetCode(checkUser.getResetCode());

        RepositoryService.getInstance().editObject(updateUser);

    }

    @GET
    @Path("/getcode")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCode(@QueryParam("email") String email) {
        String code = RepositoryService.getInstance().getCodeFromMail(email);
        return Response.ok(code).build();
    }
}

