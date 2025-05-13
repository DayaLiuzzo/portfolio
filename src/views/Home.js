
import BaseView from "./BaseView.js";
let isRunning = true;


export default class Home extends BaseView {
	constructor(router, params) {
		super(router, params);
		this.handleProjectClick = this.handleProjectClick.bind(this);

	}

	unmount () {
		isRunning = false;
	}

	render() {
			return `
              `;
	}


	renderHome() {
		
		const card = this.customCreateElement('div', "card", "card");
		const surname = this.customCreateElement('h1', "surname", "surname");
		const lastname = this.customCreateElement('h1', "lastname", "lastname");
		const portfolioText = this.customCreateElement('h1', "portfolioText", "portfolioText");
		const project = this.customCreateElement('h1', "project", "project");
		const description = this.customCreateElement('h1', "description", "description");
		project.innerText = "EPISODE: 0";
		description.innerText = this.about.description;
		surname.innerText = "DAYA";
		lastname.innerText = "LIUZZO";
		portfolioText.innerText = "PORTFOLIO";
		card.appendChild(surname);
		card.appendChild(lastname);
		card.appendChild(portfolioText);
		card.appendChild(project);
		card.appendChild(description)
		document.getElementById('canva').appendChild(card);
	}
	
	injectHexStructure(mainbox) {
		const pieceDiv = document.createElement('div');
		pieceDiv.className = 'piece -rotate-method';
	
		// Function to create a hex row
		function createHexRow(hexCount) {
			const rowDiv = document.createElement('div');
			rowDiv.className = 'hex-row -clearfix';
	
			for (let i = 0; i < hexCount; i++) {
				const hexDiv = document.createElement('div');
				hexDiv.className = 'hex -blink';
				rowDiv.appendChild(hexDiv);
			}
	
			return rowDiv;
		}
	

		const row1 = createHexRow(9);
		const row2 = createHexRow(9);
		const row3 = createHexRow(9);
	

		pieceDiv.appendChild(row1);
		pieceDiv.appendChild(row2);
		pieceDiv.appendChild(row3);
	
		mainbox.appendChild(pieceDiv); 
	}
	
	renderStackElement(tech, stackBox){
		const stackElement = this.customCreateElement("div", "stackElement", "stackElement");
		const techName = this.customCreateElement("h1", "techName", "techName");
		techName.innerText = tech;
		stackElement.appendChild(techName);
		stackBox.appendChild(stackElement);
	}


	renderProjectList(){
		const projectList = document.getElementById("projectList");
		for(const project of this.projects)
		{
			const projectTitle = this.customCreateElement("h1", "projectTitle", "projectTitle");
			projectTitle.innerText = project.name;
			// projectElement.appendChild(projectTitle);
			projectList.appendChild(projectTitle);
		}
	}

	renderShowcase(){
		const showcase = this.customCreateElement('div', "showcase", "showcase");
		const mainBox = this.customCreateElement("div", "mainBox", "mainBox");
		const projectList = this.customCreateElement("div", "projectList", "projectList");
		const stackBox = this.customCreateElement("div", "stackBox", "stackBox");
		for(const tech of this.about.stack)
		{
			this.renderStackElement(tech, stackBox);
		}
		this.injectHexStructure(mainBox);
		mainBox.appendChild(projectList);
		mainBox.appendChild(stackBox);


		showcase.appendChild(mainBox);
		this.injectHexStructure(mainBox);
		document.getElementById('canva').appendChild(showcase);
		const stackElements = document.querySelectorAll('.stackElement');
		const initialDelay = 1.3; // Initial delay for the first element
		const interval = 0.1; // Interval between each element's appearance

		const elementsArray = Array.from(stackElements);
		for (let i = elementsArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[elementsArray[i], elementsArray[j]] = [elementsArray[j], elementsArray[i]];
		}
		elementsArray.forEach((element, index) => {
			const delay = initialDelay + (index * interval);
			element.style.animationDelay = `${delay}s`;
		});
		
	}

	renderATfield()
	{

		const animationDuration = 3; 
  		const interval = 0.3;
  		const offset = 6; 
		const atfield = this.customCreateElement("div", "at-field", "at-field");
		const container = document.getElementById('showcase');
		container.appendChild(atfield);
		const numOctagons = 20; 
		for (let i = 0; i < numOctagons; i++) {
		  const octagon = document.createElement('div');
		  const delay = (i * interval) - offset; 
		  octagon.className = 'octogon';
		  octagon.style.animationDelay = `${delay}s`;
		  atfield.appendChild(octagon);
		}
	}

	mount() {
		this.renderHome();
		this.renderShowcase();
		this.renderProjectList();
	}

	handleProjectClick(event) {
		console.log(event.target.innerText);
		const canva = document.getElementById('canva');
		
		const projects = {
			"MINISHELL:": "/minishell",
			"IRC:": "/irc",
			"TRANSCENDENCE:": "/transcendence",}
		const path = projects[event.target.innerText];
		this.router.navigateTo(path);
	}

	attachEvents() {
		const projectElements = document.querySelectorAll('.projectTitle');
		projectElements.forEach((projectElement) => {
			projectElement.addEventListener('click', (event) => {
				this.handleProjectClick(event);
			});
		});

	}
}
