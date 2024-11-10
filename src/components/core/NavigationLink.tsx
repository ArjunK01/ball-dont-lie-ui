import { Link } from "react-router-dom";

const NavigationLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  );
};

export default NavigationLink;
