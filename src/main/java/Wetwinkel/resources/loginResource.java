package Wetwinkel.resources;

import Wetwinkel.Objects.Credentials;
import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;
import Wetwinkel.util.Security;
import io.jsonwebtoken.Jwts;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Path("/login")
public class loginResource {
    private final int KEY_LIFETIME_HOURS = 4;


    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login (Credentials credentials){
        try{
            authenticate(credentials.getEmail(), credentials.getWachtwoord());

            String token = issueToken(credentials.getEmail());

            return Response.ok(token).build();
        } catch (Exception e){
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    private void authenticate(String email, String password) throws Exception {
        User user;
        user = RepositoryService.getInstance().getUser(email, password);
        if (user == null) throw new Exception("login failed");
    }

    private String issueToken(String email) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.HOUR_OF_DAY, KEY_LIFETIME_HOURS);

        Date expirationDate = cal.getTime();

        return Jwts.builder().setSubject(email).setExpiration(expirationDate).signWith(Security.getKey()).compact();
    }
}

