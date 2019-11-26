import { LitElement, html, css } from './node_modules/lit-element';
import './node_modules/@polymer/paper-fab/paper-fab.js';
import './node_modules/@polymer/iron-icons/iron-icons.js';
import './node_modules/@polymer/paper-input/paper-input.js';
import './node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import './node_modules/@polymer/app-layout/app-layout.js';
/**
 * `web-chat`
 * Chat Component For EVA
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class EvaBot extends LitElement {

  static get properties() {
    return {
      headerText: String,
      headerButtonColor: String,
      chats: Array,
      message: String,
      conversation: String,
      serverUrl: String,
      toggleButtonWindow: Boolean,
    }
  };

  constructor() {
    super();
    this.headerText = 'Virtual Assistant';
    this.headerButtonColor = '#6200EE';
    this.chats = [];
    this.message = '';
    this.conversation = this.uuidv4();
    this.serverUrl = 'http://localhost:5005/webhooks/rest/webhook';
    this.toggleButtonWindow = false;
  }

  render() {
    return html`
      <style>
        .header-div, #fixedbutton {
          --backgroundColor: ${this.headerButtonColor};
        }
      </style>
      ${this.toggleButtonWindow ?
        html`
      <div class="main-div">
        <div>
          <app-header reveals class="header-div">
            <app-toolbar>
              <div main-title>${this.headerText}</div>
              <paper-icon-button @click="${this.toggleChatWindow}" icon="close"></paper-icon-button>
            </app-toolbar>
          </app-header>
        </div>
        <div class="chat-inner-scroll-div" id="chat-inner-div">
          ${this.chats.length ?
            html`
              ${this.chats.map(chat =>
              html`
                ${chat.event === 'user' ?
                  html`
                  <div class="row user-message">
                    <div class="user-box">
                      <div font-size="2" letter-spacing="0" class="user-chat"><span>${chat.text}</span></div>
                    </div>
                  </div>
                  `:
                  html`
                  <div class="row bot-message">
                    <div class="bot-box">
                      <div font-size="2" letter-spacing="0" class="bot-chat"><span>${chat.text}</span></div>
                    </div>
                  </div>
                  `}
              `
            )}`
            : ''}
        </div>
        <div class="type-send-message-div">
          <paper-input id="usermessage" @change=${e => this.updateMessage(e)}></paper-input>
          <iron-icon id="usersendmessageicon" @click="${this.sendMessage}" icon="send" alt="send" title="send"></iron-icon>
        </div>
      </div>
      ` : html`
      <paper-fab noink @click="${this.toggleChatWindow}" id="fixedbutton" icon="code" title="open-chat"></paper-fab>
      `}
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Lato', sans-serif;
        padding: 2%;
      }
      .main-div {
        position: fixed;
        -webkit-animation: chatwindowmove 0.5s;  /* Safari 4.0 - 8.0 */
        -webkit-animation-fill-mode: forwards; /* Safari 4.0 - 8.0 */
        animation: chatwindowmove 0.5s;
        animation-fill-mode: forwards;
        height: 430px;
        width: 350px;
        bottom: 17%;
        right: 5%;
        background-color: white;
        border-radius: 10px;
        border: 1px solid #BBB;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
      }
      .header-div {
        height: 60px;
        border-radius: 10px 10px 0 0;
        color: white;
        background-color: var(--backgroundColor);
      }
      .header-div span {
        font-family: 'Lato', sans-serif !important;
        margin-left: 0px;
      }
      .chat-inner-scroll-div {
        background-color: #e3dfd9;
        height: 300px;
        overflow-y: auto;
      }
      .user-message, .bot-message {
        padding-top: 0.5%;
        padding-bottom: 0.5%;
      }
      .user-box {
        box-sizing: border-box;
        float: right;
        clear: both;
      }
      .user-chat {
        box-sizing: border-box;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 16px;
        color: black;
        background-color: #DCF8C6;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        max-width: 408px;
        letter-spacing: 0.6px;
        line-height: 20px;
        border-radius: 20px 20px 4px 20px;
      }
      .bot-box {
        box-sizing: border-box;
        float: left;
        clear: both;
      }
      .bot-chat {
        box-sizing: border-box;
        margin-top: 8px;
        margin-bottom: 8px;
        margin-left: 8px;
        margin-right: 8px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 16px;
        color: black;
        background-color: white;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        max-width: 408px;
        letter-spacing: 0.6px;
        line-height: 20px;
        border-radius: 20px 20px 20px 4px;
      }
      .type-send-message-div{
        padding-left: 2%;
        padding-right: 2%;
        color: #BBB;
      }
      iron-input {
        font-family: 'Lato', sans-serif !important;
      }
      #fixedbutton {
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        position: fixed;
        bottom: 5%;
        right: 5%;
        background-color: var(--backgroundColor);
      }
      #usermessage {
        float: left;
        width: 90%;
      }
      #usersendmessageicon {
        margin-top: 30px;
        margin-left: 8px;
      }
      @media screen and (max-width: 480px) {
        .main-div {
          width: 350px;
        }
      }
      @media screen and (max-width: 400px) {
        .main-div {
          width: 300px;
        }
        #usersendmessageicon {
          margin-left: 2px;
        }
      }
      @media screen and (max-width: 350px) {
        .main-div {
          width: 250px;
        }
        #usersendmessageicon {
          margin-left: 0px;
        }
      }
      @media screen and (max-width: 300px) {
        .main-div {
          width: 200px;
        }
        #usersendmessageicon {
          margin-left: 0px;
        }
      }
      /* Safari 4.0 - 8.0 */
      @-webkit-keyframes chatwindowmove {
        from {bottom: -50px;}
        to {bottom: 50px;}
      }

      @keyframes chatwindowmove {
        from {bottom: -50px;}
        to {bottom: 50px;}
      }
    `;
  }

  firstUpdated() {
    this.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        this.sendMessage();
      }
    });
  }

  toggleChatWindow() {
    this.toggleButtonWindow = this.toggleButtonWindow ? false : true;
    this.requestUpdate();
  }

  updateMessage(e) {
    this.message = e.target.value;
  }

  sendMessage() {
    if (this.message.trim() !== '') {
      this.chats.push({ event: 'user', 'text': this.message });
      this.shadowRoot.querySelector('#usermessage').value = '';
      this.requestUpdate();
      this.getBotResponse().then((responses) => {
        if (responses.length) {
          responses.forEach((response) => {
            this.chats.push({ event: 'bot', text: response.text });
          });
        } else {
          this.chats.push({ event: 'bot', text: 'Chat bot not Available. Please use UI Trainer to Train and Deploy new Model.' });
        }
        this.message = '';
        this.requestUpdate();
        this.adjustEntityScroll();
      });
    }
  }

  async getBotResponse() {
    const result = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sender: this.conversation, message: this.message })
    }).catch((error) => {
      return [{text: 'Unable to reach Rasa servers. Please check configuration.'}];
    });
    if (result.status !== 200) {
      return [{text: 'Unable to reach Rasa servers. Please check configuration.'}]
    }
    return await result.json();
  }

  adjustEntityScroll() {
    var scrollDiv = this.shadowRoot.getElementById("chat-inner-div");
    setTimeout(function(){ 
      scrollDiv.scrollTop = scrollDiv.scrollHeight
     }, 100);
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

}

window.customElements.define('eva-bot', EvaBot);