import express from 'express';
import errorMiddleware from './middleware/error';

export class Server {
  private app: express.Application;
  private port: number;
  private routes: any[];

  constructor(port: number, routes: any[]) {
    this.app = express();
    this.port = port;
    this.routes = routes;
    this.middleware();
    this.enableRoutes();
    this.initializeErrorHandling();
  }

  public getApp(): express.Application {
    return this.app;
  }

  public enableRoutes() {
    this.app.get('/', (req, res) => {
      res.json({
        message: 'Welcome to Express app'
      });
    });
    this.routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  public middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}