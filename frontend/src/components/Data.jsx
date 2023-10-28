import React, {useEffect, useState} from "react";
import Card from "./Card.jsx"
import "../styles/data.css"

export default function Data() {
    const [allCards, setAllCards] = useState([])
    const [query, setQuery] = useState("")

    const cardElements = allCards.map((currValue, index) => {
        let title = currValue.title
        const authors = currValue.authors
        let datePublished = currValue.datePublished
        let coverImg = currValue.coverImage
        const researchAdvisers = currValue.researchAdvisers
        const keywords = currValue.keywords
        const abstractImgs = currValue.abstractImgs


        return <Card key={index} data={{title : title, authors : authors, 
                datePublished : datePublished, researchAdvisers : researchAdvisers,
                keywords: keywords, coverImg : coverImg, abstract : "", abstractImgs : abstractImgs,
        }}/>;
    })

    async function queryData() {
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
                    <input value={query} onChange={handleChange} className="input-query" id="search-bar" type="text" placeholder="SEARCH HERE"/>
                    <button onClick={queryData} className="submit-query" id="on-query" type="submit">SEARCH</button>
                </div>
                <div  className="cards-container">
                    {cardElements}
                </div>
            </section>
        </main>
    )
}
