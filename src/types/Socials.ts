import { OverridableComponent } from "@mui/types";
import { SvgIconTypeMap } from "@mui/material";

export interface SocialNetwork {
  name: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
  link: string
}
