package Wetwinkel.resources;

import Wetwinkel.Objects.Client;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Secured
@Path("/userOverview")
public class userOverviewResource {

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
       public List<Client> getClients() {

        return RepositoryService.getInstance().getClients();
    }

}
