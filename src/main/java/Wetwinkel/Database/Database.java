
package Wetwinkel.Database;


import javax.ejb.Stateless;


@javax.annotation.sql.DataSourceDefinition(
        name = "java:comp/env/jdbc/wetwinkelDb",
        className = "com.mysql.cj.jdbc.MysqlXADataSource",
        url = "jdbc:mysql://145.92.203.241:3306/ztourakm0011",
        user = "tourakm",
        password = "FBJFf4sFjV3Wg3")
@Stateless
public class Database {

}
