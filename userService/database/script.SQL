-- Crear la base de datos
CREATE DATABASE esport_wise_user;

-- Usar la base de datos
USE esport_wise_user;

-- Crear la tabla Roles e insertar los roles iniciales
CREATE TABLE Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL
);

-- Insertar roles predeterminados
INSERT INTO Roles (role_name) VALUES ('admin'), ('manager'), ('player'), ('coach'), ('staff');

-- Crear la tabla de Usuarios
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    fullname VARCHAR(50)  NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);
