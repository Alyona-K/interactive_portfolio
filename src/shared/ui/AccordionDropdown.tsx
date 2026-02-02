import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/shared/ui/Portal";
import sprite from "@/assets/images/sprite.svg";
import { SkillNode } from "@/entities/skills/model/skills.types";
import "./AccordionDropdown.scss";

interface AccordionProps {
  items: SkillNode[];
  level?: number;
  multiple?: boolean;
  levelIcons?: Record<number, string>;
  isOpen?: boolean; 
  onToggle?: () => void;
}

/**
 * AccordionDropdown component
 * - Handles nested dropdowns of skill items
 * - Root-level dropdowns can be controlled externally via isOpen/onToggle
 * - Child levels maintain internal open state
 */
export const AccordionDropdown = ({
  items,
  level = 1,
  multiple = false,
  levelIcons = {},
  isOpen,
  onToggle,
}: AccordionProps) => {
  const { t } = useTranslation("skills");
  const [openIds, setOpenIds] = useState<string[]>([]);
  const isRoot = level === 1;

  const toggleItem = (id: string) => {
    // Root-level toggle delegates control to parent handler if provided
    if (isRoot && onToggle) {
      onToggle();
      return;
    }

    // Manage open state for child items
    setOpenIds((prev) => {
      const alreadyOpen = prev.includes(id);
      if (multiple) {
        return alreadyOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return alreadyOpen ? [] : [id];
    });
  };

  return (
    <div className={`dd dd-level-${level}`}>
      {items.map((item) => {
        const iconId = levelIcons[level] || "arrow-circle-down-icon";
        const isOpenItem =
          isRoot && isOpen !== undefined ? isOpen : openIds.includes(item.id);

        const buttonRef = useRef<HTMLButtonElement>(null);
        const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

        // --- CALCULATE DROPDOWN POSITION FOR ROOT LEVEL ---
        useEffect(() => {
          if (!isRoot || !isOpenItem || !buttonRef.current) return;

          const updatePosition = () => {
            const rect = buttonRef.current!.getBoundingClientRect();
            setDropdownPos({
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
            });
          };

          updatePosition();

          window.addEventListener("scroll", updatePosition);
          window.addEventListener("resize", updatePosition);

          // Cleanup listeners on unmount or closure
          return () => {
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
          };
        }, [isRoot, isOpenItem]);

        const dropdownContent = (
          <motion.div
            className={`dd__dropdown`}
            data-testid={isRoot ? `${item.id}-content` : undefined}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={
              // Absolute positioning only for root-level dropdowns
              isRoot
                ? {
                    position: "absolute",
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: buttonRef.current?.offsetWidth,
                    zIndex: 1000,
                  }
                : {}
            }
          >
            {item.contentKey && (
              <ul className="dd__list">
                {(t(item.contentKey, { returnObjects: true }) as string[]).map(
                  (text, idx) => (
                    <li className="dd__item" key={idx}>{text}</li>
                  )
                )}
              </ul>
            )}

            {item.children && item.children.length > 0 && (
              <AccordionDropdown
                items={item.children}
                level={level + 1}
                multiple={multiple}
                levelIcons={{
                  1: "arrow-circle-down-icon",
                  2: "arrow-circle-icon",
                  3: "arrow-down-icon",
                }}
              />
            )}
          </motion.div>
        );

        return (
          <div key={item.id} className="dd__item">
            <button
              ref={buttonRef}
              className={`dd__header ${isOpenItem ? "open" : ""}`}
              onClick={() => toggleItem(item.id)}
              data-testid={isRoot ? `${item.id}-toggle` : undefined}
            >
              {t(item.titleKey)}
              <svg
                className={`dd__arrow ${isOpenItem ? "open" : ""}`}
                width={20}
                height={20}
              >
                <use xlinkHref={`${sprite}#${iconId}`} />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpenItem &&
                // Use portal only for root-level dropdowns to prevent overflow clipping
                (isRoot ? <Portal>{dropdownContent}</Portal> : dropdownContent)}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

//--------------

// import { useState, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { motion, AnimatePresence } from "framer-motion";
// import { Portal } from "@/shared/ui/Portal";
// import sprite from "@/assets/images/sprite.svg";
// import { SkillNode } from "@/entities/skills/model/skills.types";
// import "./AccordionDropdown.scss";

// interface AccordionProps {
//   items: SkillNode[];
//   level?: number;
//   multiple?: boolean;
//   levelIcons?: Record<number, string>;
//   isOpen?: boolean; // только для level === 1
//   onToggle?: () => void;
// }

// export const AccordionDropdown = ({
//   items,
//   level = 1,
//   multiple = false,
//   levelIcons = {},
//   isOpen,
//   onToggle,
// }: AccordionProps) => {
//   const { t } = useTranslation("skills");
//   const [openIds, setOpenIds] = useState<string[]>([]);
//   const isRoot = level === 1;

//   const toggleItem = (id: string) => {
//     if (isRoot && onToggle) {
//       onToggle();
//       return;
//     }

//     setOpenIds((prev) => {
//       const alreadyOpen = prev.includes(id);
//       if (multiple) {
//         return alreadyOpen ? prev.filter((x) => x !== id) : [...prev, id];
//       }
//       return alreadyOpen ? [] : [id];
//     });
//   };

//   return (
//     <div className={`dd dd-level-${level}`}>
//       {items.map((item) => {
//         const iconId = levelIcons[level] || "arrow-circle-down-icon";
//         const isOpenItem =
//           isRoot && isOpen !== undefined ? isOpen : openIds.includes(item.id);

//         const buttonRef = useRef<HTMLButtonElement>(null);
//         const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

//         // рассчитываем позицию дропдауна только для уровня 1
//         useEffect(() => {
//           if (!isRoot || !isOpenItem || !buttonRef.current) return;

//           const updatePosition = () => {
//             const rect = buttonRef.current!.getBoundingClientRect();
//             setDropdownPos({
//               top: rect.bottom + window.scrollY,
//               left: rect.left + window.scrollX,
//             });
//           };

//           updatePosition();

//           window.addEventListener("scroll", updatePosition);
//           window.addEventListener("resize", updatePosition);

//           return () => {
//             window.removeEventListener("scroll", updatePosition);
//             window.removeEventListener("resize", updatePosition);
//           };
//         }, [isRoot, isOpenItem]);

//         const dropdownContent = (
//           <motion.div
//             className={`dd__dropdown`}
//             data-testid={isRoot ? `${item.id}-content` : undefined}
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             style={
//               isRoot
//                 ? {
//                     position: "absolute",
//                     top: dropdownPos.top,
//                     left: dropdownPos.left,
//                     width: buttonRef.current?.offsetWidth,
//                     zIndex: 1000,
//                   }
//                 : {}
//             }
//           >
//             {item.contentKey && (
//               <ul className="dd__list">
//                 {(t(item.contentKey, { returnObjects: true }) as string[]).map(
//                   (text, idx) => (
//                     <li className="dd__item" key={idx}>{text}</li>
//                   )
//                 )}
//               </ul>
//             )}

//             {item.children && item.children.length > 0 && (
//               <AccordionDropdown
//                 items={item.children}
//                 level={level + 1}
//                 multiple={multiple}
//                 levelIcons={{
//                   1: "arrow-circle-down-icon",
//                   2: "arrow-circle-icon",
//                   3: "arrow-down-icon",
//                 }}
//               />
//             )}
//           </motion.div>
//         );

//         return (
//           <div key={item.id} className="dd__item">
//             <button
//               ref={buttonRef}
//               className={`dd__header ${isOpenItem ? "open" : ""}`}
//               onClick={() => toggleItem(item.id)}
//               data-testid={isRoot ? `${item.id}-toggle` : undefined}
//             >
//               {t(item.titleKey)}
//               <svg
//                 className={`dd__arrow ${isOpenItem ? "open" : ""}`}
//                 width={20}
//                 height={20}
//               >
//                 <use xlinkHref={`${sprite}#${iconId}`} />
//               </svg>
//             </button>

//             <AnimatePresence initial={false}>
//               {isOpenItem &&
//                 (isRoot ? <Portal>{dropdownContent}</Portal> : dropdownContent)}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

//----------

// import { useState, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { motion, AnimatePresence } from "framer-motion";
// import { Portal } from "@/shared/ui/Portal";
// import sprite from "@/assets/images/sprite.svg";
// import { SkillNode } from "@/entities/skills/model/skills.types";
// import "./AccordionDropdown.scss";

// interface AccordionProps {
//   items: SkillNode[];
//   level?: number;
//   multiple?: boolean;
//   levelIcons?: Record<number, string>;

//   // только для level === 1
//   isOpen?: boolean;
//   onToggle?: () => void;
// }

// export const AccordionDropdown = ({
//   items,
//   level = 1,
//   multiple = false,
//   levelIcons = {},
//   isOpen,
//   onToggle,
// }: AccordionProps) => {
//   const { t } = useTranslation("skills");
//   const [openIds, setOpenIds] = useState<string[]>([]);

//   const isRoot = level === 1;

//   const toggleItem = (id: string) => {
//     if (isRoot && onToggle) {
//       onToggle();
//       return;
//     }

//     setOpenIds((prev) => {
//       const isOpen = prev.includes(id);

//       if (multiple) {
//         return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
//       }

//       return isOpen ? [] : [id];
//     });
//   };

//   return (
//     <div className={`dd dd-level-${level}`}>
//       {items.map((item) => {
//         const iconId = levelIcons[level] || "arrow-circle-down-icon";

//         const isOpenItem =
//           isRoot && isOpen !== undefined ? isOpen : openIds.includes(item.id);

//         const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
//         const ref = useRef<HTMLButtonElement>(null);

//         useEffect(() => {
//           if (isOpenItem && ref.current) {
//             const rect = ref.current.getBoundingClientRect();
//             setDropdownPos({
//               top: rect.bottom + window.scrollY,
//               left: rect.left + window.scrollX,
//             });
//           }
//         }, [isOpenItem]);

//         return (
//           <div key={item.id} className="dd__item">
//             <button
//               className={`dd__header ${isOpenItem ? "open" : ""}`}
//               onClick={() => toggleItem(item.id)}
//             >
//               {t(item.titleKey)}
//               <svg
//                 className={`dd__arrow ${isOpenItem ? "open" : ""}`}
//                 width={20}
//                 height={20}
//               >
//                 <use xlinkHref={`${sprite}#${iconId}`} />
//               </svg>
//             </button>

//             <AnimatePresence initial={false}>
//               {isOpenItem && (
//                 <Portal>
//                   <motion.div
//                     className={`dd__dropdown`}
//                     style={
//                       level === 1
//                         ? {
//                             position: "absolute",
//                             top: dropdownPos.top,
//                             left: dropdownPos.left,
//                           }
//                         : {}
//                     }
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {item.contentKey && (
//                       <ul className="dd__list">
//                         {(
//                           t(item.contentKey, {
//                             returnObjects: true,
//                           }) as string[]
//                         ).map((text, idx) => (
//                           <li key={idx}>{text}</li>
//                         ))}
//                       </ul>
//                     )}

//                     {(item.children?.length ?? 0) > 0 && (
//                       <AccordionDropdown
//                         items={item.children ?? []}
//                         multiple={multiple}
//                         level={level + 1}
// levelIcons={{
//   1: "arrow-circle-down-icon",
//   2: "arrow-circle-icon",
//   3: "arrow-down-icon",
// }}
//                       />
//                     )}
//                   </motion.div>
//                 </Portal>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

//----------

// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { motion, AnimatePresence } from "framer-motion";
// import sprite from "@/assets/images/sprite.svg";
// import { SkillNode } from "@/entities/skills/model/skills.types";
// import "./AccordionDropdown.scss";

// interface AccordionProps {
//   items: SkillNode[];
//   level?: number;
//   multiple?: boolean;
//   levelIcons?: Record<number, string>;

//   // только для level === 1
//   isOpen?: boolean;
//   onToggle?: () => void;
// }

// export const AccordionDropdown = ({
//   items,
//   level = 1,
//   multiple = false,
//   levelIcons = {},
//   isOpen,
//   onToggle,
// }: AccordionProps) => {
//   const { t } = useTranslation("skills");
//   const [openIds, setOpenIds] = useState<string[]>([]);

//   const isRoot = level === 1;

//   const toggleItem = (id: string) => {
//     if (isRoot && onToggle) {
//       onToggle();
//       return;
//     }

//     setOpenIds((prev) => {
//       const isOpen = prev.includes(id);

//       if (multiple) {
//         return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
//       }

//       return isOpen ? [] : [id];
//     });
//   };

//   return (
//     <div className={`dd dd-level-${level}`}>
//       {items.map((item) => {
//         const iconId = levelIcons[level] || "arrow-circle-down-icon";

//         const isOpenItem =
//           isRoot && isOpen !== undefined ? isOpen : openIds.includes(item.id);

//         return (
//           <div key={item.id} className="dd__item">
//             <button
//               className={`dd__header ${isOpenItem ? "open" : ""}`}
//               onClick={() => toggleItem(item.id)}
//             >
//               {t(item.titleKey)}
//               <svg
//                 className={`dd__arrow ${isOpenItem ? "open" : ""}`}
//                 width={20}
//                 height={20}
//               >
//                 <use xlinkHref={`${sprite}#${iconId}`} />
//               </svg>
//             </button>

//             <AnimatePresence initial={false}>
//               {isOpenItem && (
//                 <motion.div
//                   className={`dd__dropdown ${level === 1 ? "absolute" : ""}`}
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {item.contentKey && (
//                     <ul className="dd__list">
//                       {(t(item.contentKey, { returnObjects: true }) as string[]).map(
//                         (text, idx) => (
//                           <li key={idx}>{text}</li>
//                         )
//                       )}
//                     </ul>
//                   )}

//                   {(item.children?.length ?? 0) > 0 && (
//                     <AccordionDropdown
//                       items={item.children ?? []}
//                       multiple={multiple}
//                       level={level + 1}
//                       levelIcons={{
//                         1: "arrow-circle-down-icon",
//                         2: "arrow-circle-icon",
//                         3: "arrow-down-icon",
//                       }}
//                     />
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

//--------

// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { motion, AnimatePresence } from "framer-motion";
// import sprite from "@/assets/images/sprite.svg";
// import { SkillNode } from "@/entities/skills/model/skills.types";
// import "./AccordionDropdown.scss";

// interface AccordionProps {
//   items: SkillNode[];
//   level?: number;
//   multiple?: boolean;
//   levelIcons?: Record<number, string>;
// }

// export const AccordionDropdown = ({
//   items,
//   level = 1,
//   multiple = false,
//   levelIcons = {},
// }: AccordionProps) => {
//   const { t } = useTranslation("skills");
//   // const [openId, setOpenId] = useState<string | null>(null);

//   // const toggle = (id: string) => {
//   //   setOpenId((prev) => (prev === id ? null : id));
//   // };

//   const [openIds, setOpenIds] = useState<string[]>([]);

// const toggle = (id: string) => {
//   setOpenIds((prev) => {
//     const isOpen = prev.includes(id);

//     if (multiple) {
//       return isOpen
//         ? prev.filter((x) => x !== id)
//         : [...prev, id];
//     }

//     return isOpen ? [] : [id];
//   });
// };

// useEffect(() => {
//   if (!multiple) {
//     setOpenIds([]);
//   }
// }, [multiple]);

//   return (
//     <div className={`dd dd-level-${level}`}>
//       {items.map((item) => {
//         const isOpen = openIds.includes(item.id);
//         const iconId = levelIcons[level] || "arrow-circle-down-icon";

//         return (
//           <div key={item.id} className="dd__item">
//             <button
//               className={`dd__header ${isOpen ? "open" : ""}`}
//               onClick={() => toggle(item.id)}
//             >
//               {t(item.titleKey)}
//               <svg
//                 className={`dd__arrow ${isOpen ? "open" : ""}`}
//                 width={20}
//                 height={20}
//               >
//                 <use xlinkHref={`${sprite}#${iconId}`} />
//               </svg>
//             </button>

//             <AnimatePresence initial={false}>
//               {isOpen && (
//                 <motion.div
//                   className={`dd__dropdown ${level === 1 ? "absolute" : ""}`}
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {/* Текстовый контент */}
//                   {item.contentKey && (
//                     <ul className="dd__list">
//                       {(
//                         t(item.contentKey, { returnObjects: true }) as string[]
//                       ).map((text, idx) => (
//                         <li key={idx}>{text}</li>
//                       ))}
//                     </ul>
//                   )}

//                   {/* Вложенные уровни */}
//                   {(item.children?.length ?? 0) > 0 && (
//                     <AccordionDropdown
//                       items={item.children ?? []}
//                       multiple={multiple}
//                       level={level + 1}
//                       levelIcons={{
//                         1: "arrow-circle-down-icon",
//                         2: "arrow-circle-icon",
//                         3: "arrow-down-icon",
//                       }}
//                     />
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
