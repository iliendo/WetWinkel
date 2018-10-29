package Wetwinkel.util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Security {
    private static final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String getHashedPassword(final String wachtwoord, String email) {
        byte[] salt = email.toLowerCase().getBytes();
        try {
            return hashPassword(wachtwoord, salt);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String hashPassword(final String wachtwoord, final byte[] salt) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        md.update(salt);
        byte[] bytes = md.digest(wachtwoord.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte aByte : bytes) {
            sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }

    public static SecretKey getKey() {
        return key;
    }
}
