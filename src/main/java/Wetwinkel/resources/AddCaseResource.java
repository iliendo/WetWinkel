package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.Client;
import Wetwinkel.Service.RepositoryService;

import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Path("/case")
public class AddCaseResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Case addClient(Case cases){
        RepositoryService.getInstance().addObject(cases);
        return cases;
    }

    // TODO Get definieeren  met lijst van gegevens
    @GET
    public Response openCasePage() throws URISyntaxException {
        URI uri = new URI("http://localhost:8080/wetwinkel_war/addObject.html"); //TODO change when server goes live
        return Response.temporaryRedirect(uri).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/clients")
    public Response getClients(){
        List<Client> clients = RepositoryService.getInstance().getClients();

        if (!clients.isEmpty()){
            return Response.ok(clients).build();
        } else {
            return Response.noContent().build();
        }
    }
}
