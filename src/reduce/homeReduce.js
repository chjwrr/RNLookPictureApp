/**
 * Created by chj on 2018/4/17.
 */
import * as Action from '../constance/actionType';
import Immutable from 'immutable'

const initState = Immutable.fromJS({
});

export default (state = initState, action)=>{
    switch (action.type){
        case Action.ACTION_TEST:
            newState = newState.set('name', action.payload);
            return newState;
        default:
            return state;
    }
}