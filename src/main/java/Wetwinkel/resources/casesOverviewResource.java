package Wetwinkel.resources;

import Wetwinkel.Objects.Case;
import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.util.Secured;

import javax.print.attribute.standard.Media;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
    public List<Case> getCase() {

        return RepositoryService.getInstance().getCase();
    }

    @GET
    @Path("/henkIsGroot")
    public Case getCaseById(int idCase) {
        return RepositoryService.getInstance().getCaseById(idCase);
    }

    @GET
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserID() {

        String email = securityContext.getUserPrincipal().getName();

        User user = RepositoryService.getInstance().getUserFromMail(email);

        if (user != null) {
            System.out.println(user.getCases());
            return Response.ok(user.getCases()).build();
        } else {
            return Response.ok(email).build();
        }
    }

}
