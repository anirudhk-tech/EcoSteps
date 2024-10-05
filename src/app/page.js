'use client'
import '@fontsource/inter';

export default function Home() {
  return (
        <div
        style={{
          display: 'flex',
          gap: 200,
          flexDirection: 'row',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
        >
          <h1 className='pixel'>Hey, this is Pixel!</h1>
        </div>
        
  );
}
