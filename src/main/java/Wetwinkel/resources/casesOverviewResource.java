package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/casesOverview")
public class casesOverviewResource {

    @GET
    @Path("/cases")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Case> getCases() {

        return RepositoryService.getInstance().getCases();
    }
    @GET
    @Path("case/{idCase}")
    @Produces(MediaType.APPLICATION_JSON )
    public Case getCase(@PathParam("idCase") int idCase) {

        return RepositoryService.getInstance().getCase(idCase);
    }
    @GET
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON )
    public User getUser() {

        return RepositoryService.getInstance().getUserVoorCase();
    }



}
