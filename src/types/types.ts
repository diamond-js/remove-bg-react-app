export type Uplaoded_Images = Uploaded_Image[];
export type dots = dot[];

export interface Uploaded_Image {
	id: string;
	// type: 'IMAGE_DATAURL' | 'IMAGE_URL';
	// removedBgImgLink: string; // can either be a link to an image or an image base64 string
	uploadedImgLinkOrDataURL?: string; // can either be a link to an image or an image base64 string(DataURL)
	imageFile?: File;
	uploadType: 'IMAGE_LINK' | 'IMAGE_FILE'; // IMAGE_LINK: user pasted an img. IMAGE_FILE: user uploaded a file either through drag and drop or by selecting a file
}

export interface dot {
	id: string;
	bg: string;
	size: string;
	right?: string;
	left?: string;
	top?: string;
	bottom?: string;
}
