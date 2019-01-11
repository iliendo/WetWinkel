package Wetwinkel.config;


import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/rest")
public class App extends ResourceConfig {


    public App() {
        packages("Wetwinkel.util", "Wetwinkel.resources");
        register(MultiPartFeature.class);
    }


}
