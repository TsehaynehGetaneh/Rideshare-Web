import React from "react";

interface TextSectionProps {
  count: string | number;
  heading: string;
  paragraph: string;
}

const TextSection: React.FC<TextSectionProps> = ({
  count,
  heading,
  paragraph,
}) => {
  return (
    <div className="m-8 max-w-3xl ">
      <h2 className="text-3xl font-bold mb-4 mt-2 font-piazzolla">
        <span className="text-primary">{count}</span>
        {heading}
      </h2>
      <p className="text-lg mt-2 text-poppins">{paragraph}</p>
    </div>
  );
};

export default TextSection;
