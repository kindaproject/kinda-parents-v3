type StatusValue = "active" | "inactive" | "archived" | string;

export const getBadgeClassByStatus = (status: StatusValue): string => {
  switch (status) {
    case "active":
      return "badge badge-success";
    case "inactive":
      return "badge badge-danger";
    case "archived":
      return "badge badge-warning";
    default:
      return "badge badge-primary";
  }
};