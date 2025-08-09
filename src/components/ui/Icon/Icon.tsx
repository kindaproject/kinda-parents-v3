// components/Icon.tsx
import React, { ReactNode } from "react";

interface IconProps {
  name: () => ReactNode;
  size?: number;
  viewBox?: string;
  className?: string;
  reverse?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  name: SvgContent,
  size = 24,
  viewBox,
  className = "",
  reverse = false,
  onClick,
  style,
  ...props
}) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox ? viewBox : "0 0 24 24"}
      className={className}
      fill={!reverse ? "currentColor" : "transparent"}
      stroke={reverse ? "currentColor" : "transparent"}
      style={style}
      {...props}>
      {SvgContent()}
    </svg>
  );
};

export default Icon;
