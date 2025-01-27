interface IconProps {
  className?: string;
  strokeWidth?: number;
}

export const ChartIcon = ({ className, strokeWidth }: IconProps) => (
  <svg
    className={className}
    height="200"
    viewBox="0 0 24 24"
    width="200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 5v15m-5-9v9m-5-6v6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
    />
  </svg>
);

export const GithubIcon = ({ className, strokeWidth }: IconProps) => (
  <svg
    className={className}
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth ? strokeWidth : 1.5}
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const CursorIcon = ({ className, strokeWidth: _ }: IconProps) => (
  <svg
    className={className}
    fill="none"
    height="24"
    viewBox="0 0 175 225"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="white" height="25" width="25" />
    <rect fill="white" height="25" width="25" x="25" />
    <rect fill="white" height="25" width="25" x="25" y="25" />
    <rect fill="white" height="25" width="25" x="25" y="50" />
    <rect fill="white" height="25" width="25" x="50" y="75" />
    <rect fill="white" height="25" width="25" x="50" y="50" />
    <rect fill="white" height="25" width="25" x="75" y="50" />
    <rect fill="white" height="25" width="25" x="100" y="50" />
    <rect fill="white" height="25" width="25" x="75" y="75" />
    <rect fill="white" height="25" width="25" x="50" y="125" />
    <rect fill="white" height="25" width="25" x="25" y="150" />
    <rect fill="white" height="25" width="25" x="125" y="150" />
    <rect fill="white" height="25" width="25" x="125" y="175" />
    <rect fill="white" height="25" width="25" x="25" y="175" />
    <rect fill="white" height="25" width="25" x="25" y="200" />
    <rect fill="white" height="25" width="25" y="200" />
    <rect fill="white" height="25" width="25" x="50" y="200" />
    <rect fill="white" height="25" width="25" x="75" y="200" />
    <rect fill="white" height="25" width="25" x="75" y="175" />
    <rect fill="white" height="25" width="25" x="88" y="185" />
    <rect fill="white" height="25" width="25" x="63" y="185" />
    <rect fill="white" height="25" width="25" x="100" y="200" />
    <rect fill="white" height="25" width="25" x="125" y="200" />
    <rect fill="white" height="25" width="25" x="150" y="200" />
    <rect fill="white" height="25" width="25" x="75" y="100" />
    <rect fill="white" height="25" width="25" x="100" y="75" />
    <rect fill="white" height="25" width="25" x="100" y="125" />
    <rect fill="white" height="25" width="25" x="125" y="50" />
    <rect fill="white" height="25" width="25" x="125" y="25" />
    <rect fill="white" height="25" width="25" x="50" />
    <rect fill="white" height="25" width="25" x="75" />
    <rect fill="white" height="25" width="25" x="100" />
    <rect fill="white" height="25" width="25" x="125" />
    <rect fill="white" height="25" width="25" x="150" />
  </svg>
);
