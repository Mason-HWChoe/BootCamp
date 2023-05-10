import Index from './components/index.js';
import pageIndex, { Nav, NewsList } from './components/index.js';

window.addEventListener('load', () => {
  Nav();
  NewsList('general');
  pageIndex();
});
