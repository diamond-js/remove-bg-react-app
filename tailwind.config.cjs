/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				uploadCardShadow: '0px 18px 40px rgba(131, 137, 137, 0.15)',
			},
		},
		colors: {
			// grayTxt: '#E8FAF9',
			txtClr: '#595E5D',
			white: '#fff',
			grayTxt: '#687574',
			prim: '#1D8D86',
			hightlight: '#E8FAF9',
		},
	},
	plugins: [],
};
