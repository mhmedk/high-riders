import axios from 'axios';
import { toast } from 'react-toastify';
import { FETCH_HOME_LASTS } from '../actions/home';
import { FETCH_SPOTS_LIST, FETCH_SPOT_ID } from '../actions/spots';
import { FETCH_PROFILE, UPDATE_PROFILE } from '../actions/profile';
import { CONTACT_US } from '../actions/contact';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
});

const connectedToken = localStorage.getItem('token');

// Si on a bien un token
if (connectedToken) {
  api.defaults.headers.common.Authorization = `bearer ${connectedToken}`;
}

const ajax = (store) => (next) => (action) => {
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
        // Extract unique categories and departments from spots
        const categories = [...new Set(spotsList.flatMap(spot => spot.categories || []))];
        const departments = [...new Set(spotsList.map(spot => spot.departement).filter(Boolean))];

        store.dispatch({
          type: 'SAVE_SPOTS_LIST',
          spotsList: spotsList,
          spotsCate: categories,
          spotsDepar: departments,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'SEND_NEW_SPOT') {
    const state = store.getState();
    api.post('/spots/add', {
      title: state.spots.newTitle,
      image: state.spots.newImage,
      description: state.spots.newDescription,
      address: state.spots.newAddress,
      city: state.spots.newCity,
      typeSpot: state.spots.newTypeSpot,
      categoryIds: [state.spots.newCategory],
      departementId: state.spots.newDepartement,
      latitude: state.spots.newLatitude,
      longitude: state.spots.newLongitude,
    })
      .then((res) => {
        // success
        localStorage.setItem('addedSpot', 'true');
        console.log(res);
        window.location.href = '/spots';
      })
      .catch((err) => {
        // error
        console.log(err);
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
        api.defaults.headers.common.Authorization = `bearer ${res.data.access_token}`;
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
        window.location.href = '/';
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
        // Extract unique categories and departments from events
        const categories = [...new Set(eventsList.flatMap(event => event.categories || []))];
        const departments = [...new Set(eventsList.map(event => event.departement).filter(Boolean))];

        store.dispatch({
          type: 'SAVE_EVENTS_LIST',
          eventsList: eventsList,
          eventsCate: categories,
          eventsDepar: departments,
        });
        // console.log(res.data);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'SEND_NEW_EVENT') {
    const state = store.getState();
    api.post('/events/add', {
      title: state.events.newTitle,
      image: state.events.newImage,
      description: state.events.newDescription,
      typeEvent: state.events.newTypeEvent,
      categoryIds: [state.events.newCategory],
      departementId: state.events.newDepartement,
      difficulty: state.events.newDifficulty,
      dateEvent: state.events.newDateEvent,
    })
      .then((res) => {
        // success
        localStorage.setItem('addedEvent', 'true');
        console.log(res);
        window.location.href = '/evenements';
      })
      .catch((err) => {
        // error
        console.log(err);
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
    api.get(`/users/${action.id}`)
      .then((res) => {
        // success
        store.dispatch({
          type: 'GET_PROFILE',
          newProfile: res.data,
        });
        console.log(res.data);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'SEND_SPOT_COMMENT') {
    const state = store.getState();
    api.post(`/spots/${action.id}/comment`, {
      content: state.spots.newComment,
      label_type: '',
    })
      .then((res) => {
        // success
        store.dispatch({
          type: 'SUCCESS_COMMENT_SPOT',
        });
        console.log(res);
      })
      .catch((err) => {
        // error
        console.log(err);
      });
  }
  if (action.type === 'SEND_EVENT_COMMENT') {
    const state = store.getState();
    api.post(`/events/${action.id}/comment`, {
      content: state.events.newComment,
      label_type: '',
    })
      .then((res) => {
        // success
        store.dispatch({
          type: 'SUCCESS_COMMENT_EVENT',
        });
        console.log(res);
      })
      .catch((err) => {
        // error
        console.log(err);
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
