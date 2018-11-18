package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/casesOverview")
@Secured
public class casesOverviewResource {

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Case> getCases() {

        return RepositoryService.getInstance().getCases();
    }

    @GET
    @Path("/openablecases")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOpenableCases() {
        String email = securityContext.getUserPrincipal().getName();
        User user = RepositoryService.getInstance().getUserFromMail(email);

        if (user != null) {
            return Response.ok(user.getCases()).build();
        } else {
            return Response.noContent().build();
        }
    }
    @GET
    @Path("/case/{idCase}")
    @Produces(MediaType.APPLICATION_JSON )
    public Case getCase(@PathParam("idCase") int idCase) {

        return RepositoryService.getInstance().getCaseById(idCase);
    }

    @POST
    @Path("/updatecase/{idCase}{feiten}{advies}")
    public Case updateCase(@PathParam("idCase") int idCase,@PathParam("feiten") String feiten,@PathParam("advies") String advies) {

        return RepositoryService.getInstance().updateCaseById(idCase, feiten, advies);
    }



}
