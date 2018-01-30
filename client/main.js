import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
<<<<<<< HEAD
 
import App from '../imports/pages/MainPage';
 
=======

import './main.html';
import { renderRoutes } from '../imports/routes/routes.js';

>>>>>>> 3d37dd39af04bcf456ab535301314e5ad7485380
Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
