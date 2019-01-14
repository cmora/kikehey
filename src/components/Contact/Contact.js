import React, { PropTypes } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pageLoading } from '../../actions/pageActions';

import Social from '../utils/Social/Social';
const ICON_SEND = require('../../assets/images/icon-send.png');
import './Contact.scss';

const CONTACT_ICON = require('../../assets/images/icon-contact.svg');

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      open: false,
      showMessage: false,
      user: null,
      sending: true
    };
  }

  handleOpen() {
    this.props.pageLoading(true);
    setTimeout(() => {
      this.setState({
        open: !this.state.open
      });
    }, 1000);
    setTimeout(() => {
      this.props.pageLoading(false);
    }, 1400);
  }

  handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    axios({
      method: "POST", 
      url:"http://localhost:3000/contact", 
      data: {
        name,   
        email,  
        subject,
        message
      }
    }).then((response)=>{
      if (response.data.msg === 'success'){
        const { user } = response.data;
        this.setState({
          showMessage: true,
          user
        })
        this.resetForm();
      } else if(response.data.msg === 'error'){
        alert("Message failed to send.");
      }
    });
  }

  resetForm(){
    document.getElementById('contact-form').reset();
  }

  renderForm() {
    return (
      <form
        className={classnames(
          'contact-block_form',
          {
            ['animated fadeInDown'] : open 
          }
        )}
        onSubmit={this.handleSubmit}
        method="POST"
        id="contact-form"
      >
        <div className="form-filed">
          <input type="text" placeholder="Name" name="name" id="name" required />
        </div>
        <div className="form-filed">
          <input type="email" placeholder="Email" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
        </div>
        <div className="form-filed">
          <input type="text" placeholder="Subject" name="subject" id="subject" required />
        </div>
        <div className="form-filed">
          <textarea placeholder="Message" name="message" id="message" required />
        </div>
        <div className="form-filed">
          <button type="submit">
            <img src={ICON_SEND} />
          </button>
        </div>
      </form>
    );
  }

  renderMessage() {
    const { user } = this.state;
    if (!user) return null;

    return (
      <div className="message-contact success"> 
        <h4>Thanks.</h4>
        <h6>{user.name} - {user.email}</h6>
        <p>Your message has been successfully sent and i appreciate you contact me. I'll be in contact soon.</p>
      </div>
    );
  }

  render () {
    const { open, showMessage, sending } = this.state;
    const { social } = this.props;

    return (
      <div
        className={classnames(
          'contact-block',
          {
            ['open']: open
          }
        )}
      >
        <div className="contact-block_open" onClick={this.handleOpen}>
          <img src={CONTACT_ICON} />
        </div>
        <div className="contact-block_content">
          <div className="contact-block_close" onClick={this.handleOpen} />
          <div className="contact-block_content__wrapper">
            <div className="row">
              <div className="column">
                <h2
                  className={classnames(
                    'contact-block_tite',
                    {
                      ['animated fadeInUp'] : open 
                    }
                  )}
                >
                  Yes! <br /> Contact <br /> Me
                </h2>
                <div
                  className={classnames(
                    'contact-block_info',
                    {
                      ['animated fadeInUp'] : open 
                    }
                  )}
                >
                  <p>Calle 144 # 13-42 apto 705 <br />
                  Bogotá, Colombia <br />
                  Cel.: + 57 3212055953 <br />
                  wallace1610@gmail.com</p>
                </div>
                <Social items={social} />
                {(showMessage && !sending) && 
                  this.renderMessage()
                }
                {(!showMessage && !sending) &&
                  this.renderForm()
                }
                {sending &&
                  <div className="loader-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 
Contact.propTypes = {
  social: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    social: state.social
  };  
};

const mapDispatchToProps = (dispatch) => {
  return {
    pageLoading: bindActionCreators(pageLoading, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
