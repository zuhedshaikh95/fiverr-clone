export const initialState = {
    userID: '',
    title: '',
    category: '',
    cover: '',
    images: [],
    description: '',
    shortTitle: '',
    shortDesc: '',
    deliveryTime: '',
    revisionNumber: '',
    features: [],
    price: 0,
}

export const gigReducer = (state, { type, payload }) => {
    switch(type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                [payload.name]: payload.value
            }

        case 'ADD_IMAGES':
            return {
                ...state,
                cover: payload.cover,
                images: payload.images
            }

        case 'ADD_FEATURE':
            return {
                ...state,
                features: [...state.features, payload]
            }

        case 'REMOVE_FEATURE':
            return {
                ...state,
                features: state.features.filter((feature) => feature !== payload)
            }

        default:
            return state;
    }
}