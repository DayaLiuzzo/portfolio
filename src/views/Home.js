
import BaseView from "./BaseView.js";
import javascriptLogo from './../javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './../counter.js'
let isRunning = true;


export default class Home extends BaseView {
	constructor(router, params) {
		super(router, params);

	}

	unmount () {
		isRunning = false;
	}

	render() {
			return `
              `;
	}

	customCreateElement(tagName, id, className) {
		const element = document.createElement(tagName);
		element.id = id;
		element.className = className;
		return element;
	}

	customCreateImage(src, id, className) {
		const image = document.createElement('img');
		image.src = src;
		image.id = id;
		image.className = className;
		return image;
	}

	// renderSection(projectName, projectDescription, projectStack, projectMedia) {
	// 	const projectCanva = this.customCreateElement('div', "projectCanva-" + projectName , "projectCanva");
	// 	const newSection = this.customCreateElement('section', "section-" + projectName, "section");
	// 	const mediaStackCanva = this.customCreateElement('div', "mediaStackCanva-" + projectName, "mediaStackCanva");
	// 	const stackCanva = this.customCreateElement('div', "stackCanva-" + projectName, "stackCanva");
		
	// 	for(const stackElement of projectStack){
	// 		const stackElementDiv = this.customCreateElement('div', "stack-" + stackElement, "stackElement");
	// 		stackElementDiv.innerText = stackElement;
	// 		stackCanva.appendChild(stackElementDiv);
	// 		console.log(stackElement);

	// 	}

	// 	const projectMediaElement = this.customCreateImage(projectMedia, "media-" + projectName, "media");
	// 	const projectNameElement = this.customCreateElement('h2', "name-" + projectName, "projectName");
	// 	const projectDescriptionElement = this.customCreateElement('p', "description-" + projectName, "projectDescription");
	// 	const projectLabel = this.customCreateElement('div', "label-" + projectName, "projectLabel");
	// 	projectNameElement.innerText = projectName;
	// 	projectDescriptionElement.innerText = projectDescription;
	// 	document.getElementById('canva').appendChild(newSection);
		

	// 	newSection.appendChild(projectCanva);
	// 	mediaStackCanva.appendChild(stackCanva);
	// 	projectCanva.appendChild(projectLabel);
	// 	projectCanva.appendChild(mediaStackCanva);
	// 	projectLabel.appendChild(projectNameElement);
	// 	projectLabel.appendChild(projectDescriptionElement);
	// 	mediaStackCanva.appendChild(projectMediaElement);
	// }

	
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
		// Create the main container div
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
	
		// Create three hex rows with 9, 9, and 9 hexes respectively
		const row1 = createHexRow(9);
		const row2 = createHexRow(9);
		const row3 = createHexRow(9);
	
		// Append the rows to the main container div
		pieceDiv.appendChild(row1);
		pieceDiv.appendChild(row2);
		pieceDiv.appendChild(row3);
	
		// Append the main container div to the body or any other target element
		mainbox.appendChild(pieceDiv); // You can change 'document.body' to any other target element
	}
	
	renderStackElement(tech, stackBox){
		const stackElement = this.customCreateElement("div", "stackElement", "stackElement");
		const techName = this.customCreateElement("h1", "techName", "techName");
		techName.innerText = tech;
		stackElement.appendChild(techName);
		stackBox.appendChild(stackElement);
	}

	renderShowcase(){
		const showcase = this.customCreateElement('div', "showcase", "showcase");
		const mainBox = this.customCreateElement("div", "mainBox", "mainBox");
		const mediaCanva = this.customCreateElement("div", "mediaCanva", "mediaCanva");
		const stackBox = this.customCreateElement("div", "stackBox", "stackBox");
		const media = this.customCreateElement("div", "preview", "preview");
		for(const tech of this.about.stack)
		{
			this.renderStackElement(tech, stackBox);
		}
		
		// mediaCanva.appendChild(media);
		this.injectHexStructure(mainBox);
		mainBox.appendChild(mediaCanva);
		mainBox.appendChild(stackBox);
		// bezel.appendChild(media);	
		
		showcase.appendChild(mainBox);
		this.injectHexStructure(mainBox);
		document.getElementById('canva').appendChild(showcase);
		
	}
	mount() {
		this.renderHome();
		this.renderShowcase();
		// this.renderBase

		// for(const project of this.projects) {
		// 	this.renderSection(project.name, project.description, project.stack, project.media);
		// }
		// this.renderOverlay();
	}

	attachEvents() {
		

	}
}
