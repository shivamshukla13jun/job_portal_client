import React from "react";
import { useSelector } from "react-redux";

// PermissionWrapper Component
const PermissionWrapper = ({key, permission, children }) => {
  const menuItems = useSelector((state) => state.menu.menuItems);
  const hasPermission = menuItems.some((item) =>
   item.key==key && item.permissions?.includes(permission)
  );

  if (!hasPermission) {
    return null; // If no permission, render nothing
  }

  return children; // Render the button if permission exists
};

export default PermissionWrapper;
