import React from "react";
import Image from "next/image";

interface BenefitsImageProps {
  image: string;
}
const BenefitsImage: React.FC<BenefitsImageProps> = ({ image }) => {
  return (
    <div className="relative inline-block  " data-testid="image">
      <Image
        width={352}
        height={362}
        className="aspect-auto"
        src={`/images/landing-page/benefits/${image}`}
        alt="image"
      />
    </div>
  );
};

export default BenefitsImage;
