// eslint-disable-next-line import/prefer-default-export
export const getTotalMinutes = (hour, startTime, endTime) => {
  let newHour = new Date(endTime).getHours() - new Date(startTime).getHours();
  if (newHour < 0) {
    throw new Error('end time before start time');
  }
  let newMinute = new Date(endTime).getMinutes() - new Date(startTime).getMinutes();
  if (newMinute < 0) {
    newHour -= 1;
    newMinute = 60 - Math.abs(newMinute);
  }
  newHour = newHour * 60 + newMinute;
  // console.log(newHour);
  const result = Number(hour) + Number(newHour);
  return result;
};

export const getTime = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const newDate = new Date(year, month, day);
  return newDate.getTime();
};

export const getFinalLog = (attendance) => {
  const startTime = attendance.log[0].start;
  const endTime = attendance.log[attendance.log.length - 1].end;
  const totalHour = (Math.floor(attendance.totalMinutes / 60)
                                    + ((attendance.totalMinutes % 60) / 100).toFixed(2));

  const IdealMinutes = getTotalMinutes(0, startTime, endTime);
  const IdealHours = (Math.floor(IdealMinutes / 60) + ((IdealMinutes % 60) / 100).toFixed(2));
  const monthLog = {
    startTime,
    endTime,
    totalHour,
    IdealHours,
  };
  return monthLog;
};
