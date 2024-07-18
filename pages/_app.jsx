import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-[#0C0022]'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
