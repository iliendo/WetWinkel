package Wetwinkel.resources;

import Wetwinkel.objects.Client;
import Wetwinkel.service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;

@Secured
@Path("/client")
public class ClientResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Client addClient(Client client) {
        RepositoryService.getInstance().addObject(client);
        return client;
    }

    @GET
    public Response openClientPage() throws URISyntaxException {
        URI uri = new URI("client.html");
        return Response.ok(uri).build();
    }
}
