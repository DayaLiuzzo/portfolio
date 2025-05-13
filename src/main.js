import './style.css'
import Home from "./views/Home.js";
import Transcendence from "./views/Transcendence.js";
import Minishell from "./views/Minishell.js";
import Irc from "./views/Irc.js";


const about = {
    description: "42Paris software engineering student",
    stack: ["C", "C++", "Python", "HTML", "CSS", "JS", "NGINX", "Docker", "Postgres"],
    media: "/media/command-line.png"
};

const projects = [
  {
    name: "TRANSCENDENCE:",
    description: "Single page application designed in a microservice architecture. 2FA & JWT authentication, real-time chat with WebSocket, REST API for CRUD operations, and a PostgreSQL database for data storage. The application is containerized using Docker for easy deployment and scalability.",
    stack: ["HTML", "CSS", "JS", "Django", "Docker", "PostgreSQL"],
    media: "/media/command-line.png",
    features: [
        {
            name: "Microservices",
            description: "Architecture that breaks down the application into smaller, independent services, enhancing scalability and maintainability.",
            media: "/media/microservices.png"
        },
        {
            name: "WebSocket",
            description: "Real-time communication between the client and server, allowing for instant updates and interactions.",
            media: "/media/websocket.png"
        },
        {
            name: "REST API",
            description: "Provides a structured way for clients to interact with the server, enabling CRUD operations on resources.",
            media: "/media/API.png"
        },
        {
            name: "PostgreSQL",
            description: "Relational database management system used for data storage and retrieval, ensuring data integrity and security.",
            media: "/media/postgresql.png"
        },
        {
            name: "Docker",
            description: "Containerization technology that allows for consistent environments across development, testing, and production.",
            media: "/media/docker.png"
        }
    ]
},
{
    name: "MINISHELL:",
    description: "This project is a Bash shell replica that interprets and executes user commands in a Unix-like environment. It supports key features like pipelines, redirections, and environment variable handling, showcasing solid knowledge of Unix system programming, process control, and memory management.",
    stack: ["C", "SHELL"],
    media: "/media/logoJs.svg",
    features: [
        {
            name: "Tokenization",
            description: "Parses user input into tokens, breaking down commands and arguments for easier processing and execution.",
            media: "/media/tokenization.png"
        },
        {
            name: "Pipelines",
            description: "Allows chaining commands together using the pipe operator (|), enabling the output of one command to be used as the input for another.",
            media: "/media/pipeline.png"
        },
        {
            name: "Redirections",
            description: "Supports input and output redirection using operators like >, <, >>, and <<, allowing users to control where command output goes and where input comes from.",
            media: "/media/redirection.png"
        },
        {
            name: "Environment Variables",
            description: "Manages environment variables, enabling users to set, unset, and access variables that affect the shell's behavior and command execution.",
            media: "/media/expand.png"
        },
        {
            name: "Signal Handling",
            description: "Handles signals like SIGINT and SIGQUIT, allowing the shell to respond appropriately to user interrupts and control commands.",
            media: "/media/signal.png"
        }
    ]
  },
  
  {
    name: "IRC:",
    description: "Replica of an IRSSI chat server in C++.",
    stack: ["C++"],
    media: "/media/logoJs.svg",
    features: [ 
        {
            name: "Client-Server Architecture",
            description: "The application is built on a client-server model, where multiple clients can connect to a central server to communicate with each other.",
            media: "/media/client-server.png"
        },
        {
            name: "Protocol Implementation",
            description: "Implements the IRC protocol, allowing clients to join channels, send messages, and perform various IRC commands.",
            media: "/media/protocol.png"
        }
    ]
  }
];

const routes = [
  { path: '/', view: Home},
  { path: '/home', view: Home},
  {path: '/transcendence', view: Transcendence},
  {path: '/minishell', view: Minishell},
  {path: '/irc', view: Irc},
];

class Router{
  constructor(routes, projects, about){
      this.routes = routes;
      this.about = about;
      this.projects = projects;
      this.currentView = null;
      this.init();
  }

  getRoutes(){
      return this.routes;
  }

  getRoute(path){
      return this.routes.find(route => route.path === path);
  }

  async loadView(path){
      const route = this.getRoute(path);
      const ViewClass = route ? route.view : Home;
      if (!route) {
          console.warn(`Route for ${path} not found! Showing Home view.`);
      }
      if(this.currentView){
          this.currentView.unmount();
      }
      document.getElementById('canva').innerText = "";
      this.currentView = new ViewClass(this);

      document.getElementById("canva").innerHTML = this.currentView.render();
      await this.currentView.mount();
      this.currentView.attachEvents();
      }

  async navigateTo(path){
      const route = this.getRoute(path);
      history.pushState({ path }, "", path);
      await this.loadView(path);
  }

  async initialLoad(path){
      const route = this.getRoute(path);
      history.replaceState({ path }, "", path);
      await this.loadView(path);
  }

  init() {

      document.body.addEventListener("click", (event) => {
          if (event.target.matches("a")) {
              event.preventDefault();
              this.navigateTo(event.target.getAttribute("href"));
          }
      });


      window.addEventListener("popstate", async (event) => {
          if (event.state && event.state.path) {
              const path = event.state.path;
              const route = this.getRoute(path);

              if (!route) {
                  console.warn(`Route for ${path} not found! Redirecting to /home.`);
                  history.replaceState({ path: "/home" }, "", "/home");
                  await this.loadView("/home");
                  return;
              }

              await this.loadView(path);
          }
      });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const router = new Router(routes, projects, about);
  router.initialLoad(window.location.pathname);
});
