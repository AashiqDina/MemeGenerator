import React from 'react';

export default function Main() {

    const [Meme, setMeme] = React.useState({
        TopText: "One does not simply",
        BottomText: "Eat a grilled cheese",
        Img: "http://i.imgflip.com/1bij.jpg"
    })

    const [MemeArray, setMemeArray] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data => setMemeArray(data.data.memes))
    }, [])

    function ChangeImage(){
        setMeme(prevMeme => ({
            ...prevMeme,
            Img: MemeArray[Math.floor(Math.random()* MemeArray.length)].url
        }))
    }

    

    function updateTopText(event){
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text:
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="TopText"
                        onChange={updateTopText}
                    />
                </label>

                <label>Bottom Text:
                    <input
                        type="text"
                        placeholder="Eat a grilled cheese"
                        name="BottomText"
                        onChange={updateTopText}
                    />
                </label>
                <button onClick={ChangeImage}>Generate a new meme image</button>
            </div>
            <div className="ActualMeme">
                <img src={Meme.Img} />
                <span className="TopText">{Meme.TopText}</span>
                <span className="BottomText">{Meme.BottomText}</span>
            </div>
        </main>
    )
}