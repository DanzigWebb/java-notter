package handlers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.json.JSONObject;

import java.io.IOException;
import java.io.OutputStream;


public class TestHttpHandler implements HttpHandler {

    public void handle(HttpExchange exchange) throws IOException {
        JSONObject json = new JSONObject().put("title", "JavaRush");
        String response = json.toString();

        OutputStream outputStream = exchange.getResponseBody();

        exchange.sendResponseHeaders(200, response.length());
        exchange.getResponseHeaders().set("Content-Type", "application/json");

        outputStream.write(response.getBytes());
        outputStream.flush();
        outputStream.close();
    }
}
