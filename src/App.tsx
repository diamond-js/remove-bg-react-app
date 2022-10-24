import React, { FC, useState } from 'react';
import TestImages from './components/TestImages/Index';
import UploadCard from './components/UploadCard/Index';
import UploadedImage from './components/UploadedImage/Index';
import './index.css';
import { Uplaoded_Images, Uploaded_Image } from './types/types';
import { allowedFilesForUpload } from './utils/constants';
import isUrl from 'is-url';
import HowToUse from './components/HowToUse/Index';

const App: FC = () => {
	const [isDraging, setIsDraging] = useState<boolean>(false);
	const [imagesUploaded, setImagesUploaded] = useState<Uplaoded_Images>([]);

	function addToImagesUploadedArray(uploadedImg: Uploaded_Image) {
		setImagesUploaded([uploadedImg, ...imagesUploaded]);
	}

	function handleFileUpload(files: FileList) {
		// check if any file was uploaded
		if (files.length < 1) return;
		//check if file type is allowed
		//strings in the allowedFilesForUpload array are all lowercase
		if (!allowedFilesForUpload.includes(files[0].type.toLocaleLowerCase()))
			return;
		const file = files[0];
		const imgLink = URL.createObjectURL(file);

		addToImagesUploadedArray({
			id: file.name + file.size + Math.random(),
			uploadedImgLinkOrDataURL: imgLink,
			imageFile: file,
			uploadType: 'IMAGE_FILE',
		});
	}

	function handleLinkUpload(linkOrDataUrl: string) {
		if (!linkOrDataUrl) return;
		if (!isUrl(linkOrDataUrl)) {
			alert('invalid url');
			return;
		}

		addToImagesUploadedArray({
			id: '__link' + Math.random() + Math.random(),
			uploadedImgLinkOrDataURL: linkOrDataUrl,
			uploadType: 'IMAGE_LINK',
		});
	}

	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();
		setIsDraging(false);

		handleFileUpload(e.dataTransfer.files);
	}

	function removeImg(imageId: string) {
		const newImagesList = imagesUploaded.filter((img) => img.id !== imageId);
		setImagesUploaded(newImagesList);
	}
	return (
		<div
			className='px-8 py-11 relative h-screen max-h-screen overflow-auto'
			onDragEnter={(e) => {
				e.preventDefault();
				e.stopPropagation();
				setIsDraging(true);
			}}
			onDragOver={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			onDrop={handleDrop}
		>
			{isDraging && (
				<div className='fixed top-0 left-0 w-full h-full bg-[#0e2624] z-10 text-6xl text-white font-semibold flex items-center justify-center opacity-90'>
					Drop Image Anywhere
				</div>
			)}

			<h1 className='text-[#2C4947] font-semibold mb-7 text-sm text-center'>
				Upload an image to remove the background
			</h1>

			<div
				className={`max-w-[308px] mx-auto ${
					imagesUploaded.length < 1 ? 'mb-12' : 'mb-8'
				}`}
			>
				<UploadCard
					showIllustration={imagesUploaded.length < 1}
					handleFileUpload={handleFileUpload}
					handleLinkUpload={handleLinkUpload}
				/>
			</div>

			<div className='flex justify-center'>
				{imagesUploaded.length < 1 && (
					<TestImages handleLinkUpload={handleLinkUpload} />
				)}
			</div>

			<div className='max-w-[308px] mx-auto'>
				{imagesUploaded.map((img) => {
					return (
						<div
							className='mb-6'
							key={img.id}
						>
							<UploadedImage
								// key={img.id}
								removeImg={removeImg}
								img={img}
							/>
						</div>
					);
				})}
			</div>

			{/* how to use */}
			<div className='fixed right-6 bottom-6 z-[100]'>
				<HowToUse />
			</div>
		</div>
	);
};

export default App;
