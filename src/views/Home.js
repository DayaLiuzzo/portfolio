
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
				<div id="canva">
					<div id="text">COUCOU</div>
				</div>
              `;
	}

	attachEvents() {
		

	}
}
