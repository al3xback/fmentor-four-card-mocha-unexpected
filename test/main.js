import expect from 'unexpected';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-four-card-mocha-unexpected/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have title, subtitle and description of section head equal to mockup data', () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionHeadTitle = sectionHeadEl.querySelector(
			'.cards-summary__title'
		).textContent;
		const sectionHeadSubtitle = sectionHeadEl.querySelector(
			'.cards-summary__subtitle'
		).textContent;
		const sectionHeadDesc = sectionHeadEl.querySelector(
			'.cards-summary__desc'
		).textContent;

		const getFormattedText = (text) => {
			let newText = text.trim();

			if (/\n/.test(newText)) {
				newText = newText.replace(/\n/g, ' ');
			}

			if (/\t/.test(newText)) {
				newText = newText.replace(/\t/g, '');
			}

			return newText;
		};

		const sectionHeadData = {
			title: getFormattedText(sectionHeadTitle),
			subtitle: getFormattedText(sectionHeadSubtitle),
			desc: getFormattedText(sectionHeadDesc),
		};

		const mockupSectionHeadData = {
			title: 'Reliable, efficient delivery',
			subtitle: 'Powered by Technology',
			desc: 'Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful',
		};

		expect(sectionHeadData, 'to satisfy', mockupSectionHeadData);
	});

	it("should have a 'cards' class as a wrapper element", () => {
		const cardListEl = document.querySelector('.cards');
		const cardListChildrenLength = cardListEl.children.length;

		expect(!!cardListEl, 'to equal', true);
		expect(cardListChildrenLength, 'to be above', 1);
	});

	it('should have three card block elements to the side in desktop view', () => {
		const cardBlockEls = document.querySelectorAll('.cards__block');

		expect(cardBlockEls.length, 'to equal', 3);
	});
});
