  $('#cancelEdit').click(() => {
  $(':input', '#form-edit-employee').not(':button, :submit, :reset, :hidden')
    .val('');
  $('#editEmployeeFormContainer').addClass('d-none');
  $('#employeeDisplayContainer').removeClass('d-none');
});

// eslint-disable-next-line no-unused-vars
const imagePreviewUpdate = () => {
  const editForm = $('#form-edit-employee');
  const file = editForm.find('#imageUploadUpdate')[0].files[0];
  // console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (evenet) => {
      $('.avatar-preview').find('div').css('background-image', `url(${evenet.target.result})`);
    };
    reader.readAsDataURL(file);
  }
};

$('#form-edit-employee').validate({
  rules: {
    firstName: {
      required: true,
      minlength: 2,
    },
    middleName: {
      required: true,
      minlength: 2,
    },
    lastName: {
      required: true,
      minlength: 2,
    },
    dob: {
      required: true,
    },
    role: {
      required: true,
    },
    joiningDate: {
      required: true,
    },
    careerStartDate: {
      required: true,
    },

    // academic details
    highestQualification: {
      required: true,
    },
    collage: {
      required: true,
    },
    university: {
      required: true,
    },
    knownTech: {
      required: true,
    },

    // contact details
    houseNo: {
      required: true,
    },
    contactNo: {
      required: true,
      digits: true,
      maxlength: 10,
      minlength: 10,
    },
    secondaryEmail: {
      email: true,
    },
    addressLine1: {
      required: true,
    },
    landmark: {
      required: true,
    },
    city: {
      required: true,
    },
    state: {
      required: true,
    },
    country: {
      required: true,
    },
    pincode: {
      required: true,
      digits: true,
      maxlength: 6,
      minlength: 6,
    },
    workingTimeInYear: {
      min: 0,
      digits: true,
    },
    workingTimeInMonth: {
      max: 12,
      min: 0,
      digits: true,
    },

    avatarUpdate: {
      required: true,
      extensions: 'jpg || png || jpeg',
      filesize: 2,
    },
  },
  messages: {
    firstName: {
      required: 'First Name is requrired',
      minlength: 'at least 2 character required',
    },
    lastName: {
      required: 'Last Name is requrired',
      minlength: 'at least 2 character required',
    },
    middleName: {
      required: 'Middle Name is requrired',
      minlength: 'at least 2 character required',
    },
    dob: {
      required: 'please select dob',
    },
    role: {
      required: 'please select valid role',
    },
    joiningDate: {
      required: 'please enter date',
    },
    careerStartDate: {
      required: 'plese enter total experiance',
    },

    highestQualification: {
      required: 'highest qualification is requrired',
    },
    collage: {
      required: 'collage is requrired',
    },
    university: {
      required: 'university is requrired',
    },
    knownTech: {
      required: 'knownTech is requrired',
    },

    // contact details
    houseNo: {
      required: 'house number/name is required',
    },
    contactNo: {
      required: 'contact no is required',
      digits: 'only digit is allowed',
      maxlength: 'lenth should be 10',
      minlength: 'lenth should be 10',
    },
    secondaryEmail: {
      email: 'eneter valid email address',
    },
    addressLine1: {
      required: 'address line required',
    },
    landmark: {
      required: 'landmark required',
    },
    city: {
      requrired: 'city is required',
    },
    state: {
      required: 'state is required',
    },
    country: {
      required: 'country is required',
    },
    pincode: {
      required: 'pincode is required',
      digits: 'only digit allowed',
      maxlength: 'pin should be of 6 digit',
      minlength: 'pin should be of 6 digit',
    },
    workingTimeInYear: {
      min: 'please enter appropriate value',
      digits: 'only digits allowed',
    },
    workingTimeInMonth: {
      max: 'choose number between 1 to 12',
      min: 'choose number between 1 to 12',
      digits: 'only digits allowed',
    },

    avatarUpdate: {
      extensions: 'only .jpeg, .png, .jpg formate allowed',
      filesize: 'file size morethen 2 MB not allowed',
    },
  },
  errorElement: 'span',
  errorClass: 'text-danger',
  errorPlacement(error, element) {
    if (element.attr('name') === 'dob' || element.attr('name') === 'joiningDate' || element.attr('name') === 'role') {
      error.insertAfter(element.parent());
    } else if (element.attr('name') === 'avatar') {
      error.insertAfter(element.parent().parent());
    } else {
      error.insertAfter(element);
    }
  },
  submitHandler() {
    const editForm = $('#form-edit-employee');
    const formData = new FormData($('#form-edit-employee')[0]);
    formData.append('email', editForm.find('#email').val());
    formData.append('edited', true);
    formData.append('previousEmployer', editForm.find('#preEmployer').val());
    formData.append('employerAddress', editForm.find('#preEmployerAddress').val());
    formData.append('workingTime',
      `${editForm.find('#workingTimeInYear').val()} years, ${editForm.find('#workingTimeInMonth').val()} months`);

    // const file = editForm.find('#imageUploadUpdate')[0];
    // console.log(file);
    // formData.append('avatar', file, file.name);
    // console.log(formData);
    // eslint-disable-next-line no-restricted-syntax
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}`);
    //   console.dir(pair[1]);
    // }

    // console.log(payload);
    $.ajax({
      type: 'PUT',
      url: `/employees/${editForm.data('id')}`,
      data: formData,
      contentType: false,
      processData: false,
      success: (data) => {
        // console.log(data);
        $('.toast-header').removeClass('bg-danger').addClass('bg-success').addClass('text-dark');
        $('.toast-title').text('Employee Update');
        $('.toast-body').text('employee Updated successfully');
        $('.toast').toast({
          delay: 5000,
        });
        $('.toast').toast('show');
        $('#editEmployeeFormContainer').addClass('d-none');
        $('#employeeDisplayContainer').removeClass('d-none');
        setTimeout(() => displayEmployee(), 100);
        // show successfull message in toast
      },
      error: (error) => {
        // alert(error.message);
        // console.log(`/employees/${editForm.data('id')}`);
        $('.toast-header').removeClass('bg-success').addClass('bg-danger').addClass('text-dark');
        $('.toast-title').text('Employee Register');
        $('.toast-body').text(error.responseJSON.errorMessage);
        $('.toast').toast({
          delay: 5000,
        });
        $('.toast').toast('show');
        // show error in toast and reload window
      },
    });
  },
});

$('#form-edit-employee').submit((event) => {
  event.preventDefault();
});
