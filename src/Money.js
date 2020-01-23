import React, { Component } from 'react'
import axios from 'axios'

class Money extends Component {
    constructor() {
        super();
        this.calcCSNAmount()
        this.state = {
            money: "",
            support: ""
        }
    }
    calcCSNAmount() {
        let csnMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();
        let currentDay = new Date().getDate();
        let csnDay = 24;
        console.log((new Date().getMonth()) + 1)

        axios.get('https://api.dryg.net/dagar/v2.1/' + currentYear + '/' + csnMonth)
            .then((response) => {
                // handle success
                console.log(response);
                console.log(currentDay);
                while (("Lördag" === response.data.dagar[csnDay].veckodag) ||
                    ("Söndag" === response.data.dagar[csnDay].veckodag) ||
                    (response.data.dagar[csnDay]["röd dag"] === "Ja")) {
                    csnDay--;
                }
                if (currentDay > (csnDay + 1)) {
                    this.setState(() => ({
                        money: "10 860",
                        support: "3 292"
                    }))
                }
                else {
                    this.setState(() => ({
                        money: "10 860",
                        support: "3 292"
                    }))
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }


    render() {
        return (
            <div>
                <p>Studying full time (100%) will give you <em>{this.state.money}</em> SEK, where
                <em> {this.state.support}</em> SEK is financial support.</p>
            </div>
        )

    }
}

export default Money