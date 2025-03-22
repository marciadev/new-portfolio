import React from "react";
import bgImg from "../assets/bg-img-3.jpg";

function Home() {
  return (
    <section className="relative w-full h-full overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
      </div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <p className="mt-4 max-w-lg sm:text-xl/relaxed">Marcia Leite</p>
          <h1 className="text-8xl font-extrabold bg-gradient-to-r from-purple-700 via-violet-400 to-violet-300 bg-clip-text text-transparent">
            Frontend
            <strong className="sm:block text-3xl block text-black">
              {" "}
              Developer{" "}
            </strong>
          </h1>
          <div className="mt-8 flex flex-wrap gap-4 text-center"></div>
        </div>
      </div>
    </section>
  );
}

export default Home;
