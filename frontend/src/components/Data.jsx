import React, {useEffect, useState} from "react";
import Card from "./Card.jsx"
import "../styles/data.css"

export default function Data() {
    const [allCards, setAllCards] = useState([])
    const [query, setQuery] = useState("")
    const [disableInput, setDisableInput] = useState(false)

    const cardElements = allCards.map((currValue, index) => {

        const prefix = "data:image/png;base64,";
        const researchAdvisers = currValue.researchAdvisers.join(", ")
        const keywords = currValue.keywords.join(", ")
        const abstractImgs = currValue.abstractImgs.map((imgString, index) => <img className="absImg" 
            key={index} src={prefix.concat(imgString)}/>)
        const authors = currValue.authors.join(", ")

        let title = currValue.title.split(" ").map((word) => {
            let firstLetter = word.charAt(0).toUpperCase()
            let rest = word.slice(1, word.length)
            return firstLetter.concat(rest);
        }).join(" ")
        let datePublished = currValue.datePublished
        let coverImg = prefix.concat(currValue.coverImage)

        return <Card key={index} data={{title : title, authors : authors, 
                datePublished : datePublished, researchAdvisers : researchAdvisers,
                keywords: keywords, coverImg : coverImg, abstractImgs : abstractImgs,
        }}/>;
    })

    async function queryData() {
        setDisableInput(true)
        try {
            const response = await fetch("https://special-related-stingray.ngrok-free.app/search", {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    "input" : query,
                }),
            })

            const data = await response.json()
            setAllCards(data)
            setQuery("")
            setDisableInput(false)
        } catch(ex) {
            console.error(ex)
        }
    }

    function handleChange(event) {
        let value = event.target.value
        setQuery(value)

    }

    useEffect(() => {
        queryData()
    }, [])

    return ( <main className="main-container">
            <section className="section-container">
                <div className="input-container">
                    <input disabled={disableInput} value={query} onChange={handleChange} className="input-query" id="search-bar" type="text" placeholder="SEARCH HERE"/>
                    <button disabled={disableInput} onClick={queryData} className="submit-query" id="on-query" type="submit">SEARCH</button>
                </div>
                <div  className="cards-container">
                    {cardElements}
                </div>
            </section>
        </main>
    )
}
