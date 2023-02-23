import React from "react";

type CustomImageProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

const CustomImage: React.FC<CustomImageProps> = ({ alt = "", loading = "lazy", ...props }) => {
	return <img alt={alt} loading={loading} {...props} />;
};

export default CustomImage;
