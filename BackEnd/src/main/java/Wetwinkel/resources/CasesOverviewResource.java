package Wetwinkel.resources;

import Wetwinkel.objects.Case;
import Wetwinkel.objects.User;
import Wetwinkel.service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;

@Path("/casesOverview")
@Secured
public class CasesOverviewResource {

    @Context
    SecurityContext securityContext;

    @GET
    public Response openClientPage() throws URISyntaxException {
        URI uri = new URI("cases.html");
        return Response.ok(uri).build();
    }

    @GET
    @Path("/allcases")
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
            if (user.isSuperUser()) {
                return Response.ok(RepositoryService.getInstance().getCases()).build();
            } else {
                return Response.ok(user.getCases()).build();
            }
        } else {
            return Response.noContent().build();
        }
    }

    @GET
    @Path("/case/{idCase}")
    @Produces(MediaType.APPLICATION_JSON)
    public Case getCase(@PathParam("idCase") int idCase) {

        return RepositoryService.getInstance().getCaseById(idCase);
    }

    @PUT
    @Path("/updatecase/{idCase}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateCase(@PathParam("idCase") int idCase, Case suit) {

        Date date = new Date();

        Case updateSuit = RepositoryService.getInstance().getCaseById(idCase);
        updateSuit.setFeiten(suit.getFeiten());
        updateSuit.setAdvies(suit.getAdvies());
        updateSuit.setLaatsteUpdate(date);

        RepositoryService.getInstance().editObject(updateSuit);
    }


}
