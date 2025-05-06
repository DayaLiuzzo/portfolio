
import BaseView from "./BaseView.js";
import javascriptLogo from './../javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './../counter.js'
let isRunning = true;


export default class Home extends BaseView {
	constructor(router, params) {
		super(router, params);
		this.handleHomeClick = this.handleHomeClick.bind(this);
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

	renderProjectName(projectName){
		const projectList = document.getElementById("projectList");
		const projectTitleElement = this.customCreateElement("div", "projectTitle", "projectTitle");
		projectTitleElement.innerText = "TRANSCENDANCE\nIRC\nMINISHELL";
		projectList.appendChild(projectTitleElement);

	}

	renderProjectList(){
		const projectList = document.getElementById("projectList");
		for(const project of this.projects)
		{
			// const projectElement = this.customCreateElement("div", "project", "project");
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


	renderProject(projectName){
		console.log(projectName);
			for(project of this.projects)
			{
				if (project.name === projectName) {
					const mainBox = document.getElementById("mainBox");
					const projectList = document.getElementById("projectList");
					projectList.innerHTML = "";
					
					const projectName = this.customCreateElement("h1", "projectTitle", "projectTitle");
					projectName.innerText = project.name;
					projectList.appendChild(projectName);
					
					const descriptionFull = this.customCreateElement("h1", "descriptionFull", "descriptionFull");
					descriptionFull.innerText = project.description;
					
					const previewCanva = this.customCreateElement("div", "previewCanva", "previewCanva");
					previewCanva.appendChild(descriptionFull);
					const stackBox = document.getElementById("stackBox");
					mainBox.insertBefore(previewCanva, stackBox);
					
					const carouselWrapper = this.customCreateElement("div", "carouselWrapper", "carouselWrapper");
					const img = document.createElement("img");
					img.src = project.media;
					img.className = "carouselImage";
					carouselWrapper.appendChild(img);
					
					const keyFeature = this.customCreateElement("h1", "keyFeature", "keyFeature");
					keyFeature.innerText = "Tokenizing";
					const keyFeatureText = this.customCreateElement("h1", "keyFeatureText", "keyFeatureText");
					carouselWrapper.appendChild(keyFeature);
					keyFeature.appendChild(keyFeatureText);

					const nav = this.customCreateElement("div", "nav", "nav");
					const prevButton = this.customCreateElement("a", "prevButton", "button");
					const nextButton = this.customCreateElement("a", "nextButton", "button");
					prevButton.innerHTML = "&#8249;";
					nextButton.innerHTML = "&#8250;";
					nav.appendChild(prevButton);
					nav.appendChild(nextButton);
					keyFeature.appendChild(nav);
					keyFeatureText.innerText = "Breaking down the input in tokens whilst respecting the quotes and protections."

					const homeButton = this.customCreateElement("div", "homeButton", "button");
					homeButton.innerHTML = "&#8250;";

					homeButton.addEventListener('click', (event) => {
						event.preventDefault();
						console.log("HERE");
						this.handleHomeClick(event);
					});

					mainBox.appendChild(homeButton);
					previewCanva.appendChild(carouselWrapper);
					stackBox.innerHTML = "";
					for(const tech of project.stack)
						{
							this.renderStackElement(tech, stackBox);
						}
				}
			}
	}

	mount() {
		this.renderHome();
		this.renderShowcase();
		this.renderProjectList();
	}

	handleHomeClick(event){
		console.log("CLICKED");
		const canva = document.getElementById('canva');
		canva.classList.toggle('expanded');
		this.router.loadView();

		
	}

	handleProjectClick(event) {
		console.log(event.target.innerText);
		const canva = document.getElementById('canva');
		canva.classList.toggle('expanded');
		this.renderProject(event.target.innerText);
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
