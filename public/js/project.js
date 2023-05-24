const hideShowField = (fieldsToBeHide, fieldsToBeShown) => {
  fieldsToBeHide.forEach((field) => {
    $(field).css('display', 'none');
  });
  fieldsToBeShown.forEach((field) => {
    $(field).css('display', 'block');
  });
};

const displayError = (err) => {
  $('#message-body').removeClass('d-none');
  $('#message-body').html(`
    <div class="card shadow-sm ctm-border-radius" id="error-body">
      <div class="card-body d-flex justify-content-between">
        <p class='text-danger font-weight-bold'>${err}</p>
      </div>
    </div>
  `);
  setTimeout(() => {
    $('#message-body').html('');
    $('#message-body').addClass('d-none');
  }, 5000);
};

function formatDate(dateObject) {
  const d = new Date(dateObject);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  const year = d.getFullYear();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const date = `${year}-${month}-${day}`;
  return date;
}

const fetchprojectData = (index) => {
  const sortBy = $('#sort-by').val();
  const sortOrder = $('#sort-order').val();
  const searchWord = $('#search-by').val();
  const recordCount = $('#select-record-count').val();
  $.ajax({
    url: `/fetchproject??page=${index}&count=${recordCount}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchWord=${searchWord}`,
    method: 'GET',
    error: (resData) => {
      displayError(resData.responseJSON.errorMessage);
    },
    success: (resData) => {
      $('#projects-data').html('');
      if (resData.success) {
        const { role } = resData.data.pop();
        const { totalCount } = resData.data.pop();
        $('#action').text('projects');
        $('#all-project').css('display', 'none');

        hideShowField(['#all-project', '#projects-add-div', '#projects-view-div'], ['#add-project', '#pagination', '#projects-data-body']);

        $('#previous').attr('data-index', Number(index) - 1);
        $('#next').attr('data-index', Number(index) + 1);
        $('#current').attr('data-index', Number(index));
        const page = $('#current').attr('data-index');
        const beforeCount = (page - 1) * Number(recordCount);
        const afterCount = totalCount - Number(recordCount) - beforeCount;

        // Set pagination oprions
        $('#clients-count').text(totalCount);
        if (beforeCount <= 0) {
          $('#previous').addClass('disabled');
        } else {
          $('#previous').removeClass('disabled');
        }
        if (afterCount <= 0) {
          $('#next').addClass('disabled');
        } else {
          $('#current').text(index);
        }

        if (resData.data.length) {
          // console.log(resData.data);
          resData.data.forEach((project) => {
            $('#projects-data').append(`
              <div class='col-md-6 col-lg-6 col-xl-4'>
                <div class='card'>
                  <div class='card-body'>
                    <div class='pro-widget-content'>
                      <div class='profile-info-widget'>
                        <div class='profile-det-info'>
                          <p>Name: <span class='text-primary'>${project.name}</span></p>
                          <p>Type: <span class='text-primary'>${project.type}</span></p>
                          <p>Status: <span class='text-primary'>${project.status}</span></p>
                          <p>End Date: <span class='text-primary'>${formatDate(project.probable_end_date)}</span></p>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                      <p onclick='projectDetails("${project.projectId}")' class='btn btn-theme ctm-border-radius text-white cursor-pointer' id='update-project-pencil'><i class="fa fa-pencil"></i></p>
                      <a href="/viewProject/${project.projectId}" class='btn btn-theme ctm-border-radius text-white cursor-pointer' id='view-project-eye'><span class="lnr lnr-eye"></span></a>
                    </div>
                  </div>
                </div>
              </div>
            `);
            if (role !== 'ADMIN') {
              $('#update-project-pencil').remove();
            }
          });
        } else {
          $('#projects-data').append(`
            <div class='col-12 text-center'>
              <p><h4 class='text-danger'>Nothing to show !!!</h4></p>
            </div>
          `);
        }
      } else {
        displayError(resData.responseJSON.errorMessage);
      }
    },
  });
};

