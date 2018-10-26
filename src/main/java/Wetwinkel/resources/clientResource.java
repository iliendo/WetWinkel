package Wetwinkel.resources;

import Wetwinkel.Objects.Client;
import Wetwinkel.Service.RepositoryService;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/client")
public class clientResource {

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Client addClient(Client client){
        RepositoryService.getInstance().addClient(client);
        return client;
    }
}
