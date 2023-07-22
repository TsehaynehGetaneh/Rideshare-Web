import Image from "next/image";
import data from "@/data/landing-page/about.json";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center pt-16"
    >
      <h1
        data-cy="title"
        className="text-3xl m-5 font-bold w-full md:w-1/2 text-center"
      >
        Who are we?
      </h1>
      {/* image and about section  */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-20 mb-10 mx-12 my-12">
        <Image
          src="/images/landing-page/about.png"
          alt="image"
          width={500}
          height={700}
          data-cy="about-image"
        />
        <div className="mt-10 md:mt-35 lg:mt-40">
          <p data-cy="about-text" className="text-xl max-w-md">
            {data.about}
          </p>
        </div>
      </div>
      {/* vision and mission section */}
      <div className="flex flex-col md:flex-row gap-12 mx-12 mb-20">
        <div className="w-full md:w-1/2 px-8">
          <h1
            data-cy="vision-text"
            className="text-2xl text-primary mb-4 font-bold text-center md:text-left pl-0 md:pl-20 lg:pl-40"
          >
            Vision
          </h1>
          <p data-cy="vision-description" className="pr-0 lg:pr-20 text-xl">
            {data.vision}
          </p>
        </div>
        <div className="w-full md:w-1/2 px-8">
          <h1
            data-cy="mission-text"
            className="text-2xl text-primary mb-4 font-bold text-center md:text-left pl-0 md:pl-20 lg:pl-40"
          >
            Mission
          </h1>
          <p data-cy="mission-description" className="pr-0 lg:pr-20 text-xl">
            {data.mission}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
