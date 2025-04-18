import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

import Home from "./views/Home.js";


const projects = [
  {
    name: "TRANSCENDENCE:",
    description: "Single page application designed in a microservice architecture.",
    stack: ["HTML", "CSS", "JS", "Django", "Docker", "PostgreSQL"],
    media: "/media/command-line.png"
  },
  {
    name: "MINISHELL:",
    description: "Replica of a shell in C.",
    stack: ["C", "shell", "Makefile"],
    media: "/media/logoJs.svg"
  },
]

const routes = [
  { path: '/', view: Home},
  { path: '/home', view: Home},
];

class Router{
  constructor(routes, projects){
      this.routes = routes;
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
      document.getElementById('app').innerText = "";
      this.currentView = new ViewClass(this);

      document.getElementById("app").innerHTML = this.currentView.render();
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
  const router = new Router(routes, projects);
  router.initialLoad(window.location.pathname);
});
