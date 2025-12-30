// Sound utility untuk mengelola audio di aplikasi
export const playSound = (soundPath: string, volume: number = 0.5) => {
  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch(error => {
    console.error('Error playing sound:', error);
  });
};

// Background music management
let backgroundMusic: HTMLAudioElement | null = null;

export const playBackgroundMusic = (musicPath: string, volume: number = 0.3, loop: boolean = true) => {
  if (backgroundMusic) {
    backgroundMusic.pause();
  }
  
  backgroundMusic = new Audio(musicPath);
  backgroundMusic.volume = volume;
  backgroundMusic.loop = loop;
  backgroundMusic.play().catch(error => {
    console.error('Error playing background music:', error);
  });
};

export const stopBackgroundMusic = () => {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
};

export const setBackgroundMusicVolume = (volume: number) => {
  if (backgroundMusic) {
    backgroundMusic.volume = Math.max(0, Math.min(1, volume));
  }
};

// Predefined sounds
export const SOUNDS = {
  CLICK: '/sounds/click.mp3',
  // Tambahkan sound lainnya di sini
  // HOVER: '/sounds/hover.mp3',
  SUCCESS: '/sounds/success.mp3',
  MENU: '/sounds/Menu.mp3',
  BELI: '/sounds/Buy.mp3',
};
