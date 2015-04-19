import app from './app';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', app.run(token => alert(token)));
