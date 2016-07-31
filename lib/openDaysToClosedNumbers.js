openDaysToClosedNumbers = function (openDays) {
  check(openDays, Object);
  let dayNumbers = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  let closeDays = [];
  _.each( openDays, function( isOpen, day ) {
    if (isOpen === false) {
      closeDays.push(dayNumbers[day]);
    }
  });
  return closeDays;
};
