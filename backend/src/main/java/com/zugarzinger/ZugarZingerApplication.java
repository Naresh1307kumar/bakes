package com.zugarzinger;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class ZugarZingerApplication {

    private static final int PORT = 8080;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // API endpoints
        server.createContext("/api/health", new CorsHandler(new HealthHandler()));
        server.createContext("/api/products", new CorsHandler(new ProductsHandler()));
        server.createContext("/api/offers", new CorsHandler(new OffersHandler()));

        server.setExecutor(null); // default executor
        System.out.println("==================================================");
        System.out.println("  Zugar Zinger Java Backend Server Running!");
        System.out.println("  Port: http://localhost:" + PORT);
        System.out.println("  Health: http://localhost:" + PORT + "/api/health");
        System.out.println("  Products: http://localhost:" + PORT + "/api/products");
        System.out.println("==================================================");
        server.start();
    }

    // CORS wrapper for React frontend requests
    static class CorsHandler implements HttpHandler {
        private final HttpHandler next;

        public CorsHandler(HttpHandler next) {
            this.next = next;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");

            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            next.handle(exchange);
        }
    }

    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = "{\"status\":\"UP\",\"message\":\"Zugar Zinger Backend is live\"}";
            sendJsonResponse(exchange, 200, response);
        }
    }

    static class ProductsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = """
                [
                  {"id":1, "name":"Classic Brownie", "price":400, "weight":"1/2 KG", "description":"Rich cocoa base with signature cracked crust."},
                  {"id":2, "name":"Nutella Brownie", "price":450, "weight":"1/2 KG", "description":"Swirled generously with creamy hazelnut Nutella."},
                  {"id":3, "name":"Fudgy Brownie", "price":450, "weight":"1/2 KG", "description":"Melt-in-your-mouth dense chocolate indulgence."},
                  {"id":4, "name":"Nutty Brownie", "price":500, "weight":"1/2 KG", "description":"Loaded with premium roasted walnuts and cashew crunch."}
                ]
                """;
            sendJsonResponse(exchange, 200, response);
        }
    }

    static class OffersHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = """
                [
                  {"id":1, "title":"5% Discount", "condition":"Orders above 5 boxes"},
                  {"id":2, "title":"10% Discount", "condition":"Orders above 10 boxes"},
                  {"id":3, "title":"10% Loyalty Offer", "condition":"For all existing customers"}
                ]
                """;
            sendJsonResponse(exchange, 200, response);
        }
    }

    private static void sendJsonResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        byte[] bytes = response.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
