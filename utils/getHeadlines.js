const axios = require('axios');

const getHeadlines = async () => {
  console.log('start fetching headlines')
  try {
    const res = await axios.get(`https://trendings.herokuapp.com/repo?since=daily`);
    // console.log(res.data.items)
    const top10Objs = res.data.items.slice(0, 10);
    // console.log(top10Objs)
    const contents = top10Objs
      .map((obj, i) => {
        let { repo, repo_link, desc, stars, forks, added_stars, lang} = obj;

        return `${i + 1}. [**${repo}**${desc ? ': ' + desc : ''}](${repo_link})
${added_stars} | ${stars} stars | ${forks} forks ${lang ? '| ' + lang : ''}

`;
      }).join('');

        return `${contents}
<p  align="right"><a href="https://github.com/sponsors/timqian"> <i>❤️ Sponsor the author</i></a> </p>
`;
  } catch (error) {
    console.log(error);
    throw error
  }

}

module.exports = getHeadlines;


// getHeadlines(new Date())
