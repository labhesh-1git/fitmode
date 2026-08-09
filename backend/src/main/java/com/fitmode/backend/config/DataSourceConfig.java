package com.fitmode.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        String mysqlUrl = System.getenv("MYSQL_URL");
        if (mysqlUrl == null) {
            mysqlUrl = System.getenv("MYSQLURL");
        }

        String jdbcUrl = null;
        String username = System.getenv("MYSQLUSER");
        String password = System.getenv("MYSQLPASSWORD");

        if (mysqlUrl != null && !mysqlUrl.isEmpty()) {
            if (mysqlUrl.contains(".internal")) {
                throw new RuntimeException("CRITICAL ERROR: You are using Railway's private connection URL (contains '.internal') on Render. Render is outside Railway and MUST connect using Railway's public connection URL (e.g., mysql://root:password@junction.proxy.rlwy.net:12345/railway). Please update the MYSQL_URL variable in your Render dashboard!");
            }

            // Convert mysql:// to jdbc:mysql://
            if (mysqlUrl.startsWith("mysql://")) {
                jdbcUrl = "jdbc:" + mysqlUrl;
            } else {
                jdbcUrl = mysqlUrl;
            }

            // Parse mysql://user:pass@host:port/db if credentials aren't already set separately
            if (jdbcUrl.contains("@") && (username == null || username.isEmpty())) {
                try {
                    String cleanUrl = jdbcUrl.replace("jdbc:mysql://", "");
                    String credentialsPart = cleanUrl.substring(0, cleanUrl.indexOf("@"));
                    String[] creds = credentialsPart.split(":");
                    username = creds[0];
                    if (creds.length > 1) {
                        password = creds[1];
                    }
                    String hostDbPart = cleanUrl.substring(cleanUrl.indexOf("@") + 1);
                    jdbcUrl = "jdbc:mysql://" + hostDbPart;
                } catch (Exception e) {
                    System.err.println("Failed parsing credentials from MYSQL_URL: " + e.getMessage());
                }
            }
        } else {
            String host = System.getenv("MYSQLHOST");
            if (host != null && host.contains(".internal")) {
                throw new RuntimeException("CRITICAL ERROR: You are using Railway's private host ('mysql.railway.internal') on Render. Render is outside Railway and MUST connect using Railway's public host (e.g., 'junction.proxy.rlwy.net'). Please update the MYSQLHOST variable in your Render dashboard!");
            }
            if (host == null || host.isEmpty()) {
                host = "localhost";
            }
            String port = System.getenv("MYSQLPORT") != null ? System.getenv("MYSQLPORT") : "3306";
            String db = System.getenv("MYSQLDATABASE") != null ? System.getenv("MYSQLDATABASE") : "fitmode";
            jdbcUrl = "jdbc:mysql://" + host + ":" + port + "/" + db;
        }

        // Add standard connection parameters for driver compatibility
        if (!jdbcUrl.contains("?")) {
            jdbcUrl += "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        } else if (!jdbcUrl.contains("useSSL")) {
            jdbcUrl += "&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
        }

        if (username == null || username.isEmpty()) {
            username = "root";
        }
        if (password == null || password.isEmpty()) {
            password = "ilovecats";
        }

        return DataSourceBuilder.create()
                .url(jdbcUrl)
                .username(username)
                .password(password)
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
