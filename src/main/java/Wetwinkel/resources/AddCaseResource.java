package Wetwinkel.resources;

import Wetwinkel.Objects.AddCase;
import Wetwinkel.Service.RepositoryService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.net.URISyntaxException;

@Path("/case")
public class AddCaseResource {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public AddCase addClient(AddCase cases){
        RepositoryService.getInstance().addCase(cases);
        return cases;
    }

    @GET
    public Response openClientPage() throws URISyntaxException {
        URI uri = new URI("http://localhost:8080/wetwinkel_war/client.html");
        return Response.temporaryRedirect(uri).build();
    }
}
