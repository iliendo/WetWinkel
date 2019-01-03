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
import java.util.List;


@Path("/file")
public class FileResource {
    /** The path to the folder where we want to store the uploaded files */
    private static final String UPLOAD_FOLDER = "../files/cases/";

    public FileResource() {
    }

    @Context
    private UriInfo context;

    /**
     * Returns text response to caller containing uploaded file location
     *
     * @return error response in case of missing parameters an internal
     *         exception or success response if file has been stored
     *         successfully
     */
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(
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
                return Response.status(500).entity("Can not save file").build();
            }


        }

        return Response.ok().build();

    }

    /**
     * Utility method to save InputStream data to target location/file
     *
     * @param inStream
     *            - InputStream to be saved
     * @param target
     *            - full path to destination file
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
     * @param dirName
     *            - full path to the folder
     * @throws SecurityException
     *             - in case you don't have permission to create the folder
     */
    private String createFolderIfNotExists(String dirName)
            throws SecurityException {
        System.out.println(dirName);
        File theDir = new File(dirName);
        System.out.println(theDir.getAbsolutePath());
        System.out.println("creating folder");
        if (!theDir.exists()) {
            boolean dirCreated = theDir.mkdirs();
            System.out.println(dirCreated);
        }
        if (theDir.isDirectory()){
            return  theDir.getPath();
        } else {
            return null;
        }
    }
}
