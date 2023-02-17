// Modules
import express, { json, static as Static, Express } from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import helmet from 'helmet';
import { Server as SocketServer } from 'socket.io';

interface InitParams {
  corsOptions?: object,
  socketOptions?: object,
  ssl?: {
    cert: Buffer,
    key: Buffer
  },
  port: number,
  distPath: string,
}

/**
 * Server 
 */
class Server {
  private _App?: Express;
  private _Server?: http.Server | https.Server;
  private _SocketServer?: SocketServer;
  protected port = 3100;
  
  /**
   * Initialize the server.
   */
  async init (params: InitParams) {
    // App
    this._App = express();

    // Middlewares
    this._App.use(cors());
    this._App.use(helmet());
    this._App.use(json());
    this._App.use(Static(params.distPath, { index: false }));

    // Server
    this._Server = params.ssl ? 
      https.createServer({
        cert: params.ssl.cert,
        key: params.ssl.key
      }, this._App) :
      http.createServer(this._App);

    // Socket
    this._SocketServer = new SocketServer(this._Server, params.socketOptions);
    
    // Start
    this._Server.listen(params.port);

    console.log(`Server listening on port ${params.port}`);
  }
}

/**
 * Server
 */
const ServerFN = () => new Server();

export {
  ServerFN as Server,
  Server as Class
};
