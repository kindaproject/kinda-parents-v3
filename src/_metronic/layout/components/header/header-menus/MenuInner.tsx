import { useIntl } from "react-intl";
import { MenuItem } from "./MenuItem";
import { MenuInnerWithSub } from "./MenuInnerWithSub";
import { MegaMenu } from "./MegaMenu";
import { getDateStrMes } from "../../../../../components/utils/dates";

export function MenuInner() {
  const intl = useIntl();
  const date = new Date().toISOString();
  return (
    <>
      <MenuItem title={getDateStrMes(date) || ""} to="#" />
    </>
  );
}
