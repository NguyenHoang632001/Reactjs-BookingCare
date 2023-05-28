import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ManageSpecialty.scss';

import * as actions from '../../../store/actions';

import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createNewSpecialty } from '../../../services/userServices';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
    };
  }
  async componentDidMount() {}
  componentDidUpdate(prevprops, prevState, snapshot) {}
  handleToChangText = (e, id) => {
    if (id === 'name') {
      this.setState({
        name: e.target.value,
      });
    }
  };
  handleToSave = async () => {
    let data = await createNewSpecialty(this.state);
    if (data && data.errCode === 0) {
      toast.success('Create new specialty success');
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
      });
    } else {
      toast.error('Create speaciaty failed');
    }
  };
  handleEditorChange = () => {};
  handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];

    if (this.state.previewImg) {
      URL.revokeObjectURL(this.state.previewImg);
    }
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImg: objectUrl,
        imageBase64: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  render() {
    return (
      <div>
        <h2>MANAGE SPECIALTY</h2>
        <div>
          <div className="row">
            <div className="col-6 ">
              <label className="">Tên phòng khám</label>
              <input
                className="col-12"
                value={this.state.name}
                onChange={(e) => this.handleToChangText(e, 'name')}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label className="">Tải file lên</label>
              <input
                className="form-control-file"
                type="file"
                // value={this.state.name}
                onChange={(e) => this.handleOnchangeFile(e)}
              ></input>
            </div>
          </div>
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            // value={this.state.contentMarkdown}
          />
          <button className="buttonToSave" onClick={() => this.handleToSave()}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ManageSpecialtyMenuPath: state.app.ManageSpecialtyMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchTimeSchedule: (data) => dispatch(actions.fetchTimeSchedule(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
