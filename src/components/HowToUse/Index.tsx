import React, { useState } from 'react';
import ManualModal from '../ManualModal/ManualModal';
import questionMarkIcon from './questionMark.svg';

type Props = {};

function HowToUse({}: Props) {
	const [showManualModal, setshowManualModal] = useState<boolean>(false);
	return (
		<>
			{showManualModal && (
				<ManualModal onClose={() => setshowManualModal(false)} />
			)}

			<button
				onClick={() => setshowManualModal(true)}
				className='bg-hightlight rounded-full outline-none  p-2'
			>
				<img
					src={questionMarkIcon}
					alt='How to use'
				/>
			</button>
		</>
	);
}

export default HowToUse;
