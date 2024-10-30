-- Crear la base de datos
CREATE DATABASE esport_wise;

-- Usar la base de datos
USE esport_wise;

-- Crear la tabla Roles e insertar los roles iniciales
CREATE TABLE Roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL
);

-- Insertar roles predeterminados
INSERT INTO Roles (role_name) VALUES ('admin'), ('manager'), ('player'), ('coach'), ('staff');

-- Crear la tabla de Usuarios
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Crear la tabla de Juegos
CREATE TABLE Games (
    game_id INT PRIMARY KEY AUTO_INCREMENT,
    game_name VARCHAR(100) NOT NULL
);

-- Crear la tabla de Equipos
CREATE TABLE Teams (
    team_id INT PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    manager_id INT,
    game_id INT,
    FOREIGN KEY (manager_id) REFERENCES Users(user_id),
    FOREIGN KEY (game_id) REFERENCES Games(game_id)
);

-- Crear la tabla de Miembros de Equipo
CREATE TABLE Team_Members (
    team_member_id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT,
    user_id INT,
    position VARCHAR(50),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('activo', 'inactivo') DEFAULT 'activo',
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Crear la tabla de Torneos
CREATE TABLE Tournaments (
    tournament_id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_name VARCHAR(100) NOT NULL,
    game_id INT,
    start_date DATE,
    end_date DATE,
    winner_team_id INT,
    FOREIGN KEY (game_id) REFERENCES Games(game_id),
    FOREIGN KEY (winner_team_id) REFERENCES Teams(team_id)
);

-- Crear la tabla de Participación en Torneos
CREATE TABLE Tournament_Participation (
    participation_id INT PRIMARY KEY AUTO_INCREMENT,
    tournament_id INT,
    team_id INT,
    final_position INT,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments(tournament_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);

-- Crear la tabla de Logros
CREATE TABLE Achievements (
    achievement_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    achievement_date DATE,
    team_id INT,
    user_id INT,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
