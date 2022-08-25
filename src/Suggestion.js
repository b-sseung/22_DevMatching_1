export default function Suggestion({ $target, initialState, onEnter }) {
  this.state = initialState;
  
  this.$suggestion = document.createElement('div');
  this.$suggestion.className = 'Suggestion';
  $target.appendChild(this.$suggestion);
  
  this.onEnter = onEnter;

  this.setState = (nextState) => {
      this.state = nextState;
      this.render();
  }

  this.checkKeyword = (all, word) => {
      const matchWord = all.match(new RegExp(word, 'gi'))[0];
      return all.replace(new RegExp(matchWord, 'gi'), `<span class="Suggestion__item--matched">${matchWord}</span>`);
  }

  this.render = () => {
      if (this.state.isEmpty) {
          this.$suggestion.style.visibility = 'hidden';
          return;
      }

      this.$suggestion.style.visibility = 'visible';

      const searchWord = this.state.SearchWord;

      const $list = this.state.SearchResult.map((data, index) => {
          return `<li${this.state.SelectedIndex === index ? ' class="Suggestion__item--selected"' : ''} data-index="${index}">${this.checkKeyword(data, searchWord)}</li>`;
      }).join('');

      this.$suggestion.innerHTML = `
          <ul>${$list}</ul>
      `
  }

  this.$suggestion.addEventListener('click', e => {
      const { index } = e.target.closest('li').dataset;
      this.onEnter(index);
  });

  window.addEventListener('keyup', e => {
      if (e.key === 'Enter' && this.state.SearchResult.length > 0) {
          this.onEnter(this.state.SelectedIndex);
      }
  })

  this.render();
}