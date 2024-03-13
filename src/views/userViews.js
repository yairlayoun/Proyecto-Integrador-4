// views/userView.js
const renderProfile = (user) => {
    return {
      layout: "profile",
      name: user.first_name,
      email: user.email,
    };
  };
  
  export { renderProfile };
  