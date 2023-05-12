import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ModalUser from '../ModalUser';
import { getAllcodeServices } from '../../../services/userServices';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArrRedux: [],
    };
  }

  async componentDidMount() {
    this.props.getUserStart();
  }
  async componentDidUpdate(prevProps, preState, snapshot) {
    if (prevProps.userRedux !== this.props.userRedux) {
      this.setState({
        userArrRedux: this.props.userRedux,
      });
    }
  }
  handleDeleteUser = (id) => {
    this.props.deleteUserStart(id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  };
  render() {
    // console.log('check all user redux', this.props.userRedux);
    let usersRedux = this.props.userRedux;

    return (
      <>
        <div className="containerTableManageuser">
          <h2 className="titleManageUser">EDIT AND DELETE USER WITH REDUX</h2>
          <div className="box-containerManageUser">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
                {this.state.userArrRedux &&
                  this.state.userArrRedux.map((user, index) => {
                    return (
                      <tr className="" key={index}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.address}</td>
                        <td>
                          <button onClick={() => this.handleEditUser(user)}>
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            onClick={() => this.handleDeleteUser(user.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.userRedux,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getUserStart: () => dispatch(actions.fetchAllUserStart()),
    deleteUserStart: (userId) => dispatch(actions.deleteUserStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
