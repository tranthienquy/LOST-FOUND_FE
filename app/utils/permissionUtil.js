export const getValidRole = (user, role)=>{
    if (user && user.role && 
      role.find((val) => val===user.role.roleName)
      ) return true;
      return false;
  }