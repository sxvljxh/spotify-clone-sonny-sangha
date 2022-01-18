import { useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import {
  DotsHorizontalIcon,
  ExclamationCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [showIcon, setShowIcon] = useState(false);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track.track.uri],
    });
  };

  // const handlePlayPause = () => {
  //   spotifyApi.getMyCurrentPlaybackState().then(data => {
  //     if (data.body.is_playing) {
  //       spotifyApi.pause();
  //       setIsPlaying(false);
  //     } else {
  //       spotifyApi.play();
  //       setIsPlaying(true);
  //     }
  //   });
  // };

  return (
    <div
      onClick={() => playSong()}
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      className="grid grid-cols-2 items-center py-4 px-5 text-gray-500 hover:bg-gray-900 rounded"
    >
      <div className="flex items-center space-x-4">
        {/* <div className="flex justify-between items-center"> */}
        {showIcon ? (
          <p>
            {isPlaying && currentTrackId === currentTrackId ? (
              <BsFillPauseFill className="h-5 w-5 text-white" />
            ) : (
              <BsFillPlayFill className="h-5 w-5 text-white" />
            )}
          </p>
        ) : (
          <p className="h-5 w-5">{order + 1}</p>
        )}
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        {/* </div> */}
        <div className="ml-4">
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline ">{track.track.album.name}</p>
        <div className="flex w-32 justify-between items-center">
          {showIcon ? (
            <p>
              <HeartIcon className="h-5 w-5 text-white" />
            </p>
          ) : (
            <p>
              <HeartIcon className="h-5 w-5 text-transparent" />
            </p>
          )}

          <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
          {showIcon ? (
            <p>
              <DotsHorizontalIcon className="h-5 w-5 text-white" />
            </p>
          ) : (
            <p>
              <DotsHorizontalIcon className="h-5 w-5 text-transparent" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Song;
