import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const defaultProps = (size?: number): SVGProps<SVGSVGElement> => ({
  width: size || 24,
  height: size || 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const MenuIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const XIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const ChefHatIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
    <path d="M6 17h12" />
  </svg>
);

export const LogInIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" x2="3" y1="12" y2="12" />
  </svg>
);

export const LogOutIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

export const UserIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const InstagramIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const TwitterIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const FacebookIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const HeartIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const ArrowRightIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const ArrowLeftIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export const SparklesIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

export const MailIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const ClockIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const UsersIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const PrinterIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </svg>
);

export const Share2Icon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);

export const PlusIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export const MinusIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const UploadIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

export const SearchIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const SlidersHorizontalIcon = ({ size, ...props }: IconProps) => (
  <svg {...defaultProps(size)} viewBox="0 0 24 24" {...props}>
    <line x1="21" x2="14" y1="4" y2="4" />
    <line x1="10" x2="3" y1="4" y2="4" />
    <line x1="21" x2="12" y1="12" y2="12" />
    <line x1="8" x2="3" y1="12" y2="12" />
    <line x1="21" x2="16" y1="20" y2="20" />
    <line x1="12" x2="3" y1="20" y2="20" />
    <line x1="14" x2="14" y1="2" y2="6" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="16" x2="16" y1="18" y2="22" />
  </svg>
);
