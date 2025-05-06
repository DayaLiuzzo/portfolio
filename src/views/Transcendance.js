
import BaseView from "./BaseView.js";
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
            <div id=wrapper class=wrapper>
                <div id=projectCanva class="projectCanva bordered label">
                    <div id=projectName class="projectName bordered label">TRANSCENDENCE</div>
                    <div id=previewCanva class=previewCanva></div>
                </div>
            </div>
            </div>
              `;
    }

    renderProject(){
        for(const project of this.projects)
            if(project.name === "TRANSCENDENCE:")
            {
                const stackBox = this.renderFeatureStackBox(project.stack);
                document.getElementById('projectCanva').appendChild(stackBox);
            }
            this.injectHexStructure(document.getElementById('projectCanva'));
            this.injectHexStructure(document.getElementById('projectCanva'));
            const homeButton = this.customCreateElement("div", "homeButton", "homeButton bordered danger label");
            const projectCanva = document.getElementById('projectCanva');
            projectCanva.appendChild(homeButton);
            homeButton.innerText = "MENU";
            


    }

    attachFeatureEvents(featureName){
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        let currentFeatureIndex = 0;
        const features = this.projects[0].features;
        prevButton.addEventListener('click', () => {
            if (currentFeatureIndex > 0) {
                currentFeatureIndex--;
                this.renderFeature(features[currentFeatureIndex]);
            }
        });
        nextButton.addEventListener('click', () => {
            if (currentFeatureIndex < features.length - 1) {
                currentFeatureIndex++;
                this.renderFeature(features[currentFeatureIndex]);
            }
        });
    }

    renderFeature(feature){
        const previewCanva = document.getElementById('previewCanva');
        previewCanva.innerHTML = "";
        for(const project of this.projects)
            if(project.name === "TRANSCENDENCE:")
            {

                    const descriptionFull = this.customCreateElement("h1", "descriptionFull", "descriptionFull label bordered");
                    descriptionFull.innerText = project.description;
                    
                    const previewCanva = document.getElementById('previewCanva')
                    previewCanva.appendChild(descriptionFull);
            }
        const img = this.customCreateImage(feature.media, "featureImage", "featureImage ");
        const featureCanva = this.customCreateElement("div", "featureCanva", "featureCanva");
        const featureName = this.customCreateElement("div", feature.name, "featureName label bordered");
        const featureDescription = this.customCreateElement("div", feature.description, "featureDescription label bordered");
        const nav = this.customCreateElement("div", "nav", "nav");
        const prevButton = this.customCreateElement("div", "prevButton", "button bordered label danger");
        const nextButton = this.customCreateElement("div", "nextButton", "button bordered label danger");
        prevButton.innerHTML = "<";
        nextButton.innerHTML = ">";
        nav.appendChild(prevButton);
        nav.appendChild(nextButton);
        previewCanva.appendChild(img);
        previewCanva.appendChild(featureCanva);
        
        featureName.innerText = feature.name;
        featureCanva.appendChild(featureName);
        
        featureDescription.innerText = feature.description;
        featureCanva.appendChild(featureDescription);
        featureCanva.appendChild(nav);
        this.attachFeatureEvents();
    }

    mount() {
        const transcendenceProject = this.projects.find(project => project.name === "TRANSCENDENCE:");
        this.renderProject();
        this.renderFeature(transcendenceProject.features[0]);
    }

    attachEvents() {

    }
}