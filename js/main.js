'use strict';
var OFFER_QUANTITY = 8;
var PIN_X_RANGE = [0, 1200];
var PIN_Y_RANGE = [130, 630];
var APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAX_ROOM_QUANTITY = 5;
var MAX_GUEST_QUANTITY = 5;
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_X_OFFSET = -25;
var PIN_Y_OFFSET = -70;
var offers = [];
var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsOnMap = document.querySelector('.map__pins');

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var createOffer = function (location) {
  var locationX = PIN_X_RANGE[0] + getRandomNumber(PIN_X_RANGE[1] - PIN_X_RANGE[0]);
  var locationY = PIN_Y_RANGE[0] + getRandomNumber(PIN_Y_RANGE[1] - PIN_Y_RANGE[0]);
  var offering = {
    author: {
      avatar: 'img/avatars/user01' + location + '.png',
    },
    offer: {
      title: 'Милые апартаменты',
      address: locationX + ', ' + locationY,
      price: 500 + getRandomNumber(2000),
      type: APARTMENT_TYPES[getRandomNumber(APARTMENT_TYPES.length - 1)],
      rooms: getRandomNumber(MAX_ROOM_QUANTITY - 1) + 1,
      guests: getRandomNumber(MAX_GUEST_QUANTITY - 1) + 1,
      checkin: CHECKIN_TIMES[getRandomNumber(CHECKIN_TIMES.length - 1)],
      checkout: CHECKOUT_TIMES[getRandomNumber(CHECKOUT_TIMES.length - 1)],
      features: FEATURES.slice(0, getRandomNumber(FEATURES.length - 1) + 1),
      description: 'Просторная уютная квартира',
      photos: PHOTOS.slice(0, getRandomNumber(PHOTOS.length - 1) + 1),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
  return offering;
};

var createOffers = function () {
  for (var j = 0; j < OFFER_QUANTITY; j++) {
    offers.push(createOffer(j + 1));
  }
};

var renderPin = function (offering) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (offering.location.x + PIN_X_OFFSET) + 'px; top: ' + (offering.location.y + PIN_Y_OFFSET) + 'px';
  pinElement.querySelector('img').src = offering.author.avatar;
  pinElement.querySelector('img').alt = offering.offer.title;
  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  pinsOnMap.appendChild(fragment);
};
createOffers();
map.classList.remove('map--faded');
renderPins();
