debugger;
const birthDate = new Date("2007-02-06T00:00:00");
const afterBirth = document.querySelector("#afterBirth");
let diffSec;

class TxtType {
	constructor(element, toRotate, period) {
		this.element = element;
		this.toRotate = JSON.parse(toRotate);
		this.period = parseInt(period, 10) || 2000;
		this.txt = "";
		this.isDeleting = false;
		this.loopNum = 0;
		this.tick();
	}

	tick() {
		const i = this.loopNum % this.toRotate.length;
		const fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;

		let delta = 200 - Math.random() * 100;
		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(() => this.tick(), delta);
	}
}

const updateSec = () => {
	diffSec = (new Date().getTime() - birthDate.getTime()) / 1000;
	afterBirth.textContent = Math.round(diffSec);
};

window.onload = () => {
	setInterval(updateSec, 100);

	document.querySelectorAll(".typewrite").forEach((element) => {
		const toRotate = element.getAttribute("data-type");
		const period = element.getAttribute("data-period");
		if (toRotate) {
			new TxtType(element, toRotate, period);
		}
	});

	document.querySelectorAll("#links li").forEach((li) => {
		tippy(li, {
			content: li.getAttribute("data-tooltip"),
			placement: "bottom",
			// delay: [0, 80],
		});
	});
};
