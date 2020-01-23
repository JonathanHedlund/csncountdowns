import React, { Component } from 'react';
import axios from 'axios'
import Confetti from 'react-confetti'

import kazoo from './kazoo.mp3'
import Sound from 'react-sound'

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.calcNextCSNDay();
        this.calcCSNDay();
        this.state = {
            csnDay: "",
            nextCSNDay: "",
            daysOfMonth: "",
            days: "",
            hours: 23 - (new Date().getHours()),
            minutes: 59 - (new Date().getMinutes()),
            seconds: 59 - (new Date().getSeconds()),
            dayText: "Days",
            hourText: "Hours",
            minuteText: "Minutes",
            secondText: "Seconds",
            csnToday: false,
            musicOn: true,
            buttonName: "Stop Music"
        };

        setInterval(() => {
            this.isItCSN()
            if (!(this.state.csnToday)) {
                if ((new Date().getDate() < this.state.csnDay + 1)) {
                    this.setState(() => ({
                        days: this.state.csnDay - new Date().getDate()
                    }))
                }
                else {
                    this.setState(() => ({
                        days: this.state.daysOfMonth - (new Date().getDate() - this.state.nextCSNDay)
                    }))
                }
                this.setState(() => ({
                    hours: 23 - (new Date().getHours()),
                    minutes: 59 - (new Date().getMinutes()),
                    seconds: 59 - (new Date().getSeconds())
                }))

                if (this.state.days === 1) {
                    this.setState(() => ({
                        dayText: "Day"
                    }))
                }
                else if (this.state.hours === 1) {
                    this.setState(() => ({
                        hourText: "Hour"
                    }))
                }
                else if (this.state.minutes === 1) {
                    this.setState(() => ({
                        minuteText: "Minute"
                    }))
                }
                else if (this.state.seconds === 1) {
                    this.setState(() => ({
                        secondText: "Second"
                    }))
                }
                else {
                    this.setState(() => ({
                        dayText: "Days",
                        hourText: "Hours",
                        minuteText: "Minutes",
                        secondText: "Seconds",
                    }))
                }
            }
            else {
                this.setState(() => ({
                    days: "",
                    hours: "",
                    minutes: "",
                    seconds: "",
                    dayText: "It's CSN time!!",
                    hourText: "",
                    minuteText: "",
                    secondText: "",
                }))
            }
        }, 100);
    }

    isItCSN() {
        if ((this.state.csnDay + 1) === new Date().getDate()) {
            this.setState(() => ({
                csnToday: true,
            }))

        } else {
            this.setState(() => ({
                csnToday: false,
            }))

        }
    }

    //Calculates which date CSN comes
    calcCSNDay() {
        let csnMonth = new Date().getMonth() + 1;
        let currentYear = new Date().getFullYear();
        let currentDay = new Date().getDate();
        let csnDay = 20;
        console.log((new Date().getMonth()) + 1)
        axios.get('https://api.dryg.net/dagar/v2.1/' + currentYear + '/' + csnMonth)
            .then((response) => {
                // handle success
                console.log(response.data.dagar.length);
                console.log(response);
                console.log(currentDay);
                while (("Lördag" === response.data.dagar[csnDay].veckodag) ||
                    ("Söndag" === response.data.dagar[csnDay].veckodag) ||
                    (response.data.dagar[csnDay]["röd dag"] === "Ja")) {
                    csnDay--;
                }
                this.setState(() => ({
                    csnDay: csnDay,
                    daysOfMonth: response.data.dagar.length
                }))
                this.setState(() => ({
                    days: csnDay - currentDay
                }))

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    calcNextCSNDay() {
        let csnMonth = new Date().getMonth() + 2;
        let currentYear = new Date().getFullYear();
        let csnDay = 24;
        console.log((new Date().getMonth()) + 2)
        axios.get('https://api.dryg.net/dagar/v2.1/' + currentYear + '/' + csnMonth)
            .then((response) => {
                // handle success
                console.log(response);
                while (("Lördag" === response.data.dagar[csnDay].veckodag) ||
                    ("Söndag" === response.data.dagar[csnDay].veckodag) ||
                    (response.data.dagar[csnDay]["röd dag"] === "Ja")) {
                    csnDay--;
                }
                this.setState(() => ({
                    nextCSNDay: csnDay,
                    days: this.state.daysOfMonth - (new Date().getDate() - csnDay)
                }))
                console.log(this.state.nextCSNDay);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <p>{this.state.days + " " + this.state.dayText}</p>
                <p>{this.state.hours + " " + this.state.hourText}</p>
                <p>{this.state.minutes + " " + this.state.minuteText}</p>
                <p>{this.state.seconds + " " + this.state.secondText}</p>
                <Confetti numberOfPieces="300" run={this.state.csnToday} />
            </div >
        );
    }


}

export default Countdown