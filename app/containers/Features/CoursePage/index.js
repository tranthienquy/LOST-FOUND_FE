/**
 *
 * CoursePage
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
import makeSelectCoursePage from './selectors';
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

class CoursePage extends React.Component {
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
    this.props.onGetCourseList({
      status: this.state.showAvailable ? 'Waiting' : 'Approved',
    });
  }
  componentWillUnmount() {
    this.props.onEndOfAction();
  }
  onSubmitSearch = value => {
    this.setState({ valueSearch: value });
    this.props.onPagination(1, this.props.coursePage.pageSize);
    this.props.onGetCourseList({
      ...value,
      status: this.state.showAvailable ? 'Waiting' : 'Approved',
    });
  };
  onChangePagination = (page, pageSize) => {
    console.log(page, pageSize);
    this.props.onPagination(Number.parseInt(page), Number.parseInt(pageSize));
    this.props.onGetCourseList({
      ...this.state.valueSearch,
      status: this.state.showAvailable ? 'Waiting' : 'Approved',
    });
  };
  onChangePageSize = value => {
    this.onChangePagination(
      this.props.coursePage.current,
      Number.parseInt(value),
    );
  };

  onChangeCourseAvailable = async value => {
    await this.setState({ showAvailable: !this.state.showAvailable });
    await this.props.onGetCourseList({
      ...this.state.valueSearch,
      status: this.state.showAvailable ? 'Waiting' : 'Approved',
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
    const { courseList } = this.props.coursePage;
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
      current,
      pageSize,
      total,
      locationList,
      feeTypeList,
    } = this.props.coursePage;
    const { intl } = this.props;
    console.log(courseList);
    return (
      <div className="course-container">
        <Helmet>
          <title>Items</title>
        </Helmet>
        <Form
          ref={this.formRef}
          name="basic"
          onFinish={this.onSubmitSearch}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 pl-4 pr-4 mt-2">
              <Form.Item name="searchValue">
                <Input
                  placeholder={'Search item...'}
                  prefix={<i className="icon-Box-outline h5 feature-icon" />}
                />
              </Form.Item>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 pl-4 pr-4 mt-2">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-100 button-submit"
                >
                  <span className="w-100 text-center d-flex justify-content-center">
                    <i className="icon-Search mr-1" /> SEARCH
                  </span>
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
        <div />
        {getValidRole(this.context.user, [USER_ROLE.ADMIN]) && (
          <div className="d-flex justify-content-between align-items-center mr-2 mt-1">
            <Checkbox
              onChange={this.onChangeCourseAvailable}
              value={this.state.showAvailable}
              className="ml-3 mt-3"
            >
              <Typography> Show the pending item</Typography>
            </Checkbox>
          </div>
        )}
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
          {/* <span className="ml-2 mr-2">Status:</span>
          <Select
            style={{ width: '300px' }}
            allowClear
            onChange={this.sortStatusChange}
          >
            <Select.Option value={''}>All</Select.Option>
            <Select.Option value={'Closed'}>Closed</Select.Option>
          </Select> */}
        </div>
        <CourseListComponent loading={loading} value={this.displayItemList()} />
        <div className="pagination-foot w-100 mt-5 d-flex flex-row flex-wrap justify-content-between">
          <div className="d-flex flex-row align-items-center mb-2">
            <Typography className="mr-1">Number per page</Typography>
            <Select
              className="select-number-page"
              value={pageSize}
              onChange={this.onChangePageSize}
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
              <Option value="30">30</Option>
              <Option value="50">50</Option>
              <Option value="100">100</Option>
            </Select>
          </div>

          <Pagination
            current={current}
            total={total}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={this.onChangePagination}
          />
        </div>
      </div>
    );
  }
}

CoursePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  coursePage: makeSelectCoursePage(),
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
CoursePage.contextType = AuthContext;

const withReducer = injectReducer({ key: 'coursePage', reducer });
const withSaga = injectSaga({ key: 'coursePage', saga });
export default compose(
  withConnect,
  withReducer,
  withSaga,
  withRouter,
  injectIntl,
)(CoursePage);
