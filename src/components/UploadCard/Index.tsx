import { FC, useEffect, useState } from 'react';

import uploadingIllustration from '../../assets/images/uploading-bro.svg';
import { dots } from '../../types/types';
import { cardDots } from '../../utils/constants';
import { generateDot } from '../../utils/funcs';

type Props = {
	showIllustration: boolean;
	handleFileUpload: (a: FileList) => void;
	handleLinkUpload: (a: string) => void;
};

const UploadCard: FC<Props> = ({
	showIllustration = true,
	handleFileUpload,
	handleLinkUpload,
}) => {
	const [showEnterLinkModal, setShowEnterLinkModal] = useState<boolean>(false);
	const [linkInputLink, setLinkInputLink] = useState<string>('');

	function handlePasteLink(e: ClipboardEvent) {
		if (showEnterLinkModal) return;
		e.preventDefault();

		const pastedText: string = e.clipboardData?.getData('text') || '';
		if (pastedText) {
			handleLinkUpload(pastedText);
			return;
		} else if (e.clipboardData?.files && e.clipboardData.files.length) {
			handleFileUpload(e.clipboardData.files);
		}

		// console.log(e.clipboardData?.getData('files'), e);
	}
	useEffect(() => {
		document.addEventListener('paste', handlePasteLink);

		return () => {
			document.removeEventListener('paste', handlePasteLink);
		};
	}, [showEnterLinkModal, handleLinkUpload, handleFileUpload]);

	return (
		//
		<div className=''>
			{/* modal */}
			{showEnterLinkModal && (
				<div className='fixed z-[80] inset-0 bg-[#0008] flex justify-center items-center p-6'>
					<form
						className='bg-white w-full rounded-md px-6 py-6 max-w-[308px] mx-auto'
						onSubmit={(e) => {
							e.preventDefault();
							handleLinkUpload(linkInputLink);
							setShowEnterLinkModal(false);
						}}
					>
						<label
							htmlFor='linkInput'
							className='text-txtClr mb-2 block font-medium'
						>
							Enter link or data url
						</label>
						<input
							className='border border-[#C0C4C3] outline-none block w-full px-3 py-1 rounded-md mb-5 text-txtClr'
							id='linkInput'
							type='text'
							autoFocus
							onChange={(e) => setLinkInputLink(e.target.value)}
						/>
						<div className='flex justify-end'>
							<button
								type='button'
								className='px-4 text-grayTxt font-medium'
								onClick={(e) => {
									e.preventDefault();
									setShowEnterLinkModal(false);
								}}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-4 py-2 bg-prim rounded-md outline-none text-white font-medium'
							>
								Upload
							</button>
						</div>
					</form>
				</div>
			)}
			<main
				id='upload_card'
				className='bg-white shadow-uploadCardShadow rounded-md overflow-hidden w-full relative z-0'
			>
				{/* oval */}
				<div className='absolute bg-[#E8FAF9] w-[461px] h-[461px]  rounded-full top-1/2 -translate-y-1/2 -translate-x-[57%] left-0 opacity-50 z-0'></div>
				{/* dots */}
				<div className=''>
					{/* dot */}
					{cardDots.map((dot) => {
						return (
							<span
								key={dot.id}
								style={{
									background: dot.bg,
									bottom: dot.bottom,
									top: dot.top,
									left: dot.left,
									right: dot.right,
									width: dot.size,
									height: dot.size,
								}}
								className={`block absolute rounded-full z-10`}
								// className='block absolute bg-[#000] w-[13px] h-[13px] top-[82px] right-[60px]'
							></span>
						);
					})}
				</div>
				<div className='pt-9 pb-5 px-5 flex flex-col items-center relative z-20'>
					{showIllustration && (
						<img
							src={uploadingIllustration}
							className='w-full max-w-[143px] mb-4'
							alt='uploading illustration'
						/>
					)}
					{/* upload img btn */}
					<div
						className={`${
							showIllustration ? 'mb-12' : 'mb-8'
						} flex flex-col items-center`}
					>
						<label
							htmlFor='upload_img_hidden_input'
							className='py-2 px-4 bg-prim text-white rounded-md text-base font-medium mb-3'
						>
							Upload Image
						</label>
						<input
							type='file'
							hidden
							id='upload_img_hidden_input'
							className='hidden'
							onChange={(e) => {
								if (!e.target.files || !e.target.files.length) return;
								handleFileUpload(e.target.files);
								e.target.value = ''; // reseting input field
							}}
						/>
						<span className='text-sm font-medium text-grayTxt'>
							Or drop a file
						</span>
					</div>
					{/* paste a link or img */}
					<div className='flex gap-2 items-center'>
						<span
							className='text-xs font-medium text-grayTxt cursor-pointer'
							onClick={() => setShowEnterLinkModal(true)}
						>
							Paste image or{' '}
							<span className='underline font-semibold'>URL</span>
						</span>
						<div className='flex gap-1 items-center'>
							<span className='py-[0.125rem] px-3 bg-[#EAECEC] rounded-[0.125rem] text-xs font-normal text-[#435857]'>
								ctrl
							</span>
							<span className='text-[#435857] text-xs font-normal'>+</span>
							<span className='py-[0.125rem] px-3 bg-[#EAECEC] rounded-[0.125rem] text-xs font-normal text-[#435857] '>
								v
							</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default UploadCard;
