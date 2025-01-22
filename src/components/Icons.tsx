interface IconProps {
  className?: string;
  strokeWidth?: number;
}

export const ChartIcon = ({ className, strokeWidth }: IconProps) => (
  <svg
    className={className}
    height='200'
    viewBox='0 0 24 24'
    width='200'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M17 5v15m-5-9v9m-5-6v6'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
    />
  </svg>
);

