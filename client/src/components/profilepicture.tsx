export const RandomProfilePicture = () => {
  return (
    <div
      className="rounded-full aspect-square
            animate-border  bg-gradient-to-r
            from-[#ede5c2e6] via-[#e2e0d74e] to-[#e1d7b076] 
            bg-[length:_600%_600%]
            p-[1px] m-1 flex justify-center items-center"
    >
      <img
        className="rounded-full bg-gradient bg-[length:_900%_900%] size-full"
        src="https://i.pravatar.cc/75"
        alt="random_profile_picture"
      />
    </div>
  );
};
