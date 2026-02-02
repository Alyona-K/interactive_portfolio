import React, { useState, useRef, useEffect } from "react";
import Button from "@/shared/ui/Button";
import "./DownloadDropdown.scss";

interface DownloadOption {
  label: string;
  href: string;
}

interface DownloadDropdownProps {
  label: string;
  options: DownloadOption[];
  className?: string;
}

const DownloadDropdown: React.FC<DownloadDropdownProps> = ({
  label,
  options,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // --- HANDLE CLICK OUTSIDE TO CLOSE DROPDOWN WITH ANIMATION ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (isOpen) {
          setIsClosing(true);
          // --- DELAY STATE UPDATE TO ALLOW CLOSING ANIMATION ---
          setTimeout(() => {
            setIsClosing(false);
            setIsOpen(false);
          }, 300); 
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // --- TOGGLE DROPDOWN OPEN/CLOSE WITH ANIMATION ---
  const handleToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      // --- DELAY STATE UPDATE TO ALLOW CLOSING ANIMATION ---
      setTimeout(() => {
        setIsClosing(false);
        setIsOpen(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className={`download-dropdown ${className || ""}`} ref={menuRef}>
      <Button className="download-dropdown__btn btn" onClick={handleToggle}>
        {label}
      </Button>
      {(isOpen || isClosing) && (
        <ul
          className={`download-dropdown__menu ${
            isOpen ? "open" : ""
          } ${isClosing ? "closing" : ""}`}
        >
          {options.map((opt) => (
            <li className="download-dropdown__item" key={opt.href}>
              <a
                className="download-dropdown__link"
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {opt.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DownloadDropdown;


//--------

// import React, { useState, useRef, useEffect } from "react";
// import Button from "@/shared/ui/Button";
// import "./DownloadDropdown.scss";

// interface DownloadOption {
//   label: string;
//   href: string;
// }

// interface DownloadDropdownProps {
//   label: string;
//   options: DownloadOption[];
//   className?: string;
// }

// const DownloadDropdown: React.FC<DownloadDropdownProps> = ({
//   label,
//   options,
//   className,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         if (isOpen) {
//           setIsClosing(true);
//           setTimeout(() => {
//             setIsClosing(false);
//             setIsOpen(false);
//           }, 300); 
//         }
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   const handleToggle = () => {
//     if (isOpen) {
//       setIsClosing(true);
//       setTimeout(() => {
//         setIsClosing(false);
//         setIsOpen(false);
//       }, 300);
//     } else {
//       setIsOpen(true);
//     }
//   };

//   return (
//     <div className={`download-dropdown ${className || ""}`} ref={menuRef}>
//       <Button className="download-dropdown__btn btn" onClick={handleToggle}>
//         {label}
//       </Button>
//       {(isOpen || isClosing) && (
//         <ul
//           className={`download-dropdown__menu ${
//             isOpen ? "open" : ""
//           } ${isClosing ? "closing" : ""}`}
//         >
//           {options.map((opt) => (
//             <li className="download-dropdown__item" key={opt.href}>
//               <a
//                 className="download-dropdown__link"
//                 href={opt.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {opt.label}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DownloadDropdown;
