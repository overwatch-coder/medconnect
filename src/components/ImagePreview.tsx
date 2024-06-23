import Image from "next/image";

type ImagePreviewProps = {
  image: string;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return (
    <Image
      src={image}
      alt="Preview"
      loading="lazy"
      quality={100}
      width={60}
      height={60}
      className="rounded object-contain w-28 h-28"
    />
  );
};

export default ImagePreview;
