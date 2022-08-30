import mysql from "mysql2";

export const handler = async (event) => {
    console.log("Received: ", JSON.stringify(event, null, 2))
    const connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    })

    const records = event.Records;
    const promises = records.map(async (record) => {
        const body = JSON.parse(record.body);
        await connection.promise().query(`INSERT INTO records(userId, token) VALUES (${body.userId}, ${body.token})`);
        connection.end();
    })
    await Promise.all(promises);
    
};
