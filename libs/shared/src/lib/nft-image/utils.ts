const PREFIX = 'ipfs://';

export function getImageUrl(image: string | undefined): string {
  return `https://ipfs.io/ipfs/${image?.replace(PREFIX, '')}`;
}
