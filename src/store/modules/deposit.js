import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as service from 'services/posts';
// import { listenerCount } from 'cluster';

function axiosGetDepositList(){
    return service.getDepositList();
}

// function deepFreeze(obj) {
//     const props = Object.getOwnPropertyNames(obj);
  
//     props.forEach((name) => {
//       const prop = obj[name];
//       if(typeof prop === 'object' && prop !== null) {
//         deepFreeze(prop);
//       }
//     });
//     return Object.freeze(obj);
// }

// function cloneObject(obj) {
//     var clone = {};
//     for(var i in obj) {
//         if(typeof(obj[i])=="object" && obj[i] != null)
//             clone[i] = cloneObject(obj[i]);
//         else
//             clone[i] = obj[i];
//     }
//     return clone;
// }



const GET_DEPOSIT_LIST = 'GET_DEPOSIT_LIST';
const SET_DEPOSIT_DATA_CHANGE = 'SET_DEPOSIT_DATA_CHANGE';


export const setDepositDataChange = createAction(SET_DEPOSIT_DATA_CHANGE, (formData) => { return formData;});
export const getDepositList = createAction(GET_DEPOSIT_LIST, axiosGetDepositList);




const initialState = {
    data: [],
    filterData: []

}

export default handleActions({
    ...pender({
        type: GET_DEPOSIT_LIST, // type 이 주어지면, 이 type 에 접미사를 붙인 액션핸들러들이 담긴 객체를 생성합니다.
        /*
            요청중 / 실패 했을 때 추가적으로 해야 할 작업이 있다면 이렇게 onPending 과 onFailure 를 추가해주면됩니다.
            onPending: (state, action) => state,
            onFailure: (state, action) => state
        */
        onSuccess: (state, action) => { // 성공했을때 해야 할 작업이 따로 없으면 이 함수 또한 생략해도 됩니다.

            const tempData = action.payload.data.list;
            let result = JSON.parse(JSON.stringify(tempData));
            console.log(result);
            result = result.map( (element) => {
                
                element.optionList = element.optionList.filter( (temp) => {
                        return temp.saveTrm === "12" && temp.intrRateTypeNm === "단리";
                });
                if(element.optionList.length !== 0)
                    return element

            }).filter(temp2 => {
                return typeof temp2 !== 'undefined';
            });

            return {
                data: tempData,
                filterData: result
            }
        }
        // 함수가 생략됐을때 기본 값으론 (state, action) => state 가 설정됩니다 (state 를 그대로 반환한다는 것이죠)
    }),
    [SET_DEPOSIT_DATA_CHANGE]: (state, action) => {
        const tempData = state.data;
        let result = JSON.parse(JSON.stringify(tempData));


        // console.log("안녕??")
        // 전체,  예금예정 기간 필터, 단리복리 필터
        
            result = result.map( (element) => {
                // console.log(element);
                element.optionList = element.optionList.filter( (temp) => {
                    return temp.saveTrm === action.payload.saveTrm.value  && temp.intrRateTypeNm === action.payload.intrRateTypeNm.value;
                });
                if(element.optionList.length !== 0)
                    return element

            }).filter(temp2 => {
                return typeof temp2 !== 'undefined';
            });
        


        // 가입대상 필터
        result = result.filter( temp  => {
            return temp.joinDeny === action.payload.joinDeny.value;
        });

        // 저축은행, 은행, 전체 필터
        if(action.payload.bankRole.value !== ""){
            result = result.filter( (element) => {
                
                return element.bankInfo.bankRole === action.payload.bankRole.value
            });
        }

        return{
            data: tempData,            
            filterData: result
            
        }

    },



}, initialState);