import { LightningElement } from "lwc";

export default class ComplexTemplateExpressionsPoc extends LightningElement {
	user = {
		profile: {
			name: "Gabriel",
		},
	};

	amount = 120;
	taxRate = 0.1;
	count = 8;
	itemCount = 2;

	items = [
		{ id: "1", name: "Mouse", active: true },
		{ id: "2", name: "Keyboard", active: false },
		{ id: "3", name: "Monitor", active: true },
	];

	resetCount = () => {
		this.itemCount = 2;
	};
}
