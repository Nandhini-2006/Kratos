-- Codebase-Aware MCP Server Database Schema
-- Compatible with MySQL 8.0+

CREATE DATABASE IF NOT EXISTS codebase_index;
USE codebase_index;

-- Table 1: nodes
-- Stores every function, class, or method discovered across the codebase.
CREATE TABLE IF NOT EXISTS nodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_path VARCHAR(500) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('function', 'class', 'method') NOT NULL,
    start_line INT,
    end_line INT,
    signature TEXT,
    docstring TEXT,
    source_code MEDIUMTEXT,
    content_hash VARCHAR(64),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_file (file_path)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 2: edges
-- Graph representation connecting caller -> callee nodes.
CREATE TABLE IF NOT EXISTS edges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caller_id INT NOT NULL,
    callee_id INT NOT NULL,
    edge_type ENUM('calls', 'imports', 'inherits') NOT NULL,
    FOREIGN KEY (caller_id) REFERENCES nodes(id) ON DELETE CASCADE,
    FOREIGN KEY (callee_id) REFERENCES nodes(id) ON DELETE CASCADE,
    INDEX idx_caller (caller_id),
    INDEX idx_callee (callee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table 3: embeddings_meta
-- Maps MySQL nodes to Qdrant vector database IDs for hybrid graph + vector search.
CREATE TABLE IF NOT EXISTS embeddings_meta (
    node_id INT PRIMARY KEY,
    vector_id VARCHAR(64) NOT NULL,
    FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
