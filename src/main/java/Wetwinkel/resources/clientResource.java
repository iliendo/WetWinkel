package Wetwinkel.resources;

import Wetwinkel.Objects.Client;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;

@Path("/client")
public class clientResource {

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Client addClient(Client client){
        System.out.println("adding");
        RepositoryService.getInstance().addClient(client);
        return client;
    }

    @GET
    public Response openClientPage() throws URISyntaxException {
        System.out.println("trying to go to page");
        URI uri = new URI("http://localhost:8080/wetwinkel_war/client.html");
        return Response.temporaryRedirect(uri).build();
    }
}
