import { Link } from "react-router-dom";
import heroImg from "../../assets/img/hero-2.jpg";

const Hero = ({ title }) => {
  return (
    <section className="relative group">
      <img
        src={heroImg}
        alt="Cozer"
        className="w-full h-[390px] md:h-[480px] lg:h-[570px] object-fill transition-all duration-700 ease-in-out brightness-100 group-hover:brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase transition-transform duration-500 ease-in-out transform translate-y-1/2 group-hover:-translate-y-10">
          {title}
        </h1>
        <p className="text-lg tracking-tighter md:text-2xl mb-12 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-10 group-hover:translate-y-0">
          3 Angles - 5 Colors Options
        </p>
        <Link
          to="#"
          className="bg-white text-gray-950 px-18 py-3 rounded text-lg opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-10 group-hover:translate-y-0 uppercase hover:bg-gray-300"
        >
          Explore
        </Link>
      </div>
    </section>
  );
};

export default Hero;
