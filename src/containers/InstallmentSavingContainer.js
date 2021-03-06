import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InstallmentSaving from 'components/InstallmentSaving';
import * as installmentSavingActions from 'store/modules/installmentSaving';
import loding from 'images/loading.gif';


class InstallmentSavingContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            pending: false

        };
    }

    handleChangeType = (e) => {
        // e.currentTarget.totalSaveMoney.value = e.currentTarget.totalSaveMoney.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        e.currentTarget.saveMoney.value = e.currentTarget.saveMoney.value.toString().replace(/,/gi, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        e.currentTarget.totalSaveMoney.value = e.currentTarget.saveMoney.value.replace(/,/gi, "") * e.currentTarget.saveTrm.value;
        e.currentTarget.totalSaveMoney.value = e.currentTarget.totalSaveMoney.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const { InstallmentSavingActions } = this.props;
        InstallmentSavingActions.setInstallmentDataChange(e.currentTarget);
        // console.log(e.currentTarget.totalSaveMoney);
        
    }

    getInstallmentSavingListFunction = async () => {
        const { InstallmentSavingActions } = this.props;
        try{
            await InstallmentSavingActions.getInstallmentSavingList();
            // console.log("요청완료");
        } catch(e) {
            // console.log("에러발생");
        }
        
    }

    componentDidMount() {
        this.getInstallmentSavingListFunction();
        // console.log(this.props.installmentSavingList);
        
        
      }

    render(){
        const { success, installmentSavingList} = this.props;
        return(
            success?
            <InstallmentSaving 
                installmentSavingList={installmentSavingList}
                onChangeType={this.handleChangeType}
            />
            :<img style={{"width": "100%"}} src={loding}  alt="loading" />
        )
    }

}

let mapStateToProps = (state) => {
    return {
        installmentSavingList: state.installmentSaving.filterData,
        pending: state.pender.pending['GET_INSTALLMENTSAVING_LIST'],
        success: state.pender.success['GET_INSTALLMENTSAVING_LIST'],
        error: state.pender.failure['GET_INSTALLMENTSAVING_LIST']
    };
}
const mapDispatchToProps = dispatch => ({
    InstallmentSavingActions: bindActionCreators(installmentSavingActions, dispatch),
  });



export default connect(
    mapStateToProps,     
    mapDispatchToProps
)(InstallmentSavingContainer);