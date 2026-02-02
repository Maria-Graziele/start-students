
package com.backend.startstudents;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

// Essa anotação combina três outras:
// @Configuration - indica que a classe fornece configurações do Spring
// @EnableAutoConfiguration - ativa a configuração automática do Spring Boot
// @ComponentScan - procura e registra automaticamente componentes do seu pacote

public class StartstudentsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StartstudentsApplication.class, args);
	}

    // Este é o ponto de entrada da aplicação Spring Boot.
    // Aqui o Spring é inicializado, o contexto é carregado,
    // os beans são criados e o servidor embutido (Tomcat) é iniciado

}
