
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
		
		this.injectHexStructure(mainBox);
		mainBox.appendChild(mediaCanva);
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

	mount() {
		this.renderHome();
		this.renderShowcase();
	}

	attachEvents() {
		

	}
}
