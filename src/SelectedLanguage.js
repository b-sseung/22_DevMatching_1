export default function SelectedLanguage({ $target, initialState }) {
  this.state = initialState;

  this.$selectedBox = document.createElement('div');
  this.$selectedBox.className = 'SelectedLanguage';
  $target.appendChild(this.$selectedBox);
  
  this.setState = (nextState) => {
      this.state = nextState;
      this.render();
  }

  this.render = () => {
      const $list = this.state.SelectedList.map((language) => {
          return `
              <li>${language}</li>
          `
      }).join('');

      this.$selectedBox.innerHTML = `<ul>${$list}</ul>`;
  }

  this.render();
}