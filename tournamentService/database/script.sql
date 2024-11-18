-- Create database
CREATE DATABASE IF NOT EXISTS esport_wise_tournament;

-- Use database
USE esport_wise_tournament;

CREATE TABLE Tournaments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    game_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES Games(id) -- Add this foreign key
);

-- Create team-tournament relation table
CREATE TABLE Team_Tournaments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT NOT NULL,
    tournament_id INT NOT NULL,
    final_position INT,
    FOREIGN KEY (team_id) REFERENCES esport_wise_team.Teams(id),
    FOREIGN KEY (tournament_id) REFERENCES Tournaments(id)
);