import React, { Component } from 'react'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            currentMemeImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({[name]: value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { allMemeImgs } = this.state

        const randNum = Math.floor(Math.random() * allMemeImgs.length)
        const randMemeImg = allMemeImgs[randNum].url
        this.setState({ currentMemeImg: randMemeImg })
    }

    render() {
        const {topText, bottomText, currentMemeImg } = this.state

        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        value={topText}
                        onChange={this.handleChange}
                        placeholder="Top text"
                    />
                    <input 
                        type="text"
                        name="bottomText"
                        value={bottomText}
                        onChange={this.handleChange}
                        placeholder="Bottom text"
                    />
                    <button type="submit">Generate Meme</button>
                </form>
                <div className="meme">
                    <img src={currentMemeImg} alt="" />
                    <h2 className="top">{topText}</h2>
                    <h2 className="bottom">{bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator