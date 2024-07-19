import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0C0022]/85 via-[#0C0022] to-[#0C0022]'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
