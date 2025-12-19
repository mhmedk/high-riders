import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {
  const logged = useSelector((state) => state.user.logged);
  const token = localStorage.getItem('token');

  // Check if user is authenticated
  const isAuthenticated = logged || token;

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isAuthenticated) {
          // Save the intended destination before redirecting to login
          localStorage.setItem('redirectAfterLogin', location.pathname);
          return (
            <Redirect
              to={{
                pathname: '/connexion',
                state: { from: location },
              }}
            />
          );
        }
        return children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
