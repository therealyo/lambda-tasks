import http from 'k6/http';

export default function () {
    const userId = Math.floor(Math.random() * 1000);
    const token = Math.floor(Math.random() * 9);
    const body = JSON.stringify({
        MessageBody: {
            userId: userId,
            token: token
        }
    });
    http.put("https://l5n9t2m00b.execute-api.eu-west-2.amazonaws.com/send", body);
}
