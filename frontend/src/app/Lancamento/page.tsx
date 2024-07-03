import "./lancamento.css";

export default function Lancamento() {

    return (
        <section className="lancamento-page">

            <div className="informacoes-movie">
                <h1>Inside Out 2</h1>

                <h5>2024 ‧ Infantil/Comédia ‧ 1h 36m
                </h5>
                <p>
                    Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, 
                    aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.
                </p>
            </div>

            <div className="image-container">
                <img src='/insideout.jpg' className="image-lancamento"></img>
            </div>
        </section>

    );
}