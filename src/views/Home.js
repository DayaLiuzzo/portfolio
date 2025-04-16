
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
				<div id="loadingAnimation" class="loadingAnimation"></div>
				<div id="canva"></div>
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

	renderSection(projectName, projectDescription, projectStack, projectMedia) {
		const projectCanva = this.customCreateElement('div', "projectCanva-" + projectName , "projectCanva");
		const newSection = this.customCreateElement('section', "section-" + projectName, "section");
		const mediaStackCanva = this.customCreateElement('div', "mediaStackCanva-" + projectName, "mediaStackCanva");
		const stackCanva = this.customCreateElement('div', "stackCanva-" + projectName, "stackCanva");
		
		for(const stackElement of projectStack){
			const stackElementDiv = this.customCreateElement('div', "stack-" + stackElement, "stackElement");
			stackElementDiv.innerText = stackElement;
			stackCanva.appendChild(stackElementDiv);
			console.log(stackElement);

		}

		const projectMediaElement = this.customCreateImage(projectMedia, "media-" + projectName, "media");
		const projectNameElement = this.customCreateElement('h2', "name-" + projectName, "projectName");
		const projectDescriptionElement = this.customCreateElement('p', "description-" + projectName, "projectDescription");
		const projectLabel = this.customCreateElement('div', "label-" + projectName, "projectLabel");
		projectNameElement.innerText = projectName;
		projectDescriptionElement.innerText = projectDescription;
		document.getElementById('canva').appendChild(newSection);
		

		newSection.appendChild(projectCanva);
		mediaStackCanva.appendChild(stackCanva);
		projectCanva.appendChild(projectLabel);
		projectCanva.appendChild(mediaStackCanva);
		projectLabel.appendChild(projectNameElement);
		projectLabel.appendChild(projectDescriptionElement);
		mediaStackCanva.appendChild(projectMediaElement);
	}

	renderHeader() {
		const header = this.customCreateElement('div', "header", "header");
		const card = this.customCreateElement('div', "card", "card");
		const surname = this.customCreateElement('h1', "surname", "surname");
		const lastname = this.customCreateElement('h1', "lastname", "lastname");
		const portfolioText = this.customCreateElement('h1', "portfolioText", "portfolioText");
		surname.innerText = "DAYA";
		lastname.innerText = "LIUZZO";
		portfolioText.innerText = "PORTFOLIO";
		card.appendChild(surname);
		card.appendChild(lastname);
		card.appendChild(portfolioText);
		header.appendChild(card);
		document.getElementById('canva').appendChild(header);
	}

	renderOverlay() {
		const loadingAnimation = document.getElementById('loadingAnimation');
		const piece = this.customCreateElement('div', "piece", "piece");
		const label = this.customCreateElement('div', "label", "label -bordered");
		loadingAnimation.appendChild(piece);
		label.innerText = "PSYCHOGRAPHIC DISPLAY";
		piece.appendChild(label);
	}

	mount() {
		this.renderHeader();
		for(const project of this.projects) {
			this.renderSection(project.name, project.description, project.stack, project.media);
		}
		// this.renderOverlay();
	}

	attachEvents() {
		

	}
}
