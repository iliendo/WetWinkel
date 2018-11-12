package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Service.RepositoryService;

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
