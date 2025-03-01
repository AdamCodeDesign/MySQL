import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
});

await connection.connect();

async function createTables() {
    //tabela rodzic
    const customersSql = `
        CREATE TABLE IF NOT EXISTS companycustomers(
            id int NOT NULL AUTO_INCREMENT,
            name varchar(16) NOT NULL,
            surname varchar(16) NOT NULL,
            PRIMARY KEY(id)
        );
    `;
    await connection.query(customersSql);

    //tabela dziecko
    const ordersSql = `
    CREATE TABLE IF NOT EXISTS shoporders(
            id int NOT NULL AUTO_INCREMENT,
            amount DECIMAL(6,2) NOT NULL,
            PRIMARY KEY(id),
            companycustomer_id int,
            FOREIGN KEY (companycustomer_id) REFERENCES companycustomers(id)
        );
    `;
    await connection.query(ordersSql);
}

await createTables();

await connection.close();
