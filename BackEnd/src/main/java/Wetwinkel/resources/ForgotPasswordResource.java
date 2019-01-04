package Wetwinkel.resources;

import Wetwinkel.objects.Credentials;
import Wetwinkel.objects.User;
import Wetwinkel.service.RepositoryService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/password")
public class ForgotPasswordResource {
    private User user;

    @POST
    @Path("/reset")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response resetPassword(Credentials credentials) {
        try {
            authenticate(credentials.getEmail());

            return Response.ok(user.getEmail()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    private void authenticate(String email) throws Exception {
        user = RepositoryService.getInstance().getUserFromMail(email);
        if (user == null) throw new Exception("User does not exist");
    }

}
