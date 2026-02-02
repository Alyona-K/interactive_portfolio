import React from "react";
import { motion, Variants, cubicBezier } from "framer-motion";
import sprite from "@/assets/images/sprite.svg";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

// --- FRAMER MOTION VARIANTS ---
// Variants for backdrop fade-in/out animation
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Variants for modal content animation with easing
const modalVariants: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: cubicBezier(0.25, 0.1, 0.25, 1), // Custom easing curve for smooth animation
    },
  },
  exit: { opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.2 } },
};

/**
 * Modal component
 * Handles rendering of modal with animated backdrop and content
 * Uses Framer Motion for enter/exit animations
 * @param isOpen controls visibility
 * @param onClose optional callback for closing modal
 * @param title optional modal title
 * @param children modal body content
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Early return avoids unnecessary rendering and animation
  if (!isOpen) return null;

  return (
    <motion.div
      className="modal__backdrop"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
    >
      <motion.div className="modal__content" variants={modalVariants}>
        <div className="modal__header">
          <h3 className="modal__header-text">{title}</h3>
          {onClose && (
            <button className="modal__close" aria-label="close" onClick={onClose}>
              <svg className="modal__close-icon" width={22} height={22}>
                <use xlinkHref={`${sprite}#close-icon`} />
              </svg>
            </button>
          )}
        </div>
        <div className="modal__body">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;


//------------

// import React from "react";
// import { motion, Variants, cubicBezier } from "framer-motion";
// import sprite from "@/assets/images/sprite.svg";
// import "./Modal.scss";

// interface ModalProps {
//   isOpen: boolean;
//   onClose?: () => void;
//   title?: string;
//   children: React.ReactNode;
// }

// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

// const modalVariants: Variants = {
//   hidden: { opacity: 0, y: -20, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.25,
//       ease: cubicBezier(0.25, 0.1, 0.25, 1),
//     },
//   },
//   exit: { opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.2 } },
// };

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <motion.div
//       className="modal__backdrop"
//       initial="hidden"
//       animate="visible"
//       exit="hidden"
//       variants={backdropVariants}
//     >
//       <motion.div className="modal__content" variants={modalVariants}>
//         <div className="modal__header">
//           <h3 className="modal__header-text">{title}</h3>
//           {onClose && (
//             <button className="modal__close" aria-label="close" onClick={onClose}>
//               <svg className="modal__close-icon" width={22} height={22}>
//                 <use xlinkHref={`${sprite}#close-icon`} />
//               </svg>
//             </button>
//           )}
//         </div>
//         <div className="modal__body">{children}</div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Modal;

