const api_key = 'e8d814377af84511b125933bc6b6e4c8'
let valor = document.querySelector(".nome");
let btn = document.querySelector("#buscar");
const container = document.querySelector(".container");

function dateFormat(lanc) {
    const partesData = lanc.split('-');
  
    const ano = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]);
    const dia = parseInt(partesData[2]);
  
    const dataObj = new Date(ano, mes - 1, dia);
  
    const nomeDoMes = dataObj.toLocaleDateString('en', { month: 'long' });
  
    const dataFormatada = `${nomeDoMes} ${dia}, ${ano}`;
  
    return dataFormatada;
  }

function append(nome, bg, lanc, meta, faixa, gen) {

    container.innerHTML += `
    <div class='box'>
            <img src='${bg}' />
            <div class='info'>
            <h1>${nome}</h1>
            <p>${dateFormat(lanc)}</p>
            </div>
            <div class='infoBottom'>
        <div class='info-rate'>
        <p>Metacritic: ${meta}</p>
        <p>Rating: ${faixa}</p>
        </div>
        <div class='gen'>
            <p>Genrers: ${gen}</p>
        </div>
        </div>
    </div>
    `
}

btn.addEventListener('click', () => {
    container.textContent = "";
    const url = `https://api.rawg.io/api/games?key=${api_key}&search=${valor.value}`;

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
                let lanc = data.results[i].released;

                let meta;
                dataMeta ?
                    meta = dataMeta
                    : meta = "No metacritic"

                let bg
                data.results[i].background_image ?
                    bg = data.results[i].background_image
                    : bg = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

                let faixa;
                dataFaixa ?
                    faixa = dataFaixa.name
                    : faixa = "No rating";

                let gen = [];
                for (let j = 0; j < data.results[i].genres.length; j++) {
                    gen.push(data.results[i].genres[j].name);
                }

                content.push(nome, meta, bg, gen, faixa);


                append(nome, bg, lanc, meta, faixa, gen);

                // console.log(content[i]);
            }
        })
        .catch(err => {
            console.log(err.message);
        })
})