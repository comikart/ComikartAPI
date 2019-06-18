import Document, { Head, Main, NextScript } from 'next/document';
import '../static/scss/black-dashboard-react.scss';
import '../static/css/nucleo-icons.css';
import '../static/demo/demo.css';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
