import { saveState, loadState } from './state.js';

const $nav = document.querySelector('nav');
let isSideNavOpen = false;

window.addEventListener('DOMContentLoaded', () => {
  const state = loadState();
  isSideNavOpen = state === null ? false : state.isSideNavOpen;

  $nav.classList.toggle('active', isSideNavOpen);
  document.body.style.visibility = 'visible';
});

window.addEventListener('beforeunload', () => {
  saveState({ isSideNavOpen });
});

document.querySelector('.toggle').addEventListener('click', () => {
  isSideNavOpen = !isSideNavOpen;
  document.body.classList.remove('preload');
  $nav.classList.toggle('active', isSideNavOpen);
});
