/**
 *
 * CourseFormPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCourseFormPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';
import './styles.scss';
import CourseDetailSkeleton from '../CourseDetailPage/CourseDetailSkeleton';
import {
  Button,
  Card,
  Typography,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Skeleton,
  DatePicker,
  Upload,
  Popover,
  Image,
  List,
  Tooltip,
} from 'antd';

import moment from 'moment';

import { Helmet } from 'react-helmet';
import { LinearProgress } from '@mui/material';
import { withRouter } from 'react-router-dom';
import { getBase64 } from '../../../utils/imageUtil';
import AuthContext from '../../../utils/auth';
import { API_ENDPOINT } from '../../../utils/api/constants';
import { saveAs } from 'file-saver';

class CourseFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicateAv: false,
      imagePreview: null,
      duplicateCV: false,
      errorEmmptyList: false,
    };
  }
  componentWillUnmount() {
    this.props.onEndOfAction();
  }
  onSubmit = value => {
    console.log(value);
    this.props.onSubmitContent(value);
  };
  onSubmitFailed = error => {
    console.log(error);
  };

  componentWillMount() {
    if (!this.context.user) this.props.history.push('/login');
    const { id } = this.props.match.params;
    if (id) {
      this.props.onGetContent(id);
    }
    this.props.onGetDurationTypeList();
    this.props.onGetFeeTypeList();
  }
  componentWillReceiveProps = async nextProps => {
    const { id } = nextProps.match.params;
    if (nextProps.match.params !== this.props.match.params) {
      if (id) {
        this.props.onGetContent(id);
      }
    }
    if (nextProps.courseFormPage.image != this.props.courseFormPage.image) {
      const base64 = await getBase64(
        nextProps.courseFormPage.image.originFileObj,
      );
      await this.setState({
        imagePreview: base64,
      });
    }
  };
  onchangeFile = async value => {
    this.setState({ duplicateAv: !this.state.duplicateAv });
    if (this.state.duplicateAv) {
      return;
    }
    const base64 = await getBase64(value.file.originFileObj);
    if (base64.startsWith('data:image/')) {
      this.props.onChangeAvatar(value.file);
    }
    //   await this.setState({
    //     imagePreview: base64
    //   })
  };

  onUpFile = async value => {
    if (this.state.duplicateCV) {
      this.props.onUploadFile(value.file);
    }
    this.setState({ duplicateCV: !this.state.duplicateCV });
  };

  downloadFile = file => {
    saveAs(file.originFileObj, file.name);
  };

  render() {
    const {
      loading,
      imageURL,
      content,
      id,
      feeTypeList,
      fileList,
      durationTypeList,
      image,
    } = this.props.courseFormPage;
    const { imagePreview } = this.state;
    return (
      <div className="course-detail-container d-flex flex-column pt-5">
        <Helmet>
          <title>{id ? 'Update item' : 'Create new item'}</title>
        </Helmet>
        <div className="d-flex">
          <Typography.Text
            className="link-text-on-click"
            type="secondary"
            onClick={() => this.props.history.goBack()}
          >
            <i className="icon-Caret-left" /> Back
          </Typography.Text>
          / {id ? 'Update item' : 'Create new item'}
        </div>

        {loading.content && id ? (
          <CourseDetailSkeleton />
        ) : (
          <React.Fragment>
            <Form
              name="basic"
              onFinish={this.onSubmit}
              autoComplete="off"
              layout="vertical"
              initialValues={content}
              onFinishFailed={this.onSubmitFailed}
              className="ant-general-form"
            >
              <Card
                className="w-100 introduction-card mt-4"
                title={
                  <Typography
                    style={{ fontSize: '24px' }}
                    className=" text-app-primary font-weight-bold mt-2 d-flex align-items-center"
                  >
                    <i
                      style={{ fontSize: '29px' }}
                      className=" mr-2 icon-Checked-box-outline"
                    />
                    GENERAL INFORMATION
                  </Typography>
                }
              >
                <div className="row">
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    {image || imageURL ? (
                      <Popover
                        content={
                          <Upload
                            showUploadList={false}
                            onChange={this.onchangeFile}
                          >
                            <Button danger>Change</Button>
                          </Upload>
                        }
                      >
                        <Image
                          src={imagePreview || imageURL}
                          height={350}
                          width={'100%'}
                        />
                      </Popover>
                    ) : (
                      <Upload.Dragger
                        customRequest={({ file, onSuccess }) => {
                          setTimeout(() => {
                            onSuccess('ok');
                          }, 0);
                        }}
                        height={'100%'}
                        onChange={this.onchangeFile}
                        showUploadList={false}
                        action={''}
                        className="drop-file-avatar"
                      >
                        <Typography className="ant-upload-text">
                          Add Image
                        </Typography>
                        <i className="icon-Image-outline h1" />
                      </Upload.Dragger>
                    )}
                  </div>
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Form.Item
                          label={
                            <span>
                              Item Lost{' '}
                              <i className="text-gray">
                                {' '}
                                (Dog, Jacket, Smartphone, Wallet, etc.)
                              </i>
                            </span>
                          }
                          name="title"
                          rules={[
                            {
                              required: true,
                              message: 'Please input Item Lost',
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                        <span />
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        <Form.Item
                          label={
                            <span>
                              Type{' '}
                              <i className="text-gray">(Lost or Found) </i>
                            </span>
                          }
                          name="type"
                          rules={[
                            {
                              required: true,
                              message: 'Please select Type',
                            },
                          ]}
                        >
                          <Select
                          >
                            <Select.Option value={'Losting'}>
                              Lost
                            </Select.Option>
                            <Select.Option value={'Found'}>Found</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                        <Form.Item
                          label={
                            <span>
                              Identity Mask{' '}
                              <i className="text-gray">
                                Please provide any additional
                                details/description of your lost property.{' '}
                              </i>
                            </span>
                          }
                          name="identifyMark"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <Form.Item
                          label={
                            <span>
                              Lost/Found Date{' '}
                              <i className="text-gray">
                                Please provide the date of lost/found item.{' '}
                              </i>
                            </span>
                          }
                          name="statusDate"
                          rules={[
                            {
                              required: true,
                              message: 'Please pick the date',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value) {
                                  return Promise.resolve();
                                }
                                if (value.isAfter(moment()))
                                  return Promise.reject(
                                    new Error(
                                      'Please pick the date less than current',
                                    ),
                                  );
                                  return  Promise.resolve();
                              },
                            }),
                          ]}
                        >
                          <DatePicker
                            format="YYYY-MM-DD HH:mm"
                            showTime
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <Form.Item
                          label={<span>Secret Informations <i className="text-gray">
                          Information that only owner known
                        </i></span>}
                          name="secretInformations"
                        >
                          <Input />
                        </Form.Item>
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Form.Item
                          label={
                            <span>
                              Location{' '}
                              <i className="text-gray">
                                Please provide an approximate location of the
                                lost property (Bar, Restaurant, Park, etc.){' '}
                              </i>
                            </span>
                          }
                          name="location"
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Form.Item
                          label={
                            <span>
                              Contact phone number
                              <i className="text-gray">
                                Please provide phone number to contact if any{' '}
                              </i>
                            </span>
                          }
                          rules={[
                            {
                              pattern: new RegExp(/^[0-9\-\+]{9,15}$/),
                              message: 'Please input the valid Contact phone number',
                            },
                          ]}
                          name="phoneNumber"
                        >
                          <Input />
                        </Form.Item>
                      </div>

                      {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                        <Form.Item
                          label="DateLost"
                          name="StudyDate"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập Thời gian học',
                            },
                          ]}
                        >
                          <DatePicker.RangePicker className="w-100" />
                        </Form.Item>
                      </div>
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                        <Form.Item
                          label="Hạn chót đăng ký"
                          name="DueDate"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập Hạn chót đăng ký',
                            },
                          ]}
                        >
                          <DatePicker className="w-100" />
                        </Form.Item>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Card>
              <Form.Item className="mb-0">
                <Button
                  // disabled={loading.submit}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="text-center w-100 mt-3"
                >
                  <b className="w-100 text-center">
                    {id ? 'UPDATE ITEM' : '+  CREATE ITEM'}
                  </b>
                </Button>
              </Form.Item>
              <div style={{ height: '10px' }}>
                {loading.submit ? <LinearProgress color="success" /> : ''}
              </div>
            </Form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

CourseFormPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  courseFormPage: makeSelectCourseFormPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEndOfAction: () => {
      dispatch(actions.endOfAction());
    },
    onGetContent: id => {
      dispatch(actions.getContent(id));
    },
    onSubmitContent: value => {
      dispatch(actions.submitContent(value));
    },
    onGetDurationTypeList: () => {
      dispatch(actions.getDurationType());
    },
    onGetFeeTypeList: () => {
      dispatch(actions.getFeeType());
    },
    onChangeAvatar: image => {
      dispatch(actions.changeAvatar(image));
    },
    onUploadFile: file => {
      dispatch(actions.uploadFile(file));
    },
    onDeleteFile: file => {
      dispatch(actions.deleteFile(file));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'courseFormPage', reducer });
const withSaga = injectSaga({ key: 'courseFormPage', saga });
CourseFormPage.contextType = AuthContext;

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withRouter,
)(CourseFormPage);
