import axios from 'axios';
import { toast } from 'react-toastify';
import { FETCH_HOME_LASTS } from '../actions/home';
import { FETCH_SPOTS_LIST, FETCH_SPOT_ID, fetchSpotId } from '../actions/spots';
import { FETCH_PROFILE, UPDATE_PROFILE } from '../actions/profile';
import { CONTACT_US } from '../actions/contact';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

// Function to set the authorization token
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Set token on initial load if it exists
const connectedToken = localStorage.getItem('token');
console.log('Initial token from localStorage:', connectedToken);
setAuthToken(connectedToken);
console.log('Initial auth header set:', api.defaults.headers.common.Authorization);

const ajax = (store) => (next) => (action) => {
  // Set auth token when user state is restored from localStorage
  if (action.type === 'SAVE_USER' && action.token) {
    console.log('SAVE_USER intercepted, token:', action.token);
    setAuthToken(action.token);
    console.log('Auth header after SAVE_USER:', api.defaults.headers.common.Authorization);
  }

  // Clear auth token on logout
  if (action.type === 'LOGOUT') {
    setAuthToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('pseudo');
    localStorage.removeItem('userid');
  }

  if (action.type === 'FETCH_SEARCH_ALL') {
    api.get(`/search/?search=${action.searchedValue}`)
      .then((res) => {
        // success
        store.dispatch({
          type: 'SAVE_RESULT_DATA',
          spotsResultList: res.data.spots || [],
          eventsResultList: res.data.events || [],
        });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === FETCH_HOME_LASTS) {
    api.get('/home')
      .then((res) => {
        // success
        store.dispatch({
          type: 'SAVE_HOME_LASTS',
          lastsEvents: res.data.lastEvents || [],
          bestsSpots: res.data.topSpots || [],
          lastsSpots: res.data.lastSpots || [],
        });
      })
      .catch((err) => {
        // error
        console.log(err);
        store.dispatch({
          type: 'SAVE_HOME_LASTS',
          lastsEvents: [],
          bestsSpots: [],
          lastsSpots: [],
        });
      });
  }
  if (action.type === FETCH_SPOTS_LIST) {
    api.get('/spots/')
      .then((res) => {
        // success
        const spotsList = res.data || [];

        store.dispatch({
          type: 'SAVE_SPOTS_LIST',
          spotsList: spotsList,
        });

        // Fetch all categories from dedicated endpoint
        return api.get('/categories/');
      })
      .then((res) => {
        store.dispatch({
          type: 'SAVE_CATEGORIES',
          categories: res.data || [],
        });

        // Fetch all departments from dedicated endpoint
        return api.get('/departements/');
      })
      .then((res) => {
        store.dispatch({
          type: 'SAVE_DEPARTEMENTS',
          departements: res.data || [],
        });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'SEND_NEW_SPOT') {
    const state = store.getState();
    const payload = {
      title: state.spots.newTitle,
      image: state.spots.newImage,
      description: state.spots.newDescription,
      address: state.spots.newAddress,
      city: state.spots.newCity,
      typeSpot: state.spots.newTypeSpot,
      categoryIds: [Number(state.spots.newCategory)],
      departementId: Number(state.spots.newDepartement),
      latitude: state.spots.newLatitude,
      longitude: state.spots.newLongitude,
      authorId: state.user.userId ? Number(state.user.userId) : undefined,
    };
    console.log('Sending spot data:', payload);
    api.post('/spots/add', payload)
      .then((res) => {
        // success
        localStorage.setItem('addedSpot', 'true');
        console.log('Spot created successfully:', res);
        window.location.href = '/spots';
      })
      .catch((err) => {
        // error
        console.error('Error creating spot:', err.response?.data || err.message);
        toast.error(err.response?.data?.message || 'Erreur lors de la création du spot', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  }
  if (action.type === FETCH_SPOT_ID) {
    api.get(`/spots/${action.id}`)
      .then((res) => {
        // success
        store.dispatch({
          type: 'SAVE_SPOT_ID',
          newSpot: res.data,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'LOGIN') {
    const state = store.getState();
    api.post('/login_check', {
      email: state.user.email,
      password: state.user.password,
    })
      .then((res) => {
        // success
        setAuthToken(res.data.access_token);
        // on va chercher les données de l'utilisateur connecté
        store.dispatch({
          type: 'SAVE_USER',
          pseudo: res.data.user.pseudo,
          userId: res.data.user.id,
          token: res.data.access_token,
        });
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('pseudo', res.data.user.pseudo);
        localStorage.setItem('userid', res.data.user.id);
        localStorage.setItem('isConnectedSuccess', 'true');

        // Redirect to the page user was trying to access, or homepage
        const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectTo;
        // console.log(res.data);
      })
      .catch(() => {
        // error
        toast.error('Echec d\'authentification', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  }
  if (action.type === 'FETCH_EVENTS_DATA') {
    api.get('/events/')
      .then((res) => {
        // success
        const eventsList = res.data || [];

        store.dispatch({
          type: 'SAVE_EVENTS_LIST',
          eventsList: eventsList,
        });

        // Fetch all categories from dedicated endpoint
        return api.get('/categories/');
      })
      .then((res) => {
        store.dispatch({
          type: 'SAVE_CATEGORIES_EVENTS',
          categories: res.data || [],
        });

        // Fetch all departments from dedicated endpoint
        return api.get('/departements/');
      })
      .then((res) => {
        store.dispatch({
          type: 'SAVE_DEPARTEMENTS_EVENTS',
          departements: res.data || [],
        });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'SEND_NEW_EVENT') {
    const state = store.getState();
    const payload = {
      title: state.events.newTitle,
      image: state.events.newImage,
      description: state.events.newDescription,
      typeEvent: state.events.newTypeEvent,
      categoryIds: [Number(state.events.newCategory)],
      departementId: Number(state.events.newDepartement),
      difficulty: state.events.newDifficulty,
      dateEvent: state.events.newDateEvent,
      authorId: state.user.userId ? Number(state.user.userId) : undefined,
    };
    console.log('Sending event data:', payload);
    api.post('/events/add', payload)
      .then((res) => {
        // success
        localStorage.setItem('addedEvent', 'true');
        console.log('Event created successfully:', res);
        window.location.href = '/evenements';
      })
      .catch((err) => {
        // error
        console.error('Error creating event:', err.response?.data || err.message);
        toast.error(err.response?.data?.message || 'Erreur lors de la création de l\'évènement', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  }
  if (action.type === 'ADD_PROFILE') {
    const state = store.getState();
    api.post('/users/add', {
      email: state.user.newEmailRegister,
      pseudo: state.user.newPseudoRegister,
      password: state.user.newPasswordRegister,
      avatar: state.user.newImageRegister,
      firstname: state.user.newPrenomRegister,
      lastname: state.user.newNameRegister,
      presentation: state.user.newDescriptionRegister,
      city: state.user.newCityRegister,
      departement: state.user.newDepartementRegister,
      categoryIds: [state.user.newDisciRegister],
      equipement: state.user.newEquipementRegister,
    })
      .then((res) => {
        // success
        toast.success('Inscription réussi', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        window.location.href = '/connexion';
        console.log(res);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'FETCH_EVENT_ID') {
    api.get(`/events/${action.id}`)
      .then((res) => {
        // success
        store.dispatch({
          type: 'SAVE_EVENT_ID',
          newEvent: res.data,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'ADD_LIKE_SPOT') {
    api.patch(`/spots/${action.id}/like`, {})
      .then(() => {
        // success
        store.dispatch({
          type: 'TOGGLE_LIKE_SPOT',
          liked: action.isLiked,
          nbLikesStorage: action.calcLikes,
        });
        // store.dispatch({
        //   type: 'LIKE_STORAGE_SPOT',
        //   nbLikesStorage: action.calcLikes,
        // });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'ADD_DISLIKE_SPOT') {
    api.patch(`/spots/${action.id}/dislike`, {})
      .then(() => {
        // success
        store.dispatch({
          type: 'TOGGLE_LIKE_SPOT',
          liked: action.isLiked,
          nbLikesStorage: action.calcLikes,
        });
        // store.dispatch({
        //   type: 'DISLIKE_STORAGE_SPOT',
        //   nbLikesStorage: action.calcLikes,
        // });
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === FETCH_PROFILE) {
    console.log('FETCH_PROFILE action received with id:', action.id);
    if (!action.id) {
      // If no id, set loading to false
      console.log('No id provided, dispatching PROFILE_ERROR');
      store.dispatch({
        type: 'PROFILE_ERROR',
      });
      return next(action);
    }
    console.log('Dispatching FETCH_PROFILE_START and making API call to /users/' + action.id);
    store.dispatch({
      type: 'FETCH_PROFILE_START',
    });
    api.get(`/users/${action.id}`)
      .then((res) => {
        // success
        console.log('Profile API call successful, data:', res.data);
        store.dispatch({
          type: 'GET_PROFILE',
          newProfile: res.data,
        });
      })
      .catch((err) => {
        // error
        console.error('Profile API call failed:', err);

        // If 401 Unauthorized, token is expired or invalid
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          localStorage.removeItem('pseudo');
          store.dispatch({
            type: 'LOGOUT',
          });
          toast.error('Session expirée, veuillez vous reconnecter', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          window.location.href = '/connexion';
        } else {
          store.dispatch({
            type: 'PROFILE_ERROR',
          });
        }
      });
  }
  if (action.type === 'SEND_SPOT_COMMENT') {
    const state = store.getState();
    const comment = state.spots.newComment;
    const userId = state.user.userId;

    if (!comment || comment.trim() === '') {
      toast.error('Le commentaire ne peut pas être vide', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return next(action);
    }

    if (!userId) {
      toast.error('Vous devez être connecté pour commenter', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return next(action);
    }

    api.post(`/spots/${action.id}/comment`, {
      content: comment,
      userId: Number(userId),
      labelType: '',
    })
      .then((res) => {
        // success
        store.dispatch({
          type: 'SUCCESS_COMMENT_SPOT',
        });
        toast.success('Commentaire ajouté', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        // Refresh spot data to show new comment
        store.dispatch(fetchSpotId(action.id));
        console.log(res);
      })
      .catch((err) => {
        // error
        console.error('Comment posting failed:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          localStorage.removeItem('pseudo');
          store.dispatch({
            type: 'LOGOUT',
          });
          toast.error('Session expirée, veuillez vous reconnecter', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          window.location.href = '/connexion';
        } else {
          toast.error('Erreur lors de l\'ajout du commentaire', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
  }
  if (action.type === 'SEND_EVENT_COMMENT') {
    const state = store.getState();
    const comment = state.events.newComment;
    const userId = state.user.userId;

    if (!comment || comment.trim() === '') {
      toast.error('Le commentaire ne peut pas être vide', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return next(action);
    }

    if (!userId) {
      toast.error('Vous devez être connecté pour commenter', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return next(action);
    }

    api.post(`/events/${action.id}/comment`, {
      content: comment,
      userId: Number(userId),
      labelType: '',
    })
      .then((res) => {
        // success
        store.dispatch({
          type: 'SUCCESS_COMMENT_EVENT',
        });
        toast.success('Commentaire ajouté', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        // Refresh event data to show new comment
        store.dispatch({
          type: 'FETCH_EVENT_ID',
          id: action.id,
        });
        console.log(res);
      })
      .catch((err) => {
        // error
        console.error('Comment posting failed:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userid');
          localStorage.removeItem('pseudo');
          store.dispatch({
            type: 'LOGOUT',
          });
          toast.error('Session expirée, veuillez vous reconnecter', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          window.location.href = '/connexion';
        } else {
          toast.error('Erreur lors de l\'ajout du commentaire', {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
  }
  if (action.type === 'SEND_EVENT_PARTICIPATION') {
    api.post(`/events/${action.id}/participation`, {})
      .then((res) => {
        // success
        // store.dispatch({
        //   type: 'SUCCESS_COMMENT_EVENT',
        // });
        console.log(res);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === UPDATE_PROFILE) {
    const state = store.getState();
    api.put(`/users/${action.id}`, {
      email: state.user.profileEmail,
      pseudo: state.user.profilePseudo,
      avatar: state.user.profileAvatar,
      firstname: state.user.profileFirstname,
      lastname: state.user.profileLastname,
      presentation: state.user.profilePresentation,
      city: state.user.profileCity,
      departement: state.user.profileDepartement,
      equipement: state.user.profileEquipement,
    })
      .then((res) => {
        // success
        store.dispatch({
          type: 'UPDATE',
        });
        window.location.href = '/profil';
        console.log(res);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'DELETE_PROFILE') {
    api.delete(`/users/${action.id}`)
      .then((res) => {
        // success
        store.dispatch({
          type: 'LOGOUT',
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (action.type === 'DELETE_SPOT') {
    api.delete(`/spots/${action.id}`, {})
      .then((res) => {
        // success
        // store.dispatch({
        // });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (action.type === 'DELETE_EVENT') {
    api.delete(`/events/${action.id}`, {})
      .then((res) => {
        // success
        // store.dispatch({
        // });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (action.type === CONTACT_US) {
    const state = store.getState();
    api.post('/contactus/', {
      firstname: state.contact.newFirstnameContact,
      lastname: state.contact.newNameContact,
      email: state.contact.newEmailContact,
      content: state.contact.newMessageContact,
    })
      .then((res) => {
        // success
        store.dispatch({
          type: 'CONCTACT_US_POST',
        });
        console.log(res);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  next(action);
};

export default ajax;
