import { Link } from "react-router-dom";
import heroImg from "../../assets/img/hero-2.jpg";

const HeroProduct = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Cozer"
        className="w-full h-[290px] md:h-[320px] lg:h-[370px] object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-3xl md:text-5xl tracking-tighter">Products</h1>
      </div>
    </section>
  );
};

export default HeroProduct;