const viewProjectsWithPagination = () => {
  const index = $('#current').attr('data-index');
  fetchprojectData(index);
};

const displaySuccessMessage = (message) => {
  $('#message-body').removeClass('d-none');
  $('#message-body').html(`
    <div class="card shadow-sm ctm-border-radius" id="error-body">
      <div class="card-body d-flex justify-content-between">
        <p class='text-success font-weight-bold'><b>${message}</b></p>
      </div>
    </div>
  `);
  viewProjectsWithPagination();
  setTimeout(() => {
    $('#message-body').html('');
    $('#message-body').addClass('d-none');
  }, 5000);
};

const fetchDev = (devs) => {
  $.ajax({
    url: '/employees/?role=DEV',
    method: 'GET',
    success: (resData) => {
      let devOption = '';
      resData.data.employee.forEach((employee) => {
        devOption += (devs.includes(employee.id)) ? `<option value=${employee.id} selected>${employee.email}</option>` : `<option value=${employee.id}>${employee.email}</option>`;
        // devOption += `<option value=${employee.id}>${employee.email}</option>`;
      });
      $('#dev').html(devOption);
    },
    error: (errData) => {
      displayError(errData.responseJSON.errorMessage);
    },
  });
};

const fetchPM = (pms) => {
  $.ajax({
    url: '/employees/?role=PM',
    method: 'GET',
    success: (resData) => {
      // console.log(resData);
      // resData.data.employee.pop();
      let pmOption = '';
      resData.data.employee.forEach((employee) => {
        pmOption += (pms.includes(employee.id)) ? `<option value=${employee.id} selected>${employee.email}</option>` : `<option value=${employee.id}>${employee.email}</option>`;
        // pmOption += `<option value=${employee.id}>${employee.email}</option>`;
      });
      $('#pm').html(pmOption);
    },
    error: (resData) => {
      displayError(resData.responseJSON.errorMessage);
    },
  });
};

// eslint-disable-next-line no-unused-vars
const projectDetails = (projectId) => {
  hideShowField(['#projects-add-div', '#add-project', '#pagination', '#projects-data-body'], ['#projects-view-div', '#all-project']);
  $('#action').text('View project');
  $.ajax({
    url: `/projects/${projectId}`,
    method: 'GET',
    success: (resData) => {
      $('#edit_name').val(resData.data.name);
      $('#edit_type').val(resData.data.type);
      $('#edit_status').val(resData.data.status);
      $('#edit_probable_end_date').val(formatDate(resData.data.probable_end_date));

      $('#project-edit-submit').val(resData.data.projectId);
      if (resData.data.isArchived) {
        $('#isArchived').attr('checked', true);
      } else {
        $('#isArchived').attr('checked', false);
      }
      const clients = [];
      const pms = [];
      const devs = [];

      $.ajax({
        url: `project/${projectId}/employees`,
        method: 'GET',
        success: (resultData) => {
          resultData.data.forEach((data) => {
            if (data.Employee.role === 'PM') {
              pms.push(data.employeeId);
            } else {
              devs.push(data.employeeId);
            }
          });
          fetchDev(devs);
          fetchPM(pms);
        },
        error: (errData) => {
          displayError(errData.responseJSON.errorMessage);
        },
      });

      $.ajax({
        url: `/project/${projectId}/clients`,
        method: 'GET',
        success: (resultData) => {
          resultData.data.forEach((data) => {
            clients.push(data.clientId);
          });
          // eslint-disable-next-line no-use-before-define
          fetchClient(clients);
        },
        error: (errData) => {
          displayError(errData.responseJSON.errorMessage);
        },
      });

      // $('#client-edit-submit').val(resData.data.id);
    },
    error: (resData) => {
      displayError(resData.responseJSON.errorMessage);
    },
  });
};


$('#previous').on('click', () => {
  const index = $('#previous').attr('data-index');
  fetchprojectData(index);
});

