import { Link } from "react-router-dom";

/**
 * Centralised RightPolicy logo. Uses the official wordmark.
 * Variants:
 *  - "default", for light backgrounds (renders the original colored logo).
 *  - "white"  , for dark backgrounds (forces the wordmark to white using CSS filter).
 */
export default function Logo({
    variant = "default",
    className = "h-9 sm:h-10",
    asLink = true,
    to = "/",
    testid = "rp-logo",
}) {
    const isWhite = variant === "white";
    const img = (
        <img
            src="/logo.png"
            alt="RightPolicy"
            data-testid={testid}
            className={`block w-auto ${className} ${
                isWhite ? "brightness-0 invert" : ""
            }`}
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
