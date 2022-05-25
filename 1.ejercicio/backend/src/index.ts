import { Server } from './server';
import * as dotenv from 'dotenv';
dotenv.config()
function main (){
    let server = new Server();
    server.listen();
};
main();
