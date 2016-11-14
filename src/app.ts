import * as express from 'express';
import * as http from 'http';

const app = express();

app.set('port', process.env.PORT || 9000);
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello world');
});

http.createServer(app).listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

