const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let url= 'https://i.pinimg.com/originals/31/75/48/31754822b98a017c6fa76fdeadc994fa.jpg';

let initialState = {
    users:[

    ]
};

const usersReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    (x) => {
                        if(x.id === action.userId)
                            return {
                                ...x,
                                followed:true
                            }
                        return x;
                    }
                )
            };
        case UNFOLLOW:
        return {
            ...state,
            users: state.users.map(
                (x) => {
                    if(x.id === action.userId)
                        return {
                            ...x,
                            followed : false
                        }
                    return x;
                }
            )
        };
        case SET_USERS:{
            return {...state, users: [...state.users, ...action.users]};
        }
        default:
            return (state);

    }
}
export const followAC = (userId) => ({ type: FOLLOW, userId });
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersAc = (users) =>({type: SET_USERS, users});

export default usersReducer;