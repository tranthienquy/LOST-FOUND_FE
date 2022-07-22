/**
 *
 * CourseMyPostPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCourseMyPostPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './styles.scss';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Pagination,
  Checkbox,
  Modal,
} from 'antd';
import { Helmet } from 'react-helmet';
import CourseListComponent from '../../../components/CourseListComponent';
import * as actions from './actions';
import { getValidRole } from '../../../utils/permissionUtil';
import { USER_ROLE } from '../../../utils/constants';
import AuthContext from '../../../utils/auth';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

class CourseMyPostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueSearch: null,
      showAvailable: false,
      sortType: null,
      sortStatus: null,
    };
  }
  formRef = React.createRef();
  componentWillMount() {
    if (!this.context.user) this.props.history.push('/login');
    this.props.onGetCourseList({status:this.state.showAvailable ? "Waiting":"Approved"});

  }
  componentWillUnmount() {
    this.props.onEndOfAction();
  }
  onSubmitSearch = value => {
    this.setState({ valueSearch: value });
    this.props.onPagination(1, this.props.courseMyPostPage.pageSize);
    this.props.onGetCourseList({
      ...value,
      status: this.state.showAvailable ? "Waiting":"Approved"
    });
  };
  onChangePagination = (page, pageSize) => {
    console.log(page,pageSize);
    this.props.onPagination(Number.parseInt(page),Number.parseInt(pageSize) );
    this.props.onGetCourseList({
      ...this.state.valueSearch,
      status: this.state.showAvailable ? "Waiting":"Approved"
    });
  };
  onChangePageSize = value => {
    this.onChangePagination(this.props.courseMyPostPage.current, Number.parseInt(value) );
  };

  onChangeCourseAvailable = async value => {
    await this.setState({ showAvailable: !this.state.showAvailable });
    await this.props.onGetCourseList({
      ...this.state.valueSearch,
      status: this.state.showAvailable ? "Waiting":"Approved"
    });
  };
  sortTypeChange = value => {
    console.log(value);
    this.setState({ sortType: value });
  };
  sortStatusChange = value => {
    console.log(value);
    this.setState({ sortStatus: value });
  };
  displayItemList = () => {
    const { courseList } = this.props.courseMyPostPage;

    let itemList = courseList;
    if (this.state.sortType == 'Losting')
      itemList = _.orderBy(itemList, ['lost'], ['desc']);
    if (this.state.sortType == 'Found')
      itemList= _.orderBy(itemList, ['found'], ['desc']);
    if (this.state.sortStatus == 'Closed')
      itemList= [...itemList.filter(e=>e.status==="Closed"), ...itemList.filter(e=>e.status!=="Closed")]
    return itemList;
  };
  render() {
    const {
      courseList,
      loading,
    } = this.props.courseMyPostPage;
    console.log(courseList,loading);
;    return (
      <div className="course-container">
        <Helmet>
          <title>
            My Items
          </title>
        </Helmet>
        
        <div />

        <Typography className='text-center head-title font-weight-bold mt-2  text-uppercase'>My Post </Typography>

     <div className="mt-3 d-flex align-items-center">
          <span className="mr-2">Sort By:</span>
          <Select
            style={{ width: '300px' }}
            allowClear
            onChange={this.sortTypeChange}
          >
            <Select.Option value={'Losting'}>Lost</Select.Option>
            <Select.Option value={'Found'}>Found</Select.Option>
          </Select>
          <span className="ml-2 mr-2">Status:</span>
          <Select
            style={{ width: '300px' }}
            allowClear
            onChange={this.sortStatusChange}
          >
            <Select.Option value={''}>All</Select.Option>
            <Select.Option value={'Closed'}>Closed</Select.Option>
          </Select>
        </div>
        <CourseListComponent loading={loading} value={this.displayItemList()} />
      
      </div>
    );
  }
}

CourseMyPostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  courseMyPostPage: makeSelectCourseMyPostPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEndOfAction: () => {
      dispatch(actions.endOfAction());
    },
    onGetCourseList: content => {
      dispatch(actions.getCourseList(content));
    },
    onGetLocationList: () => {
      dispatch(actions.getLocationList());
    },
    onGetFeeTypeList: () => {
      dispatch(actions.getFeeType());
    },
    onPagination: (current, pageSize) => {
      dispatch(actions.pagination(current, pageSize));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
CourseMyPostPage.contextType = AuthContext;

const withReducer = injectReducer({ key: 'courseMyPostPage', reducer });
const withSaga = injectSaga({ key: 'courseMyPostPage', saga });
export default compose(
  withConnect,
  withReducer,
  withSaga,
  injectIntl,
  withRouter
)(CourseMyPostPage);
