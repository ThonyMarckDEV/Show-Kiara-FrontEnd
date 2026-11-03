import HeartIcon from "./HeartIcon";
import "./Button.css";

/**
 * Botón / enlace con estilo de la marca.
 * variant: "primary" | "light"
 * size: "md" | "lg" | "sm"
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
  ...rest
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`;
  const content = (
    <>
      {icon && <HeartIcon size={size === "lg" ? 20 : 16} className="btn-icon" />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
