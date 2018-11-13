package Wetwinkel.util;

import Wetwinkel.Objects.User;
import Wetwinkel.Service.RepositoryService;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.IOException;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.lang.reflect.AnnotatedElement;
import java.lang.reflect.Method;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Secured
@Provider
@Priority(Priorities.AUTHORIZATION)
public class AuthorizationFilter implements ContainerRequestFilter {

    private static final String AUTHENTICATION_SCHEME = "Bearer";

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        final SecurityContext currentSecurityContext = requestContext.getSecurityContext();


        String token = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION).substring(AUTHENTICATION_SCHEME.length()).trim();


        requestContext.setSecurityContext(new SecurityContext() {

            @Override
            public Principal getUserPrincipal() {
                String email = Jwts.parser().setSigningKey(Security.getKey()).parseClaimsJws(token).getBody().getSubject();
                return () -> email;
            }

            @Override
            public boolean isUserInRole(String role) {
                return true;
            }

            @Override
            public boolean isSecure() {
                return currentSecurityContext.isSecure();
            }

            @Override
            public String getAuthenticationScheme() {
                return AUTHENTICATION_SCHEME;
            }
        });

        // Get the resource class which matches with the requested URL
        // Extract the roles declared by it
        Class<?> resourceClass = resourceInfo.getResourceClass();
        List<Role> classRoles = extractRoles(resourceClass);

        // Get the resource method which matches with the requested URL
        // Extract the roles declared by it
        Method resourceMethod = resourceInfo.getResourceMethod();
        List<Role> methodRoles = extractRoles(resourceMethod);
        List<Role> allRoles = new ArrayList<>();
        allRoles.add(Role.NORMAL_USER);
        allRoles.add(Role.SUPER_USER);

        try {

            // Check if the user is allowed to execute the method
            // The method annotations override the class annotations
            if (classRoles.isEmpty()) {
                //all users accepted
                checkPermissions(allRoles, token);
            } else if (methodRoles.isEmpty()){
                checkPermissions(classRoles, token);
            } else {
                checkPermissions(methodRoles, token);
            }

        } catch (Exception e) {
            requestContext.abortWith(
                    Response.status(Response.Status.FORBIDDEN).build());
        }
    }

    // Extract the roles from the annotated element
    private List<Role> extractRoles(AnnotatedElement annotatedElement) {
        if (annotatedElement == null) {
            return new ArrayList<>();
        } else {
            Secured secured = annotatedElement.getAnnotation(Secured.class);
            if (secured == null) {
                return new ArrayList<>();
            } else {
                Role[] allowedRoles = secured.value();
                return Arrays.asList(allowedRoles);
            }
        }
    }

    private void checkPermissions(List<Role> allowedRoles, String token) throws Exception {
        // Check if the user contains one of the allowed roles
        // Throw an Exception if the user has not permission to execute the method
        RepositoryService repositoryService = RepositoryService.getInstance();

        String email = Jwts.parser().setSigningKey(Security.getKey()).parseClaimsJws(token).getBody().getSubject();
        User user = repositoryService.getUserFromMail(email);
        Role role;
        if (user.isSuperUser()){
            role = Role.SUPER_USER;
        } else {
            role = Role.NORMAL_USER;
        }

        if (!allowedRoles.contains(role)){
            throw new Exception("You do not have the permissions for this action");
        }

    }
}
