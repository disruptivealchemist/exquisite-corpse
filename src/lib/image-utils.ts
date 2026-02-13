export async function stitchImages(
  headSrc: string,
  bodySrc: string,
  legsSrc: string
): Promise<string> {
  const [headImg, bodyImg, legsImg] = await Promise.all([
    loadImage(headSrc),
    loadImage(bodySrc),
    loadImage(legsSrc),
  ]);

  const width = 512;
  const sections = [headImg, bodyImg, legsImg].map((img) => {
    const scale = width / img.width;
    return { img, height: Math.round(img.height * scale) };
  });

  const totalHeight = sections.reduce((sum, s) => sum + s.height, 0);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = totalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create canvas context');

  let y = 0;
  for (const { img, height } of sections) {
    ctx.drawImage(img, 0, y, width, height);
    y += height;
  }

  return canvas.toDataURL('image/png');
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

export function downloadImage(dataUri: string, filename = 'exquisite-creature.png') {
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
