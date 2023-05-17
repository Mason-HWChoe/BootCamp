const KEY = 'state';

// 로컬스토리지에 상태 저장
export const saveState = state => {
  if (typeof state !== 'object') throw new TypeError('매개변수 state에는 객체가 전달되어야 합니다.');

  const serializedState = JSON.stringify(state);
  localStorage.setItem(KEY, serializedState);
};

// 로컬스토리지에서 상태 로드
export const loadState = () => {
  const serializedState = localStorage.getItem(KEY);
  return JSON.parse(serializedState);
};
