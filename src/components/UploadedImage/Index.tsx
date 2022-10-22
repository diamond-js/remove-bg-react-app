import { FC, useEffect, useState } from 'react';
import { Uploaded_Image } from '../../types/types';
import axios, { CancelTokenSource } from 'axios';
// import chevronDown from '../../assets/icons/chevronDown.svg';
import closeIcon from '../../assets/icons/closeIcon.svg';
import { removeBgApiCall } from '../../utils/funcs';
import { cardDots, transparentBackgroundSvg } from '../../utils/constants';

const dotsForCard = cardDots[cardDots.length - 1];
let cancelToken: CancelTokenSource;
type Props = {
	img: Uploaded_Image;
	removeImg: (a: string) => void;
};

const UploadedImage: FC<Props> = function ({ img, removeImg }) {
	const [showOriginalImg, setShowOriginalImg] = useState<boolean>(false);
	const [removedBgImgLocalURLLink, setRemovedBgImgLocalURLLink] =
		useState<string>('');
	// const [removedBgImgLinkBase64, setRemovedBgImgLinkBase64] = useState<
	// string | null
	// >();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<{ isError: boolean; errorTxt: string }>({
		isError: false,
		errorTxt: '',
	});

	const canShowImage = !isLoading && !error.isError;

	async function handleRemoveBg() {
		setIsLoading(true);
		setError({
			...error,
			isError: false,
			errorTxt: '',
		});

		const formData = new FormData();
		let errMsg: string = '';
		formData.append('size', 'auto');
		if (img.uploadType === 'IMAGE_FILE' && img.imageFile) {
			formData.append('image_file', img.imageFile);
			errMsg = 'Failed to process image';
		} else if (
			img.uploadType === 'IMAGE_LINK' &&
			img.uploadedImgLinkOrDataURL
		) {
			formData.append('image_url', img.uploadedImgLinkOrDataURL);
			errMsg = 'Failed to download image from URL';
		} else return; // end function

		const removeBgApiResponse = await removeBgApiCall(
			formData,
			errMsg,
			cancelToken
		);
		if (!removeBgApiResponse.success) {
			setError({
				...error,
				isError: true,
				errorTxt: removeBgApiResponse.errorMsg || '',
			});
		} else if (removeBgApiResponse.removedBgImgArrayBuffer) {
			const blob = new Blob([removeBgApiResponse.removedBgImgArrayBuffer]);
			const newImgLocalUrl = URL.createObjectURL(blob);
			setRemovedBgImgLocalURLLink(newImgLocalUrl);
			console.log({ removedBgImgLocalURLLink, type: blob.type });

			// const reader = new FileReader();
			// reader.readAsDataURL(blob);
			// reader.onload = (e) => {
			// 	const base64 = e.target?.result;
			// 	return setRemovedBgImgLinkBase64(base64?.toString());
			// };
		}

		setIsLoading(false);
	}

	useEffect(() => {
		cancelToken = axios.CancelToken.source();
		handleRemoveBg();

		return () => {
			if (cancelToken) cancelToken.cancel();
		};
	}, []);

	return (
		<div className='rounded-md bg-white shadow-uploadCardShadow overflow-hidden w-full py-3 px-2 relative'>
			<div className='py-3 px-2 relative z-20'>
				{error.isError && (
					<div className='px-2 py-1 text-center bg-[#ffb8b8] mb-2'>
						{error.errorTxt}{' '}
						<span
							className='underline cursor-pointer'
							onClick={() => handleRemoveBg()}
						>
							Retry
						</span>
					</div>
				)}
				<div
					className={` min-h-[188px] mb-4 relative flex items-center justify-center p-2 z-20`}
					style={{
						backgroundImage: showOriginalImg
							? 'none'
							: `url(${transparentBackgroundSvg})`,
						backgroundColor: 'white',
						backgroundRepeat: 'repeat',
					}}
				>
					<span
						className='bg-[#0A1F1D70] absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full cursor-pointer'
						onClick={() => removeImg(img.id)}
					>
						<img
							src={closeIcon}
							alt='Close'
						/>
					</span>

					{/* loading indicator */}
					{isLoading && (
						<span className='text-xl font-semibold text-grayTxt absolute '>
							Uploading Image...
						</span>
					)}
					{canShowImage &&
						(showOriginalImg ? (
							<img
								className='w-full'
								src={img.uploadedImgLinkOrDataURL}
								alt='original photo'
							/>
						) : (
							removedBgImgLocalURLLink && (
								<img
									src={removedBgImgLocalURLLink || ''}
									className='max-w-full'
									alt='removed background'
								/>
							)
						))}
				</div>

				{canShowImage && (
					<div className='flex flex-col items-center mb-2'>
						<div
							className='mb-4 flex items-center gap-[0.125rem]'
							onClick={() => setShowOriginalImg(!showOriginalImg)}
						>
							<span className='text-xs font-semibold underline text-[#0F6661]'>
								{showOriginalImg
									? 'Show Removed Background'
									: 'Show Original Image'}
							</span>
							{/* <img
						src={chevronDown}
						alt='show image with background removed or original image'
					/> */}
						</div>

						<a
							href={removedBgImgLocalURLLink}
							download={'rmvBG_download' + img.id + '.png'}
							className='py-2 px-4 bg-prim rounded-md text-base font-medium text-white'
						>
							Download
						</a>
					</div>
				)}
			</div>

			{/* oval */}
			<div className='absolute bg-[#E8FAF9] w-[461px] h-[461px]  rounded-full top-1/2 -translate-y-1/2 -translate-x-[57%] left-0 opacity-20 z-0'></div>
			{/* dots */}
			<div className=''>
				{/* dot */}

				<span
					key={dotsForCard.id}
					style={{
						background: dotsForCard.bg,
						bottom: dotsForCard.bottom,
						top: dotsForCard.top,
						left: dotsForCard.left,
						right: dotsForCard.right,
						width: dotsForCard.size,
						height: dotsForCard.size,
					}}
					className={`block absolute rounded-full z-10`}
					// className='block absolute bg-[#000] w-[13px] h-[13px] top-[82px] right-[60px]'
				></span>
			</div>
		</div>
	);
};

export default UploadedImage;
