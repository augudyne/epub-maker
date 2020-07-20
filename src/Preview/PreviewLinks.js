/* global chrome */
import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    min-width: 150px;
    min-height: 150px;
`

export default class PreviewLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
          }
        this.setDOMInfo = this.setDOMInfo.bind(this)
    }

    setDOMInfo = links => {
        chrome.runtime.sendMessage({"logger": links})
        this.setState({links: links})
    };


    componentDidMount() {
        chrome.tabs.query({
        active: true,
        currentWindow: true
        }, tabs => {
        // send a request for the DOM info...
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'DOMInfo'},
            this.setDOMInfo);
        });
    }

    render() {
        console.log(this.state.links)
        if (this.state.links) {
            return <Container> 
                {this.state.links.map((a) => { return <h2><a href={a.href}>{a.title}</a></h2> })}
            </Container>
        } else {
            return <h1>No Links Found.</h1>
        }
    }
}