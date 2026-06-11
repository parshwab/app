import { Link } from "react-router-dom";

export default function Logo({
    className = "h-12 sm:h-14",
    asLink = true,
    to = "/",
    testid = "rp-logo",
}) {
    const img = (
        <img
            src="/logo.png"
            alt="RightPolicy"
            data-testid={testid}
            className={`block w-auto ${className}`}
            draggable="false"
        />
    );
    if (!asLink) return img;
    return (
        <Link to={to} className="inline-flex items-center" aria-label="RightPolicy home">
            {img}
        </Link>
    );
}
