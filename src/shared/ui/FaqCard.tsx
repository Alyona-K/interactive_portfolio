import React from "react";
import { useTranslation } from "react-i18next";
import "./FaqCard.scss";

interface FaqCardProps {
  id: string;
  index: number;
  questionKey: string;
  answerKey: string;
  currentLang: string;
}

export const FaqCard: React.FC<FaqCardProps> = ({
  id,
  index,
  questionKey,
  answerKey,
}) => {
  const { t } = useTranslation("faq");

  const isOdd = index % 2 !== 0;

  return (
    <div className={`faq-card ${isOdd ? "faq-card--odd" : ""}`} data-id={id} data-testid={id}>
      <div className={`faq-card__question ${isOdd ? "faq-card__question--odd" : ""}`}>
        <p className="faq-card__question-text">{t(questionKey)}</p>
      </div>
      <div className="faq-card__answer">
        <p className="faq-card__answer-text">{t(answerKey)}</p>
      </div>
    </div>
  );
};

export default FaqCard;

//-------

// import React from "react";
// import { useTranslation } from "react-i18next";
// import "./FaqCard.scss";

// interface FaqCardProps {
//   id: string;
//   index: number;
//   questionKey: string;
//   answerKey: string;
//   // currentLang: string;
// }

// export const FaqCard: React.FC<FaqCardProps> = ({
//   id,
//   index,
//   questionKey,
//   answerKey,
//   // currentLang,
// }) => {
//   const { t } = useTranslation("faq");
  
//   const isOdd = index % 2 !== 0;

//   // перерендер при смене языка
//   // React.useEffect(() => {}, [currentLang]);

//   return (
//     <div className={`faq-card ${isOdd ? "faq-card--odd" : ""}`} data-id={id}>
//       <div
//         className={`faq-card__question ${isOdd ? "faq-card__question--odd" : ""}`}
//       >
//         <p className="faq-card__question-text">{t(questionKey)}</p>
//       </div>

//       <div className="faq-card__answer">
//         <p className="faq-card__answer-text">{t(answerKey)}</p>
//       </div>
//     </div>
//   );
// };

// export default FaqCard;
