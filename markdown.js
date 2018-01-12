import {h, Component}					from 'preact/preact';
import shallow							from 'shallow/shallow';
import Marked 							from 'marked-jsx/marked';

export default class UIMarkdown extends Component {
	constructor( props ) {
		super(props);
	}

	shouldComponentUpdate( nextProps ) {
		return shallow.Diff(this.props.children, nextProps.children);
	}

	render( props ) {
		var classes = (props.class ? props.class : "") + " markdown";

		var options = {
			sanitize: true,				// disable HTML
			smartypants: true,			// enable automatic fancy quotes, ellipses, dashes
			langPrefix: 'language-'
		};

		if ( Prism ) {
			options.highlight = function( code, lang ) {
				var language = Prism.languages.clike;
				if ( Prism.languages[lang] )
					language = Prism.languages[lang];
				return Prism.highlight(code, language);
			};
		}

		var body = props.children.length ? props.children.join("\n\n") : "";

		var markdown = new Marked();
//		var markdown = new Marked(options);

		return (<div class={classes}>{markdown.parse(body, options)}</div>);
	}
}