$('#next').on('click', () => {
  const index = $('#next').attr('data-index');
  fetchprojectData(index);
});

$('#add-project').on('click', () => {
  hideShowField(['#projects-data-body', '#pagination', '#add-project', '#projects-view-div'], ['#all-project', '#projects-add-div']);
  $('#action').text('Add project');
});

$('#all-project').on('click', () => {
  hideShowField(['#all-project', '#projects-add-div', '#projects-view-div'], ['#projects-data-body', '#pagination', '#add-project']);
  viewProjectsWithPagination();
});

$('#search-by').on('input paste', () => {
  viewProjectsWithPagination();
});

if (('#project-add-form').length) {
  $('#project-add-form').validate({
    rules: {
      name: {
        required: true,
      },
      type: {
        required: true,
      },
      end_date: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Name is required !!!',
      },
      type: {
        required: 'Type is required !!!',
      },
      end_date: {
        required: 'End date is required !!!',
      },
    },
  });
}

$('#project-edit-form').on('submit', (event) => {
  event.preventDefault();
  const projectData = $('#project-edit-form').serializeArray();
  const projectDataObj = {};
  projectData.forEach((obj) => {
    projectDataObj[obj.name] = obj.value;
  });
  if ($('#isArchived').is(':checked')) {
    projectDataObj.isArchived = true;
  } else {
    projectDataObj.isArchived = false;
  }
  const projectId = $('#project-edit-submit').val();
  const clients = Array.from(document.getElementById('client').options).filter(option => option.selected).map(option => option.value);
  const pms = Array.from(document.getElementById('pm').options).filter(option => option.selected).map(option => option.value);
  const devs = Array.from(document.getElementById('dev').options).filter(option => option.selected).map(option => option.value);
  projectDataObj.client = clients;
  projectDataObj.pm = pms;
  projectDataObj.dev = devs;
  $.ajax({
    url: `/projects/${projectId}`,
    method: 'PUT',
    data: projectDataObj,
    success: () => {
      displaySuccessMessage('Project Data Updated Successfully...');
      viewProjectsWithPagination();
    },
    error: (resData) => {
      displayError(resData.responseJSON.errorMessage);
    },
  });
});

if (('#project-edit-form').length) {
  $('#project-edit-form').validate({
    rules: {
      name: {
        required: true,
      },
      type: {
        required: true,
      },
      end_date: {
        required: true,
      },
    },
    messages: {
      name: {
        required: 'Name is required !!!',
      },
      type: {
        required: 'Type is required !!!',
      },
      end_date: {
        required: 'End date is required !!!',
      },
    },
  });
}

$('#project-add-form').on('submit', (event) => {
  event.preventDefault();
  const projectData = $('#project-add-form').serializeArray();
  const projectDataObj = {};
  projectData.forEach((obj) => {
    projectDataObj[obj.name] = obj.value;
  });

  $.ajax({
    url: '/project',
    method: 'POST',
    data: projectDataObj,
    success: () => {
      displaySuccessMessage('Project Data Added Successfully...');
      viewProjectsWithPagination();
    },
    error: (resData) => {
      displayError(resData.responseJSON.errorMessage);
    },
  });
});
let fetchClient = (clients) => {
  $.ajax({
    url: `/getClients?all=${true}`,
    method: 'GET',
    success: (resData) => {
      let clientOption = '';
      resData.data.forEach((client) => {
        clientOption += (clients.includes(client.id)) ? `<option value=${client.id} selected>${client.email}</option>` : `<option value=${client.id}>${client.email}</option>`;
        // clientOption += `<option value=${client.id}>${client.email}</option>`;
      });
      $('#client').html(clientOption);
    },
    error: (errData) => {
      displayError(errData.responseJSON.errorMessage);
    },
  });
};

hideShowField(['#all-project', '#projects-add-div', '#projects-view-div'], ['#add-project', '#pagination', '#projects-data-body']);
fetchprojectData(1);
// fetchClient();
// fetchPM();
// fetchDev();
