import React, { useState } from "react";
import "./Slider.css";
import dataSlider from "./dataSlider";
import BtnSlider from "./BtnSlider";

export default function Slider() {
  const [slideAnim, setSlideAnim] = useState({
    index: 1,
    inProgress: false,
  });

  const nextSlide = () => {
    if (slideAnim.index !== dataSlider.length && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index + 1, inProgress: true });

      setTimeout(() => {
        // accès à l'ancien state dû au setTimeout
        setSlideAnim({ index: slideAnim.index + 1, inProgress: false });
      }, 400);
    } else if (slideAnim.index === dataSlider.length && !slideAnim.inProgress) {
      setSlideAnim({ index: 1, inProgress: true });

      setTimeout(() => {
        // accès à l'ancien state dû au setTimeout
        setSlideAnim({ index: 1, inProgress: false });
      }, 400);
    }
  };

  const prevSlide = () => {
    if (slideAnim.index !== 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index - 1, inProgress: true });

      setTimeout(() => {
        // accès à l'ancien state dû au setTimeout
        setSlideAnim({ index: slideAnim.index - 1, inProgress: false });
      }, 400);
    } else if (slideAnim.index === 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: 5, inProgress: true });

      setTimeout(() => {
        // accès à l'ancien state dû au setTimeout
        setSlideAnim({ index: 5, inProgress: false });
      }, 400);
    }
  };

  const moveDot = (index) => {
    setSlideAnim({ index: index, inProgress: false });
  };

  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={
              slideAnim.index === index + 1 ? "slide active-anim" : "slide"
            }
          >
            {/* avant de mettre en ligne (hébergement etc) mettre process.env.PUBLIC_URL +
            pour les liens vers sous-dossiers dans dossier "public" pour que ça fonctionne en mode production
            */}
            <img
              src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`}
              alt="slide"
            />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"}></BtnSlider>
      <BtnSlider moveSlide={prevSlide} direction={"prev"}></BtnSlider>

      <div className="container-dots">
        {/*  Création d'un tableau à la volée d'une longuer de 5 ; ça créé un tableau d'un longueur de 5 avec chaqué élément qui vaut undefined */}
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <div
              key={index}
              className={slideAnim.index === index + 1 ? "dot active" : "dot"}
              // ici tjs mettre fonction anonyme car on passe des arguments dans celle-ci
              onClick={() => moveDot(index + 1)}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
