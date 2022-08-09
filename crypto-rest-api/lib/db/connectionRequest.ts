import mysql from 'mysql2';

export const connectionRequest = (config: object) => {
    const connection = mysql.createConnection(config);

    connection.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`);
        } else {
            console.log(
                `DB connectionRequest Successful ${connection.threadId}`
            );
        }
    });
    return connection;
};
