import { dots } from '../types/types';
import { generateDot } from './funcs';

// all strings here must be lowecase
export const allowedFilesForUpload: string[] = [
	'image/png',
	'image/jpg',
	'image/jpeg',
];

export const transparentBackgroundSvg: string =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjkzNyA3LjkzOCIgaGVpZ2h0PSIzMCIgd2lkdGg9IjMwIj48cGF0aCBwYWludC1vcmRlcj0ic3Ryb2tlIGZpbGwgbWFya2VycyIgZD0iTS4wMTQuMDE0SDMuOTdWMy45N0guMDE0ek0zLjk3IDMuOTY4aDMuOTU0djMuOTU1SDMuOTd6IiBmaWxsPSIjZWVlZmYwIi8+PC9zdmc+';

export const cardDots: dots = [
	generateDot('dot_01', '#36CBC2', '13px', {
		right: '63px',
		top: '82px',
	}),
	generateDot('dot_02', '#DBEFC3', '8px', {
		right: '50px',
		top: '11px',
	}),
	generateDot('dot_03', '#F5E8DD', '13px', {
		right: '10px',
		top: '149px',
	}),
	generateDot('dot_04', '#F5E8DD', '8px', {
		right: '22px',
		top: '54px',
	}),
	generateDot('dot_05', 'rgba(237, 205, 175, 0.59)', '13px', {
		left: '11px',
		bottom: '99px',
	}),
];
