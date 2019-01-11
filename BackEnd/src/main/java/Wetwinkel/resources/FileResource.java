package Wetwinkel.resources;

import Wetwinkel.util.Secured;
import com.google.gson.Gson;
import org.glassfish.jersey.media.multipart.*;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Resource for files. Accessible with the following url: http://localhost:8080/wetwinkel_war/rest/file.
 * For information about the secured tag see the javadoc of the Secured interface.
 */
@Secured
@Path("/file")
public class FileResource {
    /**
     * The path to the folder where we want to store the uploaded files
     */
    private static final String UPLOAD_FOLDER = "../files/cases/";

    public FileResource() {
    }

    @Context
    private UriInfo context;

    /**
     * Handles http requests for uploading files. Also checking if the request is right otherwise returning an error.
     *
     * @return error response in case of missing parameters an internal
     * exception or success response if files have been stored
     * successfully
     */
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFiles(
            @FormDataParam("idCase") int caseId,
            @FormDataParam("files") List<FormDataBodyPart> bodyParts,
            @FormDataParam("files") FormDataContentDisposition fileDispositions
    ) {

        for (FormDataBodyPart bodyPart : bodyParts) {
            /*
             * Casting FormDataBodyPart to BodyPartEntity, which can give us
             * InputStream for uploaded file
             */
            BodyPartEntity bodyPartEntity = (BodyPartEntity) bodyPart.getEntity();
            ContentDisposition fileDetail = bodyPart.getContentDisposition();
            InputStream uploadedInputStream = bodyPartEntity.getInputStream();

            String destFolder;
            System.out.println("saving file");

            // check if all form parameters are provided
            if (uploadedInputStream == null || fileDetail == null)
                return Response.status(400).entity("Invalid form data").build();

            // create our destination folder, if it not exists
            try {
                destFolder = createFolderIfNotExists(UPLOAD_FOLDER + caseId);
            } catch (SecurityException se) {
                return Response.status(500)
                        .entity("Can not create destination folder on server")
                        .build();
            }

            String uploadedFileLocation = destFolder + "/" + fileDetail.getFileName();
            try {
                saveToFile(uploadedInputStream, uploadedFileLocation);
            } catch (IOException e) {
                e.printStackTrace();
                return Response.status(500).entity("Can not save file").build();
            }


        }

        return Response.ok().build();

    }

    /**
     * Utility method to save InputStream data to target location/file
     *
     * @param inStream InputStream to be saved
     * @param target   full path to destination file
     */
    private void saveToFile(InputStream inStream, String target)
            throws IOException {
        OutputStream out;
        int read;
        byte[] bytes = new byte[1024];

        out = new FileOutputStream(new File(target));
        while ((read = inStream.read(bytes)) != -1) {
            out.write(bytes, 0, read);
        }
        out.flush();
        out.close();
    }

    /**
     * Creates a folder to desired location if it not already exists
     *
     * @param dirName full path to the folder
     * @throws SecurityException in case you don't have permission to create the folder
     */
    private String createFolderIfNotExists(String dirName)
            throws SecurityException {
        File theDir = new File(dirName);
        if (!theDir.exists() && theDir.mkdirs()) {
            //do nothing, Folder is created.
        }
        if (theDir.isDirectory()) {
            return theDir.getPath();
        }
        return null;
    }

    /**
     * Generates a list with all the names of the files inside the directory corresponding to the specified case.
     *
     * @param idCase The id of the case which the filenames need to be returned.
     * @return A success response with a json representation of the generated list
     */
    @GET
    @Path("/{idCase}")
    public Response listFilesAndFolders(@PathParam("idCase") int idCase) {

        String directoryName = UPLOAD_FOLDER + "/" + idCase;

        File directory = new File(directoryName);


        //get all the files from a directory

        File[] fList = directory.listFiles();
        List<String> nameList = new ArrayList<>();


        for (File file : fList) {
            nameList.add(file.getName());
        }
        String json = new Gson().toJson(nameList);

        return Response.ok(json).build();

    }

    /**
     * Deletes file from server
     *
     * @param caseId   The id of the case of which a file needs to be deleted
     * @param fileName The name of the file that needs to be deleted
     * @return An error if the file is not deleted (response 409) or an success response.
     */
    @DELETE
    @Path("/{caseId}/{fileName}")
    public Response deleteFile(@PathParam("caseId") int caseId, @PathParam("fileName") String fileName) {
        String filePath = UPLOAD_FOLDER + "/" + caseId + "/" + fileName;

        File file = new File(filePath);

        if (file.delete()) {
            return Response.ok().build();
        } else {
            return Response.status(409).build();
        }
    }

    /**
     * A method to download a file at the client side.
     *
     * @param caseId   The id of the case of where the file which needs to be downloaded is allocated to.
     * @param fileName The name of the file that needs to be downloaded.
     * @return An octetStream representation of the file that needs to be downloaded.
     */
    @Path("/{caseId}/{fileName}")
    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getFile(@PathParam("caseId") int caseId, @PathParam("fileName") String fileName) {
        String filePath = UPLOAD_FOLDER + "/" + caseId + "/" + fileName;

        File file = new File(filePath);

        return Response.ok(file).build();
    }
}
