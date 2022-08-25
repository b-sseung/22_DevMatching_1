export default function SearchInput({ $target, initialState, onChange, onMove }) {
  this.state = initialState;

  this.$form = document.createElement('form');
  this.$form.className = 'SearchInput';
  $target.appendChild(this.$form);

  this.onChange = onChange;
  this.onMove = onMove;

  this.setState = (nextState) => {
      this.state = nextState;
      this.render();
  }

  this.render = () => {
      this.$form.innerHTML = `
          <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요.">
      `

      this.$input = document.querySelector('input');
      this.$input.setAttribute('value', this.state.SearchWord);
      this.$input.focus();
  }

  this.render();

  this.$form.addEventListener('submit', e => {
      e.preventDefault();
  });

  this.$form.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
          return;
      }

      const keyword = this.$input.value;
      this.$input.setAttribute('value', keyword);
      this.onChange(keyword);
  })

  window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          this.onMove(e.key);
      }
  })
}