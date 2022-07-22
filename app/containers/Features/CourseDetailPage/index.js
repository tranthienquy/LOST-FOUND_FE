/**
 *
 * CourseDetailPage
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
import makeSelectCourseDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './styles.scss';
import { Helmet } from 'react-helmet';
import {
  Button,
  Card,
  Modal,
  Typography,
  notification,
  List,
  Tooltip,
  Form,
  Input,
  Avatar,
  Tag,
} from 'antd';
import { Link, useHistory, withRouter } from 'react-router-dom';
import CourseDetailSkeleton from './CourseDetailSkeleton';
import * as actions from './actions';
import moment from 'moment';
import AuthContext from '../../../utils/auth';
import { LinearProgress } from '@mui/material';
import { getValidRole } from '../../../utils/permissionUtil';
import { USER_ROLE } from '../../../utils/constants';
import { ExclamationCircleOutlined } from '@ant-design/icons';

class CourseDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }
  componentWillMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.onLoadContent(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.match.params;
    if (nextProps.match.params !== this.props.match.params) {
      if (id) {
        this.props.onLoadContent(id);
      }
    }
  }
  onCommentChange = e => {
    this.setState({ comment: e.target.value });
  };
  onSubmitComment = () => {
    if (this.state.comment) {
      this.props.onConfirmComment(this.state.comment);
        this.setState({ comment:'' });

    }
  };
  componentWillUnmount() {
    this.props.onEndOfAction();
  }

  onSubmit = value => {
    this.props.onConfirmComment({ id: this.context.user.Id, ...value });
    // this.props.onRegister(value);
  };
  onSubmitRejected = value => {
    // this.props.onConfirmComment({ id: this.context.user.Id, ...value });
    this.props.onReject(value);
  };
  onSubmitFailed = errorInfo => {};
  approveConfirm = ()=>{
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure to approve this post?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable:true,
      centered:true,
      onOk:()=> {
        console.log('OK');
        this.props.onApprove();
      },
      onCancel:()=> {
      },
    });
  }
  closeConfirm = ()=>{
    const { confirm } = Modal;
    confirm({
      title: 'Are you sure to close this post?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable:true,
      centered:true,
      onOk:()=> {
        console.log('OK');
        this.props.onClosePost();
      },
      onCancel:()=> {
      },
    });
  }
  showConfirmModal = isShowing => {
    
    this.props.onShowConfirmModal(isShowing);
  };
  render() {
    const {
      id,
      content,
      loading,
      profile,
      confirmModal
    } = this.props.courseDetailPage;
    const { intl } = this.props;
    return (
      <div className="course-detail-container d-flex flex-column pt-5">
        <Helmet>
          <title>Post Item</title>
        </Helmet>

        <div className="d-flex justify-content-between">
          <Typography.Text
            className="link-text-on-click"
            type="secondary"
            onClick={() => this.props.history.goBack()}
          >
            <i className="icon-Caret-left" />
            Back
          </Typography.Text>
          <div>
          {getValidRole(this.context.user, [USER_ROLE.USER]) &&
            content &&
            content.user &&
            this.context.user._id === content.user && (
              <Link to={`/item-form/edit/${id}`}>
                {' '}
                <Button disabled={content.status!=="Waiting"} className="text-center d-flex align-items-center  mt-3">
                  <i className="icon-Edit-outline mr-2" />{' '}
                  <b className="w-100 text-center text-uppercase">{content.status!=="Waiting" ? "CAN NOT EDIT" : "EDIT"}</b>
                </Button>
              </Link>
            )}
            {getValidRole(this.context.user, [USER_ROLE.USER]) &&
            content &&
            content.user && content.status!=="Closed" &&  this.context.user._id === content.user && (
                <Button className="text-center d-flex align-items-center  mt-3"
                disabled={loading.close}
                onClick={this.closeConfirm}
                style={{color:'orange'}}
                >
                  <i className="icon-Logout-outline mr-2" />{' '}
                  
                  <b className="w-100 text-center text-uppercase">{loading.close ?"Closing":"Close Post"}</b>
                </Button>
            )}
            <div className='d-flex flex-row'>
             {getValidRole(this.context.user, [USER_ROLE.ADMIN]) &&
            content &&
            content.user && content.status==="Waiting" && (
                <Button className="text-center d-flex align-items-center  mt-3"
                disabled={loading.approve}
                onClick={this.approveConfirm}>
                  <i className="icon-Check-outline mr-2" />{' '}
                  
                  <b className="w-100 text-center text-uppercase">{loading.approve ?"Approving":"Approve"}</b>
                </Button>
            )}
             {getValidRole(this.context.user, [USER_ROLE.ADMIN]) &&
            content &&
            content.user && content.status==="Waiting" && (
                <Button className="text-center d-flex align-items-center ml-2  mt-3"
                style={{color:'red'}}
                disabled={loading.approve}
                onClick={() => this.showConfirmModal(true)}>
                  <b className='mr-2'>X</b>
                  <b className="w-100 text-center text-uppercase">{loading.reject ?"Rejecting":"Reject"}</b>
                </Button>
            )}</div>
            </div>
        </div>
        {loading.getContent ? (
          <CourseDetailSkeleton />
        ) : (
          <React.Fragment>
            <Card className="w-100 introduction-card mt-4">
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <img src={content.image || require('../../../images/logo/logo-losting.png')} width={'100%'} height={'190px'} />
                </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                  <Typography className="font-weight-bold h4 mt-4">
                    {content.title}
                  </Typography>
                  <div className="d-flex flex-column flex-wrap">
                    <Typography
                      style={{ fontSize: '16px' }}
                      className="text-app-primary mt-2 mr-3 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '25px' }}
                        className=" mr-2 icon-Location-outline"
                      />
                      Location: <b className="ml-1">{content.location}</b>
                    </Typography>
                    <Typography
                      style={{ fontSize: '16px' }}
                      className="text-app-primary mt-2 mr-3 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '25px' }}
                        className=" mr-2 icon-Play-outline"
                      />
                      Type:{' '}
                      <b className="ml-1">
                        {' '}
                        {content.lost === 'yes' ? 'Lost' : 'Found'}
                      </b>
                    </Typography>
                    <Typography
                      style={{ fontSize: '16px' }}
                      className="text-app-primary mt-2 mr-3 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '25px' }}
                        className=" mr-2 icon-Clock-outline"
                      />
                      Create At:
                      <b className="ml-1">
                        {moment(content.createdAt).format('YYYY-MM-DD')}
                      </b>
                    </Typography>
                    <Typography
                      style={{ fontSize: '16px' }}
                      className="text-app-primary mt-2 mr-3 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '25px' }}
                        className=" mr-2 icon-Timer-outline"
                      />
                      {content.lost === 'yes' ? 'Lost' : 'Found'} Date:
                      <b className="ml-1">
                          {content.statusDate && moment(content.statusDate).format('YYYY-MM-DD HH:mm')}
                      </b>
                    </Typography>
                    <Typography
                      style={{ fontSize: '16px' }}
                      className="text-app-primary mt-2 mr-3 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '25px' }}
                        className=" mr-2 icon-Fire-outline"
                      />
                      Status:
                    {content.status && <Tag className='ml-2' color={'orange'}>{content.status}</Tag>}
                    {content.status==="Rejected" &&<><span style={{color:'red'}} >{content.reasonRejected}</span></> }
                 </Typography>
                   </div>
                </div>
              </div>
            </Card>

            <div className="row">
              <div className="d-flex flex-column pr-5 col-xs-12 col-sm-12 col-md-12 col-lg-9">
                <Card
                  size="small"
                  className="card-description mt-4"
                  title={
                    <Typography
                      style={{ fontSize: '24px' }}
                      className=" text-app-primary font-weight-bold mt-2 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '29px' }}
                        className=" mr-2 icon-Checked-box-outline text-uppercase"
                      />
                      Identity Mark
                    </Typography>
                  }
                >
                  <Typography.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {content.identifyMark}
                  </Typography.Text>
                </Card>
                {getValidRole(this.context.user, [USER_ROLE.USER]) &&
            content &&
            content.user &&
            this.context.user._id === content.user && (
                 <Card
                  size="small"
                  className="card-description mt-4"
                  title={
                    <Typography
                      style={{ fontSize: '24px' }}
                      className=" text-app-primary font-weight-bold mt-2 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '29px' }}
                        className=" mr-2 icon-Book-open-outline text-uppercase"
                      />
                      Secret Information
                    </Typography>
                  }
                >
                  <Typography.Text style={{ whiteSpace: 'pre-wrap' }}>
                    {content.secretInformations}
                  </Typography.Text>
                </Card>  )}
                <Card
                  size="small"
                  className="card-description mt-4"
                  title={
                    <Typography
                      style={{ fontSize: '24px' }}
                      className=" text-app-primary font-weight-bold mt-2 d-flex align-items-center"
                    >
                      <i
                        style={{ fontSize: '29px' }}
                        className=" mr-2 icon-Chat-outline text-uppercase"
                      />
                      Comment
                    </Typography>
                  }
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={content.comments}
                    renderItem={item => {
                      let usercurrent=  profile.find(el=>el._id ===item.user);
                    return  <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={usercurrent.avt || 'https://joeschmoe.io/api/v1/random'} />
                          }
                          title={<span><b>{usercurrent.name || item.user} </b><i className='ml-3'>{moment(item.createdAt).format("YYYY/MM/DD - hh:mm:ss")}</i></span>}
                          description={item.message}
                        />
                      </List.Item>
                    }}
                  />
                  <Input.Group compact>
                    <Input
                      style={{ width: 'calc(100% - 200px)' }}
                      value={this.state.comment}
                      onChange={this.onCommentChange}
                      placeholder={!this.context.user?"Please Login before comment":"Input your comment..."}
                      disabled={!this.context.user || content.status==="Rejected" || content.status==="Waiting"}
                    />
                    <Button
                      loading={loading.confirm}
                      onClick={this.onSubmitComment}
                      type="primary"

                    >
                      <span className="d-flex align-items-center">
                        {!loading.confirm && <i className="icon-Send-outline" />}
                        Comment
                      </span>
                    </Button>
                  </Input.Group>
                </Card>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                <Card hoverable className=" mt-4">
                  <div className="d-flex flex-column">
                    <img
                      src={content.image || require('../../../images/logo/logo-losting.png')}
                      width={'100%'}
                      height={'150px'}
                      style={{ objectFit: 'contain' }}
                    />
                    <div className="p-2">
                      <Typography className="h7 font-weight-bold mb-2">
                        {content.title}
                      </Typography>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </React.Fragment>
        )}
         <Modal
          style={{ maxWidth: '1080px', minWidth: '50vw' }}
          width={'fit-content'}
          footer={''}
          onCancel={() => this.showConfirmModal(false)}
          visible={confirmModal}
          title={
            <Typography className="text-center text-uppercase  font-weight-bold ">
               REJECT THE ITEM
            </Typography>
          }
        >
         
           <Form
                name="basic"
                onFinish={this.onSubmitRejected}
                autoComplete="off"
                layout="vertical"
                initialValues={{
                
                }}
                onFinishFailed={this.onSubmitFailed}
                className="ant-general-form"
              >
          <Card className="w-100 introduction-card mt-4">
          
             
                <div className="row">
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <img
                      src={
                        content.image || require('../../../images/logo/logo-losting.png')
                      }
                      width={'100%'}
                      height={'190px'}
                    />
                  </div>
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <Typography className="font-weight-bold h4 mt-4">
                      {content.title}
                    </Typography>

                    <>
                      <div class="row">
                       
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <Form.Item
                           label={'Tell me the reason reject'}
                           name="reasonRejected"
                           rules={[{ required: true, message: 'Please input the reason', }]}
                          >
                            <Input size="large" />
                          </Form.Item>
                        </div>
                      
                      </div>
                    </>
                  </div>
                </div>
                
           
          </Card>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={`text-center w-100 mt-3`}
              danger
             
            >
              <b className="w-100 text-center text-uppercase">
                      REJECT
              </b>
            </Button>
          </Form.Item>
          {loading.reject ? <LinearProgress color="success" /> : ''}
          </Form>

        </Modal>
      </div>
    );
  }
}

CourseDetailPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  courseDetailPage: makeSelectCourseDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLoadContent: id => {
      dispatch(actions.loadContent(id));
    },
    onEndOfAction: () => {
      dispatch(actions.endOfAction());
    },
    onShowConfirmModal: isShowing => {
      dispatch(actions.showConfirmModal(isShowing));
    },
    onConfirmComment: content => {
      dispatch(actions.confirm(content));
    },
    onGetProfile: id => {
      dispatch(actions.getProfile(id));
    },
    onApprove: () => {
      dispatch(actions.approve());
    },
    onReject: (content) => {
      dispatch(actions.reject(content));
    },
    onClosePost: () => {
      dispatch(actions.close());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'courseDetailPage', reducer });
const withSaga = injectSaga({ key: 'courseDetailPage', saga });
CourseDetailPage.contextType = AuthContext;

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withRouter,
  injectIntl,
)(CourseDetailPage);
