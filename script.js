const api_key = 'e8d814377af84511b125933bc6b6e4c8'
let valor = document.querySelector(".nome");
let btn = document.querySelector("#buscar");
const box = document.querySelector(".box");

function append(nome, bg, meta, faixa, gen) {
    let h1 = document.createElement('h1');
    let img = document.createElement('img');
    let critic = document.createElement('p');
    let rating = document.createElement('p');
    let newDiv = document.createElement('div');
    let gens = document.createElement('p');

    h1.innerHTML = nome;
    img.src = bg;
    critic.innerHTML = meta;
    rating.innerHTML = faixa;
    gens.innerHTML = gen;


    box.appendChild(h1);
    box.appendChild(img);
    box.appendChild(newDiv);
    newDiv.appendChild(critic);
    newDiv.appendChild(rating);
    box.appendChild(gens);
}

btn.addEventListener('click', () => {

    const url = `https://api.rawg.io/api/games?key=${api_key}&search=${valor.value}&page_size=10`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            let content = [];
            // let meta = [];
            // let bg = [];
            for (let i = 0; i < data.results.length; i++) {

                let nome = data.results[i].name;
                let dataMeta = data.results[i].metacritic;
                let dataFaixa = data.results[i].esrb_rating;

                let meta;
                dataMeta?
                meta = dataMeta
                :meta = "No metacritic"

                let bg
                data.results[i].background_image ?
                    bg = data.results[i].background_image
                    : bg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

                let faixa;
                dataFaixa?
                faixa = dataFaixa.name
                : faixa = "No rating";

                let gen = [];
                for (let j = 0; j < data.results[i].genres.length; j++) {
                    gen.push(data.results[i].genres[j].name);
                }

                content.push(nome, meta, bg, gen, faixa);


                append(nome, bg, meta, faixa, gen);

                // console.log(content[i]);
            }
        })
        .catch(err => {
            console.log(err.message);
        })

})