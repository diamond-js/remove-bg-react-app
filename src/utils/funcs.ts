import axios, { CancelTokenSource } from 'axios';
import { dot } from '../types/types';

export async function removeBgApiCall(
	formData: FormData,
	errMsg: string = 'An error occured',
	cancelToken: CancelTokenSource
): Promise<{
	success: boolean;
	errorMsg?: string;
	removedBgImgArrayBuffer?: ArrayBuffer;
}> {
	try {
		const res = await axios({
			method: 'post',
			url: 'https://api.remove.bg/v1.0/removebg',
			data: formData,
			responseType: 'arraybuffer',
			headers: {
				'X-Api-Key': 'd3Q6E3momDyn26X1v77HVxCC', // currently lendfinix api
			},
			cancelToken: cancelToken.token,
		});
		if (res.status != 200)
			return {
				success: false,
				errorMsg: 'Failed To Remove Bg!',
			};
		else return { success: true, removedBgImgArrayBuffer: res.data };
	} catch (error) {
		return {
			success: false,
			errorMsg: errMsg,
		};
	}
}

export function generateDot(
	id: string,
	bg = '',
	size = '',
	positions: {
		left?: string;
		right?: string;
		bottom?: string;
		top?: string;
	} = { left: 'auto', right: 'auto', top: 'auto', bottom: 'auto' }
): dot {
	return {
		id,
		bg,
		size,
		...positions,
	};
}
