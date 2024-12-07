-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS esport_wise_team;

-- Usar la base de datos
USE esport_wise_team;

-- Crear la tabla de Juegos
CREATE TABLE games (
    id INT PRIMARY KEY AUTO_INCREMENT,
    game_name VARCHAR(100) NOT NULL
);

-- Insertar juegos predeterminados
INSERT INTO games (game_name) VALUES ('Valorant'), ('League of Legends');

-- Crear la tabla de Equipos
CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    manager_id INT,
    game_id INT NOT NULL, FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Crear la tabla de Miembros de Equipo
CREATE TABLE team_members (
    team_member_id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('player', 'coach', 'staff') DEFAULT 'player',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('activo', 'inactivo') DEFAULT 'activo',
    FOREIGN KEY (team_id) REFERENCES teams(id),
    UNIQUE (team_id, user_id)
);