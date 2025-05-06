// tester si remplacer localhost:4430 par '' fonctionne au sein des fetch;




export default class BaseView{
    constructor(router, params = {}){
        this.router = router
        this.projects = this.router.projects;
        this.about = this.router.about;
        this.params = params;
        this.canva = document.getElementById('canva');
        if (!this.canva) {
            console.error("Error: Element with id 'canva' not found in document");
        }
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

    renderFeatureStackElement(tech, stackBox){
		const stackElement = this.customCreateElement("div", "featureStackElement", "featureStackElement label bordered danger");
		const techName = this.customCreateElement("h1", "featureTechName", "featureTechName");
		techName.innerText = tech;
		stackElement.appendChild(techName);
		stackBox.appendChild(stackElement);
	}

    renderFeatureStackBox(projectStack){
        const stackBox = this.customCreateElement("div", "stackBox", "stackBox");
		for(const tech of projectStack)
		{
			this.renderFeatureStackElement(tech, stackBox);
		}
		return stackBox;
    }

	renderStackBox(projectStack){
		const stackBox = this.customCreateElement("div", "stackBox", "stackBox");
		for(const tech of projectStack)
		{
			this.renderStackElement(tech, stackBox);
		}
		return stackBox;
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


    render(){
        return `<div>Base View</div>`;
    }

   
    async mount(){
    }


    async navigateTo(path){
        this.router.navigateTo(path);
    }


    unmount(){
        console.log("BaseView unmounted");
    }

    attachEvents(){
        console.log('Events attached');
    }


}
