import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { getUser } from "./redux/actions/auth/index";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));
const ReportCard = lazy(() => import("./views/pages/ReportCard"));
const Awards = lazy(() => import("./views/pages/Awards"));
const Teachers = lazy(() => import("./views/pages/Teachers"));
const Friends = lazy(() => import("./views/pages/Friends"));
const login = lazy(() => import("./views/pages/authentication/login/Login"));
const registration = lazy(() =>
  import("./views/pages/authentication/registration/Registration")
);

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    if (
      !localStorage.getItem("__user") ||
      JSON.stringify(localStorage.getItem("__user")) === "{}"
    ) {
      localStorage.setItem("__user", JSON.stringify({}));
    }
    this.props.getUser();
  }

  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute exact path="/reportcard" component={ReportCard} />
          <AppRoute exact path="/awards" component={Awards} />
          <AppRoute exact path="/teachers" component={Teachers} />
          <AppRoute exact path="/friends" component={Friends} />
          <AppRoute path="/pages/login" component={login} fullLayout />
          <AppRoute
            path="/pages/registration"
            component={registration}
            fullLayout
          />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { getUser })(AppRouter);
