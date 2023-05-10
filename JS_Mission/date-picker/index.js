class DatePicker {
  //사용할 변수 선언 (클래스 필드)
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  //private 변수
  #calenderDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };
  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  };
  datePickerEl;
  dateInputEl;
  calendarEl;
  calendarMonthEl;
  monthContentEl;
  nextBtnEl;
  prevBtnEl;
  calendarDatesEl;

  constructor() {
    this.initCalenderDate();
    this.assignElement();
    this.setDateInput();
    this.addEvents();
    this.updateMonth();
  }

  //DOM 할당 메서드
  assignElement() {
    this.datePickerEl = document.querySelector('.date-picker');
    this.dateInputEl = this.datePickerEl.querySelector('.date-input');
    this.calendarEl = this.datePickerEl.querySelector('.calendar');
    this.calendarMonthEl = this.calendarEl.querySelector('.month');
    this.monthContentEl = this.calendarMonthEl.querySelector('.content');
    this.nextBtnEl = this.calendarMonthEl.querySelector('.next');
    this.prevBtnEl = this.calendarMonthEl.querySelector('.prev');
    this.calendarDatesEl = this.calendarEl.querySelector('.dates');
  }

  //이벤트리스너
  addEvents() {
    this.dateInputEl.addEventListener('click', this.toggleCalendar);
    this.nextBtnEl.addEventListener('click', this.moveToNextMonth);
    this.prevBtnEl.addEventListener('click', this.moveToPrevMonth);
    this.calendarDatesEl.addEventListener('click', this.onClickSelectDate);
  }

  //날짜 초기설정
  initCalenderDate() {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calenderDate = {
      data,
      date,
      month,
      year,
    };
  }

  //날짜 정보 표시
  setDateInput() {
    if (this.selectedDate.data) {
      this.dateInputEl.textContent = new Intl.DateTimeFormat('ko-KR').format(this.selectedDate.data);
      this.dateInputEl.dataset.value = this.selectedDate.data;
    }
  }

  // 달력 토글
  toggleCalendar = () => {
    this.calendarEl.classList.toggle('active');
    this.updateDates();
  };

  //월 설정
  updateMonth() {
    this.monthContentEl.textContent = `${this.#calenderDate.year} ${this.monthData[this.#calenderDate.month]}`;
  }

  //일 설정
  updateDates() {
    this.calendarDatesEl.innerHTML = '';
    const numberOfDates = new Date(this.#calenderDate.year, this.#calenderDate.month + 1, 0).getDate();

    //DocumentFragment 생성
    const fragment = new DocumentFragment();

    // 이전 달 날짜 렌더링
    const prevMonth = new Date(this.#calenderDate.year, this.#calenderDate.month, 0);
    const lastDayOfPrevMonth = prevMonth.getDate();
    const firstDayOfWeek = new Date(this.#calenderDate.year, this.#calenderDate.month, 1).getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.classList.add('prevMonth');
      dateEl.textContent = lastDayOfPrevMonth - i;
      dateEl.dataset.date = lastDayOfPrevMonth - i;
      fragment.appendChild(dateEl);
    }

    // 이번 달 날짜 렌더링
    for (let i = 0; i < numberOfDates; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i + 1;
      dateEl.dataset.date = i + 1;
      fragment.appendChild(dateEl);
    }

    // 다음 달 날짜 렌더링
    const lastDayOfWeek = new Date(this.#calenderDate.year, this.#calenderDate.month, numberOfDates).getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.classList.add('nextMonth');
      dateEl.textContent = i;
      dateEl.dataset.date = i;
      fragment.appendChild(dateEl);
    }

    //fragment에서 클래스가 date 이고 prevMonth가 아닌 요소를 찾아서 그리드 레이아웃에 뿌려줌
    //그리드 컬럼은 1부터 시작하고, 요일은 0부터 시작하기 때문에 1을 더해줘서 계산
    const firstDateEl = fragment.querySelector('.date:not(.prevMonth)');
    firstDateEl.style.gridColumnStart = firstDayOfWeek + 1;

    //fragment를 한꺼번에 calendarDatesEl에 자식요소로 뿌려줌
    this.calendarDatesEl.appendChild(fragment);
    this.colorSunday();
    this.colorSaturday();
    this.markToday();
    this.markSelectedDate();
  }

  //날짜 선택
  onClickSelectDate = e => {
    const target = e.target;
    if (target.dataset.date) {
      this.calendarDatesEl.querySelector('.selected')?.classList.remove('selected');
      this.selectedDate = {
        data: new Date(this.#calenderDate.year, this.#calenderDate.month, target.dataset.date),
        year: this.#calenderDate.year,
        month: this.#calenderDate.month,
        date: target.dataset.date,
      };
      console.log(`${this.selectedDate.year}-${this.selectedDate.month + 1}-${this.selectedDate.date}`);
    }
    this.setDateInput();
    this.calendarEl.classList.remove('active');
  };

  //선택된 날짜에 클래스 추가하여 표시되게 함
  markSelectedDate() {
    if (this.selectedDate.year === this.#calenderDate.year && this.selectedDate.month === this.#calenderDate.month) {
      this.calendarDatesEl.querySelector(`[data-date='${this.selectedDate.date}']`).classList.add('selected');
    }
  }

  //다음 달 이동
  moveToNextMonth = () => {
    this.#calenderDate.month++;
    if (this.#calenderDate.month > 11) {
      this.#calenderDate.month = 0;
      this.#calenderDate.year++;
    }
    this.updateMonth();
    this.updateDates();
  };

  //이전 달 이동
  moveToPrevMonth = () => {
    this.#calenderDate.month--;
    if (this.#calenderDate.month < 0) {
      this.#calenderDate.month = 11;
      this.#calenderDate.year--;
    }
    this.updateMonth();
    this.updateDates();
  };

  //오늘 날짜 표시
  markToday() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();
    if (currentYear === this.#calenderDate.year && currentMonth === this.#calenderDate.month) {
      this.calendarDatesEl.querySelector(`[data-date='${today}']`).classList.add('today');
    }
  }

  //토요일 색깔
  colorSaturday() {
    const saturdayEls = this.calendarDatesEl.querySelectorAll('.date:nth-child(7n+7)');
    for (let i = 0; i < saturdayEls.length; i++) {
      saturdayEls[i].style.color = 'blue';
    }
  }

  // 일요일 색깔
  colorSunday() {
    const sundayEls = this.calendarDatesEl.querySelectorAll('.date:nth-child(7n+1)');
    for (let i = 0; i < sundayEls.length; i++) {
      sundayEls[i].style.color = 'red';
    }
  }
}

new DatePicker();
