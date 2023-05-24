$('#cancelAddEmployee').click(() => {
  $(':input', '#form-add-employee').not(':button, :submit, :reset, :hidden')
    .val('');
  $('#addEmployeeFormContainer').addClass('d-none');
  $('#employeeDisplayContainer').removeClass('d-none');
  $('.avatar-preview').find('div').css('background-image', 'url(../img/logo2.png)');
});

// eslint-disable-next-line no-unused-vars
const imagePreview = () => {
  const addForm = $('#form-add-employee');
  const file = addForm.find('#imageUpload')[0].files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evenet) => {
      $('.avatar-preview').find('div').css('background-image', `url(${evenet.target.result})`);
    };
  }
};

$(document).ready(() => {
  $.validator.addMethod('filesize', (value, element, param) => this.optional(element) || (element.files[0].size <= param * 1000000), 'File size must be less than {0} MB');

  $('#form-add-employee').validate({
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
      email: {
        required: true,
        email: true,
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
      state: {
        required: true,
      },
      city: {
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

      avatar: {
        required: true,
        extensions: 'jpg || png || jpeg',
        filesize: 2,
      },
    },
    messages: {
      firstName: {
        required: 'First Name is requrired*',
        minlength: 'at least 2 character required',
      },
      lastName: {
        required: 'Last Name is requrired*',
        minlength: 'at least 2 character required',
      },
      middleName: {
        required: 'Middle Name is requrired*',
        minlength: 'at least 2 character required',
      },
      email: {
        required: 'email is required*',
        email: 'please enter valid email',
      },
      dob: {
        required: 'please select dob*',
      },
      role: {
        required: 'please select valid role*',
      },
      joiningDate: {
        required: 'please enter date*',
      },
      careerStartDate: {
        required: 'plese enter total experiance*',
      },

      highestQualification: {
        required: 'highest qualification is requrired*',
      },
      collage: {
        required: 'collage is requrired*',
      },
      university: {
        required: 'university is requrired*',
      },
      knownTech: {
        required: 'knownTech is requrired*',
      },

      // contact details
      houseNo: {
        required: 'house number/name is required*',
      },
      contactNo: {
        required: 'contact no is required*',
        digits: 'only digit is allowed',
        maxlength: 'lenth should be 10',
        minlength: 'lenth should be 10',
      },
      secondaryEmail: {
        email: 'eneter valid email address*',
      },
      addressLine1: {
        required: 'address line required*',
      },
      landmark: {
        required: 'landmark required*',
      },
      city: {
        requrired: 'city is required*',
      },
      state: {
        required: 'state is required*',
      },
      country: {
        required: 'country is required*',
      },
      pincode: {
        required: 'pincode is required*',
        digits: 'only digit allowed',
        maxlength: 'pin should be of 6 digit',
        minlength: 'pin should be of 6 digit',
      },
      workingTimeInYear: {
        min: 'please enter appropriate value*',
        digits: 'only digits allowed',
      },
      workingTimeInMonth: {
        max: 'choose number between 1 to 12',
        min: 'choose number between 1 to 12',
        digits: 'only digits allowed',
      },

      avatar: {
        required: 'please upload profile pic*',
        extensions: 'only .jpeg, .png, .jpg formate allowed',
        filesize: 'file size morethen 2 MB not allowed',
      },
    },

    errorElement: 'span',
    errorClass: 'text-danger',

    errorPlacement(error, element) {
      if (element.attr('name') === 'dob'
      || element.attr('name') === 'joiningDate'
      || element.attr('name') === 'role'
      || element.attr('name') === 'careerStartDate') {
        error.insertAfter(element.parent());
      } else if (element.attr('name') === 'avatar') {
        error.insertAfter(element.parent().parent());
      } else {
        error.insertAfter(element);
      }
    },

    submitHandler() {
      const addForm = $('#form-add-employee');
      const formData = new FormData($('#form-add-employee')[0]);
      formData.append('previousEmployer', addForm.find('#preEmployer').val());
      formData.append('employerAddress', addForm.find('#preEmployerAddress').val());
      formData.append('workingTime',
        `${addForm.find('#workingTimeInYear').val()} years, ${addForm.find('#workingTimeInMonth').val()} months`);

      // const file = addForm.find('#imageUpload')[0].files[0];
      // formData.append('avatar', file, file.name);
      // console.log(formData);
      // eslint-disable-next-line no-restricted-syntax
      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}`);
      //   console.dir(pair[1]);
      // }

      $.ajax({
        type: 'POST',
        url: '/employees',
        data: formData,
        contentType: false,
        processData: false,
        success: () => {
          // console.log(data);
          $('.toast-header').removeClass('bg-danger').addClass('bg-success').addClass('text-dark');
          $('.toast-title').text('Employee Register');
          $('.toast-body').text('employee registered successfully');
          $('.toast').toast({
            delay: 5000,
          });
          $('.toast').toast('show');

          // $(':input', '#form-add-employee').not(':button, :submit, :reset, :hidden')
          //   .val('');
          $('#form-add-employee')[0].reset();
          $('.avatar-preview').find('div').css('background-image', 'url(../img/logo2.png)');

          // change view
          $('#addEmployeeFormContainer').addClass('d-none');
          $('#employeeDisplayContainer').removeClass('d-none');

          // reset form fields

          setTimeout(() => displayEmployee(), 100);
        },
        error: (error) => {
          $('.toast-header').removeClass('bg-success').addClass('bg-danger').addClass('text-dark');
          $('.toast-title').text('Employee Register');
          $('.toast-body').text(error.responseJSON.errorMessage);
          $('.toast').toast({
            delay: 5000,
          });
          $('.toast').toast('show');
          // console.log(error.message);
        },
      });
    },
  });

  $('#form-add-employee').submit((event) => {
    event.preventDefault();
  });
});
