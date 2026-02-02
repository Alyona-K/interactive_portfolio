import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "@/shared/ui/Modal";
import sprite from "@/assets/images/sprite.svg";
import "./ContactFormResultModal.scss";

interface Props {
  isOpen: boolean;
  result: "success" | "error" | null;
  onClose: () => void;
}

const ContactFormResultModal: React.FC<Props> = ({
  isOpen,
  result,
  onClose,
}) => {
  const { t } = useTranslation("common");

  if (!result) return null;

  const isSuccess = result === "success";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        isSuccess
          ? t("formMessages.successTitle")
          : t("formMessages.errorTitle")
      }
    >
      <div
        className={`contact-result contact-result--${
          isSuccess ? "success" : "error"
        }`}
      >
        <svg className="contact-result__icon" width={70} height={70}>
          <use
            xlinkHref={`${sprite}#${isSuccess ? "icon-success" : "icon-error"}`}
          />
        </svg>

        <p className="contact-result__text">
          {isSuccess ? t("formMessages.success") : t("formMessages.error")}
        </p>
      </div>
    </Modal>
  );
};

export default ContactFormResultModal;
