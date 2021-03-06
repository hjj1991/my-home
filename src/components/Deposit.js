import React, { Fragment } from 'react'
import { Container, Row, Form } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import DepositCommentContainer from 'containers/DepositCommentContainer';
import depositImg from 'images/deposit.png'


const Deposit = ({ depositList, onChangeType }) => {


  // const inputEl = useRef(null);
  const products = depositList;
  const columns = [
    {
      dataField: 'korCoNm',
      text: '금융회사',
      sort: true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '20%', textAlign: 'center', 'whiteSpace': 'nowrap' };
      }
    },
    {
      dataField: 'finPrdtNm',
      text: '상품명',
      sort: true,
      headerAlign: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '40%'};
      }
      
    },
    {
      dataField: 'optionList[0].intrRate',
      text: '이율',
      sort: true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '10%', textAlign: 'center' };
      },
      formatter: (cell, row) => {
          return cell.toFixed(2) + "%";
      }
    },
    {
      dataField: 'optionList[0].intrRate2',
      text: '최고우대금리',
      sort: true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '15%', textAlign: 'center'};
      },
      formatter: (cell, row) => {
          return cell.toFixed(2) + "%";
      }
    },
    {
      dataField: 'joinDeny',
      text: '가입제한',
      sort: true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: (colum, colIndex) => {
        return { width: '15%', textAlign: 'center'};
      },
      formatter: (cell, row) => {
        if(cell === "1")
          return "제한없음"
        else if(cell === "2")
          return "서민전용"
        else
          return "일부제한"
      }
    }

  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    // onSelect: (row, isSelect, rowIndex, e) => {
    //     console.log(row);
    //     console.log(isSelect);
    //     console.log(rowIndex);
    //     console.log(e);
    // },
    clickToExpand: true
  };

  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: false,
    renderer: row => {
      return (
        <Container>
            <Row>
                <div className="col-12">금융회사 최종 제공일 : {row.finCoSubmDay.substring(0, 4)}년 {row.finCoSubmDay.substring(4, 6)}월 {row.finCoSubmDay.substring(6, 8)}일</div>
            </Row>
            <Row>
                <div className="col-12 col-md-6 detail-box">
                    <div className="product-title">상품문의</div><br/>
                        <a target="_blank" rel="noopener noreferrer" href={row.bankInfo.hompUrl}>{row.bankInfo.korCoNm}</a><br/>
                            {row.bankInfo.calTel}
                    </div>
                <div className="col-12 col-md-6 detail-box">
                    <div className="product-title">가입방법</div><br/>
                        {row.joinWay}
                </div>
            </Row>
            <Row>
                <div className="col-12 col-md-6 detail-box">
                    <div className="product-title">우대조건</div><br/>
                        {
                            row.spclCnd.split('\n').map( (line, index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                        }
                </div>
                <div className="col-12 col-md-6 detail-box">
                    <div className="product-title">만기후 이자율</div><br/>
                        {
                            row.mtrtInt.split('\n').map( (line, index) => {
                                return (<span key={index}>{line}<br/></span>)
                            })
                        }
                </div>
            </Row>
            <Row>
                <div className="col-12 col-md-6 detail-box">
                    <div className="product-title">가입대상</div><br/>
                        {row.joinMember}
                </div>
                <div className="col-12 col-md-6 detail-box">
                    <div className="product-title">기타 유의사항</div><br/>
                        {row.etcNote}
                </div>
            </Row>
            <Row>
              <div className="col-12 detail-box">
              <div className="product-title">댓글</div><br/>
              <DepositCommentContainer depositId={row.id}/>
              </div>
            </Row>
        </Container>
      )
    }

  };

  const customTotal = (from, to, size) => (
    <div className="react-bootstrap-table-pagination-total">
      Showing { from} to { to} of { size} Results
    </div>
  );

  const paginationOptions = {
    custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    withFirstAndLast: false,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: products.length,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: '10', value: 10
      }, {
        text: 'All', value: products.length
      }] // A numeric array is also available. the purpose of above example is custom the text
  };

  const MySearch = (props) => {
    let input;
    const handleChange = () => {
      props.onSearch(input.value);
    };
    return (
      <input
        className="form-control"
        placeholder="검색어를 입력해주세요."
        size="15"
        //   style={ { backgroundColor: 'pink' } }
        ref={n => input = n}
        type="text"
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="container-fluid">
      <div className="main-contents" >
        <p className="main-contents-title"><img style={{paddingBottom:"20px"}} width="50px" src={depositImg} alt="depositImg" /> <b>예금</b></p>
        <Fragment>
          <PaginationProvider
            pagination={
              paginationFactory(paginationOptions)
            }
          >
            {
              ({
                paginationProps,
                paginationTableProps
              }) => (
                  <Fragment>
                    <ToolkitProvider
                      keyField='id'
                      columns={columns}
                      data={products}
                      search
                    >
                      {
                        toolkitprops => (
                          <Fragment>
                            <hr />
                            <Form onChange={(value, e) => {onChangeType(value, e)}} >
                              <Row>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">예금 금액</div>
                                    <div className="col-7">
                                      <input className="form-control" name="totalSaveMoney" numberonly="true" type="text"/>
                                    </div>
                                  </Row>
                                </div>
                              </Row>
                              <Row>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">예금 예정기간</div>
                                    <div className="col-7">
                                    <ToggleButtonGroup type="radio" name="saveTrm"  defaultValue={12}>
                                      <ToggleButton variant="outline-warning" value={6}>6개월</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={12}>12개월</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={24}>24개월</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={36}>36개월</ToggleButton>
                                    </ToggleButtonGroup>
                                    </div>
                                  </Row>
                                </div>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">가입대상</div>
                                    <div className="col-7">
                                    <ToggleButtonGroup type="radio" name="joinDeny" defaultValue={1}>
                                      <ToggleButton variant="outline-warning" value={1}>제한없음</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={2}>서민전용</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={3}>일부제한</ToggleButton>
                                    </ToggleButtonGroup>
                                    </div>
                                  </Row>
                                </div>
                              </Row>                          
                              <Row>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">
                                      적립방식
                                    </div>
                                    <div className="col-7">
                                      <div style={{"padding": "5px"}} />
                                      <ToggleButtonGroup type="radio" name="intrRateTypeNm" defaultValue="단리">
                                        <ToggleButton variant="outline-warning" value="단리">단리</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="복리">복리</ToggleButton>
                                      </ToggleButtonGroup>
                                    </div>
                                  </Row>
                                </div>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">
                                      금융권역
                                    </div>
                                    <div className="col-7">
                                      <ToggleButtonGroup type="radio" name="bankRole" defaultValue="">
                                        <ToggleButton variant="outline-warning" value="">전체</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="은행">은행</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="저축은행">저축은행</ToggleButton>
                                      </ToggleButtonGroup>
                                    </div>                                  
                                  </Row>
                                </div>
                              </Row>
                            </Form>
                            <hr />
                            <div>
                              <MySearch {...toolkitprops.searchProps} />
                            </div>
                            <hr />
                            <SizePerPageDropdownStandalone {...paginationProps} />
                            <BootstrapTable classes="workload-table"
                              bordered={false}
                              {...toolkitprops.baseProps}
                              {...paginationTableProps}
                              selectRow={selectRow}
                              expandRow={expandRow}
                            />
                            <PaginationTotalStandalone

                              {...paginationProps} />

                            <PaginationListStandalone {...paginationProps} />
                          </Fragment>
                        )
                      }
                    </ToolkitProvider>

                  </Fragment>
                )
            }
          </PaginationProvider>
        </Fragment>
      </div>
    </div>
  )
}
export default Deposit;