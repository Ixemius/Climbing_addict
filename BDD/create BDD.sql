CREATE TABLE ArticlesCategories (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Articles (
    id CHAR(36) NOT NULL PRIMARY KEY,
    date DATETIME NOT NULL DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    categorie_id CHAR(36) NOT NULL,
    author_id CHAR(36) NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES ArticlesCategories(id),
    FOREIGN KEY (author_id) REFERENCES Users(id)
);


CREATE TABLE Users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    date DATETIME NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role CHAR(36) NOT NULL,
);

CREATE TABLE ArticlesComments (
    id CHAR(36) NOT NULL PRIMARY KEY,
    date DATETIME NOT NULL DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    Article_id CHAR(36) NOT NULL,
    role CHAR(36) NOT NULL,
    author_id CHAR(36) NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Users(id),
    FOREIGN KEY (Article_id) REFERENCES Articles(id)
);

CREATE TABLE Orders (
    id CHAR(36) NOT NULL PRIMARY KEY,
    date DATETIME NOT NULL DEFAULT NOW(),
    total_ammount DECIMAL NOT NULL,
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE OrderProducts (
    id CHAR(36) NOT NULL PRIMARY KEY,
    total_ammount DECIMAL NOT NULL,
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
CREATE TABLE Products (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    date_added TIMESTAMP DEFAULT NOW(),
    categories_id CHAR(36) NOT NULL,
    FOREIGN KEY (categories_id) REFERENCES ProductsCategories(id)
);

CREATE TABLE ProductsCategories (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULl,
);


