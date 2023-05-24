$('#asideProfile, #headerProfile, #asideHomeProfile, #logoLink').click((event) => {
  event.preventDefault();
  window.location = `/employee/${localStorage.getItem('id')}/`;
});

$('#asideProjects, #headerProjects').click((event) => {
  event.preventDefault();
  window.location = `/employee/${localStorage.getItem('id')}/projects`;
});

$('#asideAttendance, #headerAttendance').click((event) => {
  event.preventDefault();
  window.location = `/employee/${localStorage.getItem('id')}/attendance`;
});

$('#asidePocs, #headerPocs').click((event) => {
  event.preventDefault();
  window.location = `/employee/${localStorage.getItem('id')}/poc`;
});

$('#asideLeave, #headerLeave').click((event) => {
  event.preventDefault();
  //  window.location = `/employee/${path}/leave`;
  window.location = '/leave/add-view';
});

$('#change-password').click((event) => {
  event.preventDefault();
  window.location = `/employee/${localStorage.getItem('id')}/change-password`;
});
