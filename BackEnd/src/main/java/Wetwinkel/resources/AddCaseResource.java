package Wetwinkel.resources;

import Wetwinkel.objects.Case;
import Wetwinkel.objects.Client;
import Wetwinkel.objects.User;
import Wetwinkel.service.RepositoryService;
import Wetwinkel.reference.Jurisdiction;
import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
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
        for (int userId : userIds) {
            User user = repInstance.getUserFromID(userId);
            user.addCase(suit);
            repInstance.editObject(user);
        }
        return suit;
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

        List<String> jusrisdictionDutch = new ArrayList<>();
        List<Jurisdiction> jurisdictionList = Arrays.asList(Jurisdiction.values());

        jurisdictionList.forEach(jurisdiction -> jusrisdictionDutch.add(jurisdiction.getDutch()));

        String json1 = new Gson().toJson(jusrisdictionDutch);
        String json2 = new Gson().toJson(jurisdictionList);
        String json = json1 + "-" + json2;

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
