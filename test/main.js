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

	it('should have title, subtitle and description of section head equal to mockup', () => {
		const sectionHeadEl = document.querySelector('.section__head');
		const sectionTitle =
			sectionHeadEl.querySelector('.section__title').textContent;
		const sectionSubtitle =
			sectionHeadEl.querySelector('.section__subtitle').textContent;
		const sectionDesc =
			sectionHeadEl.querySelector('.section__desc').textContent;

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
			title: getFormattedText(sectionTitle),
			subtitle: getFormattedText(sectionSubtitle),
			desc: getFormattedText(sectionDesc),
		};

		const mockupData = {
			title: 'Reliable, efficient delivery',
			subtitle: 'Powered by Technology',
			desc: 'Our Artificial Intelligence powered tools use millions of project data points to ensure that your project is successful',
		};

		expect(sectionHeadData, 'to satisfy', mockupData);
	});

	it("should have a 'card__list' class as a wrapper element", () => {
		const cardListEl = document.querySelector('.card__list');
		const cardListChildrenLength = cardListEl.children.length;

		expect(!!cardListEl, 'to equal', true);
		expect(cardListChildrenLength, 'to be above', 1);
	});

	it('should have three columns of card item to the side in desktop view', () => {
		const cardBlocks = document.querySelectorAll('.card__list-block');

		expect(cardBlocks.length, 'to equal', 3);
	});
});
