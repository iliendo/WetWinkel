package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.Client;
import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.reference.Rechtsgebied;
import Wetwinkel.util.Security;
import com.google.gson.Gson;

import javax.faces.annotation.RequestParameterMap;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

@Path("/case")
public class AddCaseResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Case addCase(Case suit, @QueryParam("userIds") List<Integer> userIds) {
        RepositoryService repInstance = RepositoryService.getInstance();
        repInstance.addObject(suit);
        for (int userId: userIds) {
            User user = repInstance.getUserFromID(userId);
            user.addCase(suit);
            repInstance.editObject(user);
        }
        return suit;
    }

    @GET
    public Response openCasePage() throws URISyntaxException {
        URI uri = new URI("http://localhost:8080/wetwinkel_war/addObject.html"); //TODO change when server goes live
        return Response.temporaryRedirect(uri).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/clients")
    public Response getClients() {
        List<Client> clients = RepositoryService.getInstance().getListOfCllients();

        if (!clients.isEmpty()) {
            return Response.ok(clients).build();
        } else {
            return Response.noContent().build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/jurisdictie")
    public Response getJurisdictie() {
        List<Rechtsgebied> rechtsgebied = Arrays.asList(Rechtsgebied.values());
        String json = new Gson().toJson(rechtsgebied);

        return Response.ok(json).build();

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/users")
    public Response getUsers() {
        List<User> users = RepositoryService.getInstance().getListOfUsers();

        if (!users.isEmpty()) {
            return Response.ok(users).build();
        } else {
            return Response.noContent().build();
        }
    }
}
