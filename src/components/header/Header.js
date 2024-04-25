import React from "react";
import Navigation from "./Navigation";
import { resolveSettings } from "../../auth/resolveSettings";
const Header = React.forwardRef((props,ref) => {
  

  const navList = new resolveSettings().resolveFolderList();
  return <Navigation ref={ref} navList={navList} />;
});
export default Header;
