import SearchInput from './SearchInput.js'
import SelectedLanguage from './SelectedLanguage.js';
import Suggestion from './Suggestion.js';
import { request } from './Api.js';
import { setStorage, getStorage } from './Storage.js';

export default function App({ $target }) {
    this.state = {
        SearchResult: [],
        SearchWord: '',
        isEmpty: true,
        SelectedIndex: 0,
        SelectedList: []
    }

    if (getStorage()) {
        this.state = getStorage();
    }

    this.$selectedLanguage = new SelectedLanguage({
        $target,
        initialState: this.state
    });

    this.$searchInput = new SearchInput({
        $target,
        initialState: this.state,
        onChange: async (keyword) => {
            if (keyword === '') {
                this.setState({
                    ...this.state,
                    SearchWord: keyword,
                    SearchResult: [],
                    isEmpty: true
                });
            } else {
                const result = await request(keyword);
                this.setState({
                    ...this.state,
                    SearchWord: keyword,
                    SearchResult: result,
                    isEmpty: result === 0 ? true : false,
                    SelectedIndex: 0
                });
            }
        },
        onMove: (key) => {
            let index = this.state.SelectedIndex;
            if (key === 'ArrowUp') {
                index = index-1 < 0 ? this.state.SearchResult.length-1 : index-1;
            } else {
                index = index+1 >= this.state.SearchResult.length ? 0 : index+1;
            }

            this.setState({
                ...this.state,
                SelectedIndex: index
            });
        }
    });

    this.$suggestion = new Suggestion({
        $target,
        initialState: this.state,
        onEnter: (index) => {
            const language = this.state.SearchResult[index];
            alert(language);
            
            const $selectedList = this.state.SelectedList;
            if ($selectedList.indexOf(language) != -1) {
                $selectedList.splice($selectedList.indexOf(language), 1);
            }

            $selectedList.push(language);
            
            if ($selectedList.length > 5) $selectedList.shift();

            this.setState({
                ...this.state,
                SelectedList: $selectedList
            });
        }
    });

    this.setState = (nextState) => {
        this.state = nextState;
        setStorage(this.state);
        this.$suggestion.setState(this.state);
        this.$selectedLanguage.setState(this.state);
    }

}