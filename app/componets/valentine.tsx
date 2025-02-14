import { useEffect, useRef, useState } from "react";
import { Link } from "@remix-run/react";

export default function ValentinePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // ลิสต์ของวิดีโอทั้งหมด
  const videoList = [
    "/media/vdo9.mp4",
    "/media/vdo5.mp4",
    "/media/vdo6.mp4",
    "/media/vdo7.mp4",
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video to change the source
      videoRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, [currentVideoIndex]);

  // เปลี่ยนวิดีโอเมื่อจบ
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;

      const playAudio = async () => {
        try {
          audio.muted = false; // Make sure it's unmuted
          await audio.play();
          setIsPlaying(true); // Update state to show that audio is playing
        } catch (err) {
          console.warn("Autoplay was blocked:", err);
        }
      };

      // Using button click or page load to trigger the audio playback
      const playOnClick = () => {
        playAudio();
      };

      // You can call this `playOnClick()` when user interacts with the page.
      // For now, I'll call it when the gallery is shown, as an example.
      if (isGalleryOpen) {
        playAudio();
      }
    }
  }, [isGalleryOpen]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop={false} // ต้องปิด loop เพราะจะควบคุมการเปลี่ยนวิดีโอเอง
        muted
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={handleVideoEnd} // เรียกใช้เมื่อวิดีโอจบ
      >
        <source src={videoList[currentVideoIndex]} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-4xl font-bold">Happy Valentine's Day! 💖</h1>
        {/* <p className="text-3xl mt-4">I love you so much 💖 GRACE 💖</p> */}
        <p className="text-2xl mt-4">Meow Meow Meow ᓚ₍⑅^. .^₎ᵐᵉᵒʷˎˊ˗</p>

        <button
          onClick={() => setIsGalleryOpen(!isGalleryOpen)} // Toggle gallery visibility
          className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-lg shadow-lg hover:bg-red-700"
        >
          {isGalleryOpen ? "Hide!!" : "Click!!"}
        </button>

        {/* Collapsible Gallery Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out mt-6 ${
            isGalleryOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/media/img5.jpg"
              alt="Love 1"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />
            <img
              src="/media/img13.jpg"
              alt="Love 4"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />
            <img
              src="/media/img6.jpg"
              alt="Love 2"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />
            <img
              src="/media/img14.jpg"
              alt="Love 4"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />
            <img
              src="/media/img9.jpg"
              alt="Love 4"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />
            <img
              src="/media/img7.jpg"
              alt="Love 3"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />

            <img
              src="/media/img10.jpg"
              alt="Love 4"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />

            <img
              src="/media/img8.jpg"
              alt="Love 4"
              className="rounded-xl shadow-lg w-32 h-32 object-cover border-0 outline-none" // Set small size
            />
          </div>
        </div>

        {/* Hidden Audio Player */}
        <audio ref={audioRef} autoPlay loop className="hidden">
          {/* <source src="/media/videoplayback.mp3" type="audio/mp3" /> */}
          <source src="/media/My Everything.mp3" type="audio/mp3" />
        </audio>

        {/* Call to Action
        <Link
          to="/love-letter"
          className="mt-6 px-6 py-3 bg-red-600 text-white text-lg rounded-lg shadow-lg hover:bg-red-700"
        >
          Create a Love Letter 💌
        </Link> */}
      </div>
    </div>
  );
}
