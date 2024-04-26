'use strict';

gabize.addEventListener('submit', async ev => {
	ev.preventDefault();
	const image = await new Promise(res => {
		const image = new Image();
		image.addEventListener('load',
			_ => res(image));
		const reader = new FileReader();
		reader.addEventListener('load',
			_ => image.src = reader.result);
		reader.readAsDataURL(gabi.files[0]);
	});
	const canvas = new OffscreenCanvas(image.width, image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0);
	const blob = await canvas.convertToBlob({
		type: 'image/jpeg',
		quality: +level.value,
	});
	image.src = await new Promise(res => {
		const reader = new FileReader();
		reader.addEventListener('load',
			_ => res(reader.result));
		reader.readAsDataURL(blob);
	});
	document.body.append(image);

	return false;
});
