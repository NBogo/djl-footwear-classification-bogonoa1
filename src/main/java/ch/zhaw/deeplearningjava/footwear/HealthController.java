package ch.zhaw.deeplearningjava.footwear;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> info = new HashMap<>();
        info.put("status", "UP");
        info.put("model", "ResNet50 - shoeclassifier");
        info.put("javaVersion", System.getProperty("java.version"));
        info.put("springBootVersion", org.springframework.boot.SpringBootVersion.getVersion());
        info.put("os", System.getProperty("os.name") + " " + System.getProperty("os.arch"));
        info.put("timestamp", java.time.Instant.now().toString());
        return info;
    }
}
