import React, { Component } from 'react';
import { render } from 'react-dom';

import Message from './Layout/Message';
import { messages, responses } from './data';

// import './index.scss';
import './new.css';

// our component to render
class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            responses: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.demo = this.demo.bind(this);
        this.mockReply = this.mockReply.bind(this);
    }

    componentDidMount() {
        this.demo();
    }

    demo() {
        this.setState({
            messages: []
        });

        messages.map((item, index) => {
            setTimeout(() => this.addMessage(item), item.timeout);
        });

        setTimeout(() => {
            this.setState({
                messages: this.state.messages.slice(1, this.state.messages.length)
            });
        }, 700);
    }

    addMessage(item) {
        this.setState({
            messages: [...this.state.messages, item]
        });

        setTimeout(() => {
            const items = document.querySelectorAll('li');
            const lastItem = items[items.length - 1];
            document.querySelector('.c-chat__list').scrollTop =
                lastItem.offsetTop + lastItem.style.height;
        }, 100);
    }

    handleSubmit(e) {
        e.preventDefault();

        const item = {
            author: 'human',
            body: e.target.querySelector('input').value
        };

        this.addMessage(item);

        // mock a reply
        this.mockReply();

        e.target.reset();
    }

    mockReply() {
        let response;
        const nextResponseIndex = this.state.responses + 1;

        if (this.state.responses == 0) {
            response = responses[this.state.responses];
        } else {
            if (responses[nextResponseIndex - 1])
                response = responses[nextResponseIndex - 1];
        }

        if (response) {
            this.setState({
                responses: nextResponseIndex
            });

            if (Array.isArray(response)) {
                response.map((item, index) => {
                    setTimeout(
                        () => this.addMessage({ author: 'bot', body: item }),
                        600 + 500 * index
                    );
                });
            } else {
                setTimeout(
                    () => this.addMessage({ author: 'bot', body: response }),
                    600
                );
            }
        }
    }

    render() {
        let cssClass = 'c-chat';

        // const formStyle = {
        //     position: 'relative',
        //     bottom: 0,
        //     left: 0,
        //     width: '100%',
        //     display: 'block'
        // };

        if (this.state.messages.length > 4) {
            cssClass += ' c-chat--ready';
        }

        if (this.state.messages.length === 5) {
            document.querySelector('input').focus();
        }


        return (
            <div className={cssClass}>
                <ul className="c-chat__list">
                    {this.state.messages.map((message, index) => (
                        <Message key={index} data={message} />
                    ))}
                </ul>
                <form className="c-chat__input" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="input"
                        placeholder="Type your message here..."
                        autoFocus
                        autoComplete="off"
                        required
                    />
                </form>
            </div>
        );
    }
}

export default Chat;
/*
const el = document.getElementById('chat');

if (el) render(<Chat />, el);
*/
