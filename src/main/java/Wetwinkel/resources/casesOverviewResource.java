package Wetwinkel.resources;

import Wetwinkel.Objects.CaseM;
import Wetwinkel.Service.RepositoryService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/casesOverview")
public class casesOverviewResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CaseM> getCase() {

        return RepositoryService.getInstance().getCase();
    }

}
