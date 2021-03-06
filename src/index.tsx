/**
 * @description: 路由
 * @author: cnn
 * @createTime: 2020/7/16 15:42
 **/
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from '@components/index';
import { NotFound, Home, Welcome, InitialPage, Template } from '@views/index';
import { platform } from '@utils/CommonVars';

const App = () => {
  return (
    <Router>
      <Switch>
        <Home>
          <Switch>
            <ErrorBoundary>
              <Route exact path={platform + '/'} component={InitialPage} />
            </ErrorBoundary>
            <Route component={NotFound} />
          </Switch>
        </Home>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default App;
