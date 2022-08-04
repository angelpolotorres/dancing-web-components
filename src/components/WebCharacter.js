import html from "../assets/html.svg";
import css from "../assets/css.svg";
import js from "../assets/js.svg";
import modules from "../assets/module.svg";
import leg from "../assets/leg.svg";

const CHARACTER_TYPE = {
	html,
	css,
	js,
	modules,
};

const DEFAULT_CHARACTER = "html";

class WebCharacter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	static get styles() {
		return `
 
            h1 {
                color:red;
            }

            .body{
                height: 8rem;
                z-index:1;
                position: relative;
            }

            :host(.dance) .body {
                animation: dance 2s infinite;
            }

            .legs{
                display: flex;
                justify-content: center;
                gap: .4rem;
                transform: translateY(-30px) translateX(4px);
                z-index:0;
            }

            .leg{
                width:30px;
            }

            @keyframes idle {
                0% { transform: translateY(0);}
                100%{ transform: translateY(10px);}
            }

            @keyframes dance {
                0%, 50%, 100% { transform: rotate(0deg);}
                25% { transform: rotate(-30deg);}
                75% {transform: rotate(30deg);}
            }
        `;
	}

	connectedCallback() {
		this.type = this.getAttribute("type") ?? DEFAULT_CHARACTER;
		this.render();
		this.shadowRoot
			.querySelector(".body")
			.addEventListener("click", () => this.setDance());
		this.shadowRoot
			.querySelector(".body")
			.addEventListener("click", () => this.emitirInformacion());
	}

	setDance() {
		this.classList.toggle("dance");
	}

	emitirInformacion() {
		const event = new CustomEvent("INFO", {
			detail: this.type,
			composed: true,
			bubbles: true,
		});
		this.dispatchEvent(event);
	}

	render() {
		this.shadowRoot.innerHTML = `
        <style>${WebCharacter.styles}</style>
        <div class="character">
            <img class="body" src="${CHARACTER_TYPE[this.type]}" alt="leg"> 
            <div class= "legs"> 
            <img class="left leg" src="${leg}" alt="leg"> 
            <img class="right leg" src="${leg}" alt="leg"> 
            </div>
            <slot></slot>
        </div>
        `;
	}
}

customElements.define("web-character", WebCharacter);
