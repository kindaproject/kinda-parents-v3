import { colorsAvatar } from "../utils/colors";

interface AvatarProps {
  name: string | undefined;
  src?: string;
  size?: number;
  fontSize?: number;
  className?: string;
}

const Avatar = ({
  name,
  src,
  size = 34,
  fontSize = 12,
  className = "",
}: AvatarProps) => {
  const getInitials = (name: string) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .filter(Boolean)
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return initials || "X";
  };

  const getBackgroundColor = (char: string) => {
    let index = char?.charCodeAt(0) % colorsAvatar.length;
    let color = colorsAvatar[index];

    const isTooLight = (color: string) =>
      ["#FFFFFF", "#C7C7C7", "#F5F5F5"].includes(color?.toUpperCase());

    while (isTooLight(color)) {
      index = (index + 1) % colorsAvatar.length;
      color = colorsAvatar[index];
    }

    return color;
  };

  const initials = getInitials(name || "");
  const bgColor = getBackgroundColor(initials);
  const textColor =
    bgColor.toUpperCase() === "#FFFFFF" || bgColor.toUpperCase() === "#C7C7C7"
      ? "var(--c_black)"
      : "var(--c_white)";

  return (
    <div
      className={`inline-block ${className}`}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={name}
      style={{
        width: size,
        height: size,
      }}>
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: bgColor,
            color: textColor,
            fontSize,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}>
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
