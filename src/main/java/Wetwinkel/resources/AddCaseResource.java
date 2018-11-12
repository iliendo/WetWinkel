package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
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
    public Case addClient(Case cases){
        RepositoryService.getInstance().addCase(cases);
        return cases;
    }

    @GET
    public Response openCasePage() throws URISyntaxException {
        URI uri = new URI("http://localhost:8080/wetwinkel_war/addCase.html");
        return Response.temporaryRedirect(uri).build();
    }
}
