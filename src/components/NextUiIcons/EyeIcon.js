import { React } from '@nextui-org/react';

export const EyeIcon = ({
  fill = 'currentColor',
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <path
        fill={fill}
        d="M64 464l192-192L64 80v384zM256 464l192-192L256 80v384z"
      />
    </svg>
  );
};
