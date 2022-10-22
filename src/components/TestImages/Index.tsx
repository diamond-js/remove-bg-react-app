import { FC } from 'react';
import testImg1 from '../../assets/images/test_images/test_image01.png';
import testImg2 from '../../assets/images/test_images/test_image02.png';
import testImg3 from '../../assets/images/test_images/test_image03.png';
import testImg4 from '../../assets/images/test_images/test_image04.png';

type Props = {
	handleLinkUpload: (a: string) => void;
};

const TestImages: FC<Props> = function ({ handleLinkUpload }) {
	return (
		<div className='flex gap-2 items-center'>
			<span className='text-xs font-normal text-grayTxt'>
				No Image? <br /> Try one of these:
			</span>
			<div className='flex gap-[0.375rem]'>
				{[
					'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=600',
					'https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=600',
					'https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress&cs=tinysrgb&w=600',
				].map((img, index) => {
					return (
						<div
							key={index}
							className='test_img bg-[#EAECEC] rounded-sm'
							onClick={() => handleLinkUpload(img)}
						>
							<img
								src={img}
								alt='try this image'
								className='h-8 rounded-sm'
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TestImages;
