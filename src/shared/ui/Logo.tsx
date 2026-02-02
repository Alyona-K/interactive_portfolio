import React from "react";
import sprite from "@/assets/images/sprite.svg";
import "./Logo.scss";

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`logo ${className || ""}`}>
      <div className="logo__wrap">
        <svg className="logo__part-1" width={17} height={7}>
          <use xlinkHref={`${sprite}#logo-part-1`} />
        </svg>
        <svg className="logo__part-2" width={62} height={31}>
          <use xlinkHref={`${sprite}#logo-part-2`} />
        </svg>
        <svg className="logo__part-3" width={22} height={33}>
          <use xlinkHref={`${sprite}#logo-part-3`} />
        </svg>
      </div>
    </div>
  );
};
