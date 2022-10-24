import { FC, ReactNode, useState } from 'react';

const HightlightedText: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<span className='px-3 text-[hsl(166,42%,26%)] bg-[hsl(166,24%,96%)] rounded'>
			{children}
		</span>
	);
};

interface Props {
	onClose: () => void;
}

const ManualModal: FC<Props> = ({ onClose }) => {
	const [activeNav, setActiveNav] = useState<'about' | 'how_to_use'>('about');
	const aboutIsActive = activeNav === 'about';
	const howToUseIsActive = activeNav === 'how_to_use';
	return (
		<div className='fixed inset-0 bg-[#00000040] z-50 py-4 overflow-auto grid place-items-center'>
			<div className='bg-white rounded-xl w-full h-fit max-w-[407px] py-5 px-9'>
				<nav className='flex mb-5'>
					<div
						className={`p-2 flex-1 text-center relative overflow-hidden transition duration-200 cursor-pointer ${
							aboutIsActive ? 'bg-[hsl(166,76%,95%)]' : ''
						}`}
						onClick={() => setActiveNav('about')}
					>
						<span
							className={`font-semibold text-xl ${
								aboutIsActive
									? 'text-[hsl(166,33%,30%)]'
									: 'text-[hsl(166,12%,47%)]'
							}`}
						>
							About
						</span>
						<i
							className={`block transition-transform duration-200 w-full h-[0.125rem] bg-prim absolute bottom-0 right-0 ${
								aboutIsActive ? 'translate-x-0' : 'translate-x-full'
							}`}
						></i>
					</div>

					<div
						className={`p-2 flex-1 text-center relative overflow-hidden transition duration-200 cursor-pointer ${
							howToUseIsActive ? 'bg-[hsl(166,76%,92%)]' : ''
						}`}
						onClick={() => setActiveNav('how_to_use')}
					>
						<span
							className={`font-semibold text-xl   ${
								howToUseIsActive
									? 'text-[hsl(166,33%,30%)]'
									: 'text-[hsl(166,12%,47%)]'
							}`}
						>
							How To Use
						</span>
						<i
							className={`block transition-transform duration-200 w-full h-[0.125rem] bg-prim absolute bottom-0 left-0 ${
								howToUseIsActive ? '-translate-x-0' : '-translate-x-full'
							}`}
						></i>
					</div>
				</nav>

				{aboutIsActive && (
					<div className='mb-5'>
						<p className='text-base mb-3 text-txtClr'>
							This is a Web app created by{' '}
							<HightlightedText>Dynasty Aigbomian</HightlightedText> for
							removing backgrounds from images as a personal reactjs project.
							<br />
							Inspiration was gotten from{' '}
							<a
								target={'_blank'}
								className='underline text-prim '
								href='https://www.remove.bg/'
							>
								remove.bg
							</a>
						</p>
						<h3 className='font-medium text-lg text-h1Clr mb-2 text-txtClr'>
							Technologies Used
						</h3>
						<div className='flex flex-wrap gap-3 mb-4'>
							{['Tailwind CSS', 'HTML5', 'React', 'Typescript'].map(
								(techUsed) => {
									return (
										<HightlightedText key={techUsed}>
											{techUsed}
										</HightlightedText>
									);
								}
							)}
						</div>
						{/* <h3 className='font-medium text-lg text-h1Clr mb-1'>Follow me</h3>
						<div className='flex flex-wrap gap-3'></div> */}
					</div>
				)}

				{howToUseIsActive && (
					<div className=' mb-5'>
						<p className='text-base mb-3 text-txtClr'>
							Click on the upload button and upload an image file.
							<br />
							<span className='font-medium'>OR</span>
							<br /> Paste an image file / link to an image.
							<br />
							<span className='font-medium'>OR</span>
							<br /> Click on the "Paste an image or URL" text to enter a link
							to an image.
							<br />
							The accepted image formats are:{' '}
							<span className='font-medium'>jpeg, png, jpg</span>
						</p>
						<h3 className='font-medium text-lg  text-txtClr mb-1'>
							Keyboard shortcuts
						</h3>
						<ul className=' text-txtClr '>
							<li className='mb-2'>
								Press <HightlightedText>Ctrl</HightlightedText>+
								<HightlightedText>v</HightlightedText> to paste image file or
								link to an image.
							</li>
						</ul>
					</div>
				)}

				<div className='  w-fit ml-auto'>
					<button
						type='submit'
						onClick={() => onClose()}
						className='px-4 py-2 bg-prim rounded-md outline-none text-white font-medium'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default ManualModal;
