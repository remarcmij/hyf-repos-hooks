'use strict';

// For simplicity, error handling has been omitted

{
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  const {
    MyReact: { useState, useEffect, useRef, render: renderDOM },
    Util: { createAndAppend },
    Select,
    Repository,
  } = window;

  const App = container => {
    const [repos, setRepos] = useState([]);
    const [repoIndex, setRepoIndex] = useState(0);
    const domRefs = useRef(null);

    useEffect(async () => {
      const res = await axios.get(HYF_REPOS_URL);
      setRepos(res.data);
    }, []);

    if (!domRefs.current) {
      const headerContainer = createAndAppend('header', container, {
        class: 'header',
      });
      const mainContainer = createAndAppend('main', container, {
        class: 'main-container',
      });
      domRefs.current = { headerContainer, mainContainer };
    }

    const { headerContainer, mainContainer } = domRefs.current;

    Select(headerContainer, { repos, setRepoIndex });
    Repository(mainContainer, { repo: repos[repoIndex] });
  };

  window.onload = () => renderDOM(App, document.getElementById('root'));
}
