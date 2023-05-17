import Calendar from './components/calendar/index.js';
import DatePicker from './components/datepicker/index.js';

[...document.querySelectorAll('.calendar')].forEach($container => {
  new Calendar({ $container, calendarSize: 300 });
});

[...document.querySelectorAll('.date-picker')].forEach($container => {
  new DatePicker({ $container, calendarSize: 300 });
});
