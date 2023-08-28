import {
  RESET_ALL,
  PUSH_OPTION_ALERT,
  PUSH_DISABLE_FUNCTION_ID,
  PUSH_FUNCTION_LIST,
  PUSH_SELECTED_OPTION,
  POP_SELECTED_OPTION,
  PUSH_ADDITIONAL_OPTION,
  PUSH_CONFUSING_OPTION,
  POP_ADDITIONAL_OPTION,
  POP_CONFUSING_OPTION,
  CHANGE_ALL,
  CHANGE_BODY_TYPES,
  CHANGE_DRIVING_METHODS,
  CHANGE_ENGINES,
  CHANGE_TRIM,
  SET_TEMPCAR,
  SET_ANIMATION_STATE,
  SET_CLICK_ACTIVE,
  SET_SELECTED_OPTION,
  SET_OPTION_STATUS,
  SET_SHOWOPTION_ALERT,
  SET_DISABLE_FUNCTION_ID,
  SET_CAR_IMG,
  CHANGE_INTERIOR_COLOR,
  CHANGE_EXTERIOR_COLOR,
  CLEAR_OPTION,
} from "./actionType";

export function findTrimReducer(state, { type, payload }) {
  switch (type) {
    case SET_TEMPCAR:
      return { ...state, tempCar: payload };
    case SET_ANIMATION_STATE:
      return { ...state, animationstate: payload };
    case SET_CLICK_ACTIVE:
      return { ...state, clickActive: payload };
    case SET_SELECTED_OPTION:
      return { ...state, selectedOption: payload };
    case SET_OPTION_STATUS:
      return { ...state, optionStatus: payload };
    case SET_SHOWOPTION_ALERT:
      return { ...state, showOptionAlert: payload };
    case PUSH_SELECTED_OPTION:
      return {
        ...state,
        selectedOption: [...state.selectedOption, payload],
      };
    case POP_SELECTED_OPTION:
      return {
        ...state,
        selectedOption: state.selectedOption.filter((item) => item !== payload),
      };
    case PUSH_FUNCTION_LIST:
      return {
        ...state,
        functionList: [...state.functionList, payload],
      };
    case SET_DISABLE_FUNCTION_ID:
      return {
        ...state,
        disableFunctionId: payload,
      };
    case PUSH_DISABLE_FUNCTION_ID:
      return {
        ...state,
        disableFunctionId: [...state.disableFunctionId, payload],
      };
    case PUSH_OPTION_ALERT:
      return {
        ...state,
        optionAlert: [...state.optionAlert, payload],
      };
    default:
      return state;
  }
}

export function carReducer(car, { type, payload }) {
  switch (type) {
    case CHANGE_TRIM:
      return { ...car, trim: payload };

    case CHANGE_EXTERIOR_COLOR:
      return {
        ...car,
        color: {
          exterior: payload,
          interior: car.color.interior,
        },
      };

    case CHANGE_INTERIOR_COLOR:
      return {
        ...car,
        color: {
          exterior: car.color.exterior,
          interior: payload,
        },
      };

    case CHANGE_ENGINES:
      return {
        ...car,
        detail: {
          engines: payload,
          drivingMethods: car.detail.drivingMethods,
          bodyTypes: car.detail.bodyTypes,
        },
      };

    case CHANGE_DRIVING_METHODS:
      return {
        ...car,
        detail: {
          engines: car.detail.engines,
          drivingMethods: payload,
          bodyTypes: car.detail.bodyTypes,
        },
      };

    case CHANGE_BODY_TYPES:
      return {
        ...car,
        detail: {
          engines: car.detail.engines,
          drivingMethods: car.detail.drivingMethods,
          bodyTypes: payload,
        },
      };

    case PUSH_ADDITIONAL_OPTION:
      return {
        ...car,
        option: {
          additional: [...car.option.additional, payload],
          confusing: car.option.confusing,
        },
      };

    case PUSH_CONFUSING_OPTION:
      return {
        ...car,
        option: {
          additional: car.option.additional,
          confusing: [...car.option.confusing, payload],
        },
      };

    case POP_ADDITIONAL_OPTION:
      return {
        ...car,
        option: {
          additional: payload,
          confusing: car.option.confusing,
        },
      };

    case POP_CONFUSING_OPTION:
      return {
        ...car,
        option: {
          additional: car.option.additional,
          confusing: payload,
        },
      };

    case CLEAR_OPTION:
      return {
        ...car,
        trim: payload,
        color: {
          exterior: {},
          interior: {},
        },
        option: {
          additional: [],
          confusing: [],
        },
      };
    case RESET_ALL:
      return {
        ...car,
        trim: { name: "Exclusive", price: 38960000 },
        detail: {
          engines: {},
          drivingMethods: {},
          bodyTypes: {},
        },
        color: {
          exterior: {},
          interior: {},
        },
        option: {
          additional: [],
          confusing: [],
        },
      };
    case CHANGE_ALL:
      return {
        ...car,
        ...payload,
      };
    case SET_CAR_IMG:
      return {
        ...car,
        carImg: payload,
      };
  }
}
