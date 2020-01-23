import React, { Component } from 'react'
import axios from 'axios'


class Quotes extends Component {
    constructor() {
        super();
        this.state = {
            quote: "",
            quoter: ""
        }
    }
    componentDidMount1() {
        axios.get('http://130.239.178.50:3002/random_quote')

            .then((response) => {
                // handle success
                console.log(response);
                console.log(response.data[0].Qu_Quote)
                this.setState({
                    quote: response.data[0].Qu_Quote,
                    quoter: response.data[0].Qu_Quoter
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }


    componentDidMount() {
        axios.get('https://quota.glitch.me/random')
            .then((response) => {
                // handle success
                console.log(response);
                console.log(response.data.quoteAuthor)
                console.log(response.data.quoteText)
                this.setState({
                    quote: response.data.quoteText,
                    quoter: response.data.quoteAuthor
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <p className="quote">"{this.state.quote}"</p>
                <p className="quoter">- {this.state.quoter}</p>
            </div>
        )
    }


}

export default Quotes