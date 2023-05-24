const setProfilePic = (path) => {
  const newPath = path.split('/').length > 2 ? path : '/assets/img/profiles/img-6.jpg';
  $('#employee-avatar').attr('src', newPath);
};
