import React, { useEffect, useState, useRef } from 'react';

const phrases = [
  'OFFENSIVE SECURITY TOOLS FOR THE COMMUNITY',
  'BUILT OVER COFFEE AND A SHARED DREAM',
  'CREATED TO SERVE AND PROTECT',
];

const TypingAnimation: React.FC = React.memo(function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Done typing, pause then delete
          const pauseTimeout = setTimeout(() => {
            setIsDeleting(true);
          }, 3000);
          timeoutsRef.current.push(pauseTimeout);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Done deleting, move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typeSpeed);

    timeoutsRef.current.push(timeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [displayText, phraseIndex, isDeleting]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-display text-sm md:text-base text-scarlet tracking-wider">
      {displayText}
      <span
        style={{
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        _
      </span>
    </span>
  );
});

export default TypingAnimation;
