import { createSelector } from 'reselect';

const salesSelector = state => state.sales;
const loginResponseSelector = createSelector([salesSelector], sales => sales.get('loginResponse'));
const registerResponseSelector = createSelector([salesSelector], sales => sales.get('registerResponse'));
const usersSelector = createSelector([salesSelector], sales => sales.get('users'));
const requestsSelector = createSelector([salesSelector], sales => sales.get('requests'));
const friendsSelector = createSelector([salesSelector], sales => sales.get('friends'));
const messagesSelector = createSelector([salesSelector], sales => sales.get('messages'));
const updateResponseSelector = createSelector([salesSelector], sales => sales.get('updateResponse'));
const QBInfoSelector = createSelector([salesSelector], sales => sales.get('QBInfo'));

export {
  	loginResponseSelector,
  	registerResponseSelector,
  	usersSelector,
  	requestsSelector,
  	friendsSelector,
  	messagesSelector,
  	updateResponseSelector,
  	QBInfoSelector
}
