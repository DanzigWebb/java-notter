import com.sun.net.httpserver.HttpServer;
import handlers.TestHttpHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {

    public static void main(String... args) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress("localhost", 8002), 0);

            server.createContext("/", new TestHttpHandler());
            server.setExecutor(null);
            server.start();
            System.out.println(" Server started on port 8001");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
