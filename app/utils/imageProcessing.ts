import sharp from 'sharp';

export async function resizeAndLimitImage(imageBuffer: Buffer): Promise<Buffer> {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Unable to get image dimensions');
  }

  const maxDimension = 1048;
  let resizeOptions = {};

  if (metadata.width > maxDimension || metadata.height > maxDimension) {
    resizeOptions = {
      width: maxDimension,
      height: maxDimension,
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    };
  }

  return image
    .resize(resizeOptions)
    .toBuffer();
}