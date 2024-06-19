CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE posts (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE comments (
    id INT PRIMARY KEY IDENTITY(1,1),
    post_id INT REFERENCES posts(id),
    user_id INT REFERENCES users(id),
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE likes (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT REFERENCES users(id),
    post_id INT REFERENCES posts(id),
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT uc_user_post UNIQUE (user_id, post_id)
);




CREATE TRIGGER update_post_updated_at
ON posts
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE posts
    SET updated_at = GETDATE()
    FROM inserted
    WHERE posts.id = inserted.id;
END;


CREATE FUNCTION get_like_count (@post_id INT)
RETURNS INT
AS
BEGIN
    DECLARE @like_count INT;
    SELECT @like_count = COUNT(*) FROM likes WHERE post_id = @post_id;
    RETURN @like_count;
END;


CREATE PROCEDURE register_user
    @username VARCHAR(50),
    @password VARCHAR(255),
    @email VARCHAR(100)
AS
BEGIN
    INSERT INTO users (username, password, email, created_at)
    VALUES (@username, @password, @email, GETDATE());
END;


CREATE PROCEDURE create_post
    @user_id INT,
    @title VARCHAR(255),
    @content TEXT
AS
BEGIN
    INSERT INTO posts (user_id, title, content, created_at, updated_at)
    VALUES (@user_id, @title, @content, GETDATE(), GETDATE());
END;


CREATE PROCEDURE add_comment
    @post_id INT,
    @user_id INT,
    @content TEXT
AS
BEGIN
    INSERT INTO comments (post_id, user_id, content, created_at)
    VALUES (@post_id, @user_id, @content, GETDATE());
END;


CREATE PROCEDURE add_like
    @post_id INT,
    @user_id INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM likes WHERE post_id = @post_id AND user_id = @user_id)
    BEGIN
        INSERT INTO likes (post_id, user_id, created_at)
        VALUES (@post_id, @user_id, GETDATE());
    END;
END;