package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.Client;
import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;


@Path("/userOverview")
public class userOverviewResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
       public List<Case> getCase() {

        return RepositoryService.getInstance().getCase();
    }

}
